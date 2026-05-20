const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  makeInMemoryStore,
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const chalk = require('chalk');
const NodeCache = require('node-cache');
const cron = require('node-cron');
const config = require('./config');
const { loadPlugins, handleMessage } = require('./lib/handler');
const db = require('./lib/database');
const { cleanTemp, formatDuration } = require('./lib/utils');

const logger = pino({ level: 'silent' });
const msgRetryCounterCache = new NodeCache();
const store = makeInMemoryStore({ logger });

const startTime = Date.now();

async function startBot() {
  console.log(chalk.cyan('╔════════════════════════════════╗'));
  console.log(chalk.cyan('║') + chalk.yellow('     BOT-WA MULTI FEATURE      ') + chalk.cyan('║'));
  console.log(chalk.cyan('║') + chalk.white('     Powered by Baileys         ') + chalk.cyan('║'));
  console.log(chalk.cyan('╚════════════════════════════════╝'));
  console.log();

  // Load plugins
  loadPlugins();
  console.log();

  const { state, saveCreds } = await useMultiFileAuthState(
    config.sessionName
  );
  const { version } = await fetchLatestBaileysVersion();

  console.log(
    chalk.green(`[INFO] Using Baileys v${version.join('.')}`)
  );

  const sock = makeWASocket({
    version,
    logger,
    printQRInTerminal: true,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    browser: [config.botName, 'Chrome', '4.0.0'],
    generateHighQualityLinkPreview: true,
    msgRetryCounterCache,
    defaultQueryTimeoutMs: undefined,
  });

  store.bind(sock.ev);

  // Connection update handler
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      console.log(chalk.yellow('[INFO] Scan QR Code di atas untuk login'));
    }

    if (connection === 'close') {
      const reason =
        lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect =
        reason !== DisconnectReason.loggedOut;

      console.log(
        chalk.red(
          `[DISCONNECTED] Reason: ${reason || 'Unknown'}. Reconnecting: ${shouldReconnect}`
        )
      );

      if (shouldReconnect) {
        startBot();
      } else {
        console.log(
          chalk.red(
            '[INFO] Bot telah logout. Hapus folder session dan scan ulang QR.'
          )
        );
      }
    }

    if (connection === 'open') {
      console.log(chalk.green('[CONNECTED] Bot berhasil terhubung!'));
      console.log(
        chalk.green(
          `[INFO] Bot Number: ${sock.user.id.split(':')[0]}`
        )
      );
      console.log(
        chalk.green(`[INFO] Bot Name: ${config.botName}`)
      );
      console.log(
        chalk.green(`[INFO] Prefix: ${config.prefix}`)
      );
      console.log(
        chalk.green(
          `[INFO] Owner: ${config.ownerNumber}`
        )
      );
    }
  });

  // Save credentials
  sock.ev.on('creds.update', saveCreds);

  // Message handler
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      try {
        await handleMessage(sock, msg);
      } catch (err) {
        console.log(
          chalk.red(`[ERROR] Message handler: ${err.message}`)
        );
      }
    }
  });

  // Group participants update (welcome/goodbye)
  sock.ev.on(
    'group-participants.update',
    async ({ id, participants, action }) => {
      try {
        const groupSetting = db.getGroupSetting(id);
        if (!groupSetting.welcome) return;

        const metadata = await sock.groupMetadata(id);

        for (const participant of participants) {
          const name = participant.split('@')[0];

          if (action === 'add') {
            const welcomeText =
              '╭━━━━━━━━━━━━━╮\n' +
              '┃  🎉 *WELCOME!*\n' +
              '┃\n' +
              `┃  👤 @${name}\n` +
              `┃  📌 ${metadata.subject}\n` +
              `┃  👥 Member ke-${metadata.participants.length}\n` +
              '┃\n' +
              '┃  Semoga betah ya!\n' +
              '╰━━━━━━━━━━━━━╯';

            await sock.sendMessage(id, {
              text: welcomeText,
              mentions: [participant],
            });
          }

          if (action === 'remove') {
            const goodbyeText =
              '╭━━━━━━━━━━━━━╮\n' +
              '┃  👋 *GOODBYE!*\n' +
              '┃\n' +
              `┃  👤 @${name}\n` +
              `┃  📌 ${metadata.subject}\n` +
              '┃\n' +
              '┃  Sampai jumpa lagi!\n' +
              '╰━━━━━━━━━━━━━╯';

            await sock.sendMessage(id, {
              text: goodbyeText,
              mentions: [participant],
            });
          }
        }
      } catch (err) {
        console.log(
          chalk.red(
            `[ERROR] Group update handler: ${err.message}`
          )
        );
      }
    }
  );

  // Anti-link detection
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (!msg.message) continue;
      if (msg.key.fromMe) continue;

      const chatJid = msg.key.remoteJid;
      if (!chatJid.endsWith('@g.us')) continue;

      const groupSetting = db.getGroupSetting(chatJid);
      if (!groupSetting.antilink) continue;

      const sender =
        msg.key.participant || msg.key.remoteJid;

      // Skip admins and owner
      const isOwner =
        sender.replace('@s.whatsapp.net', '') ===
        config.ownerNumber;
      if (isOwner) continue;

      try {
        const metadata = await sock.groupMetadata(chatJid);
        const participant = metadata.participants.find(
          (p) => p.id === sender
        );
        if (
          participant &&
          (participant.admin === 'admin' ||
            participant.admin === 'superadmin')
        ) {
          continue;
        }
      } catch {
        continue;
      }

      // Check for links
      let text = '';
      const messageType = Object.keys(msg.message).find(
        (k) =>
          k !== 'senderKeyDistributionMessage' &&
          k !== 'messageContextInfo'
      );
      if (messageType === 'conversation') {
        text = msg.message.conversation;
      } else if (messageType === 'extendedTextMessage') {
        text = msg.message.extendedTextMessage.text;
      }

      const linkRegex =
        /(https?:\/\/[^\s]+|chat\.whatsapp\.com\/[^\s]+)/gi;
      if (linkRegex.test(text)) {
        await sock.sendMessage(chatJid, {
          text: `⚠️ @${sender.split('@')[0]} mengirim link!\n\nLink tidak diperbolehkan di grup ini.`,
          mentions: [sender],
        });
        await sock.sendMessage(chatJid, {
          delete: msg.key,
        });
      }
    }
  });

  // Scheduled tasks
  // Clean temp files every 6 hours
  cron.schedule('0 */6 * * *', () => {
    cleanTemp();
    console.log(chalk.blue('[CRON] Temp files cleaned'));
  });

  // Log uptime every hour
  cron.schedule('0 * * * *', () => {
    const uptime = formatDuration(Date.now() - startTime);
    console.log(chalk.blue(`[CRON] Uptime: ${uptime}`));
  });
}

// Start the bot
startBot().catch((err) => {
  console.log(chalk.red(`[FATAL] ${err.message}`));
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.log(chalk.red(`[UNCAUGHT] ${err.message}`));
});

process.on('unhandledRejection', (err) => {
  console.log(chalk.red(`[UNHANDLED] ${err}`));
});
