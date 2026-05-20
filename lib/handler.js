const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const config = require('../config');
const db = require('./database');

const commands = new Map();

function loadPlugins() {
  const pluginDir = path.join(__dirname, '..', 'plugins');
  const files = fs.readdirSync(pluginDir).filter((f) => f.endsWith('.js'));
  for (const file of files) {
    try {
      const plugin = require(path.join(pluginDir, file));
      if (Array.isArray(plugin)) {
        for (const cmd of plugin) {
          registerCommand(cmd);
        }
      } else if (plugin.name) {
        registerCommand(plugin);
      }
    } catch (err) {
      console.log(
        chalk.red(`[ERROR] Failed to load plugin ${file}: ${err.message}`)
      );
    }
  }
  console.log(
    chalk.green(`[INFO] Loaded ${commands.size} commands from ${files.length} plugins`)
  );
}

function registerCommand(cmd) {
  if (cmd.name) {
    commands.set(cmd.name, cmd);
  }
  if (cmd.aliases) {
    for (const alias of cmd.aliases) {
      commands.set(alias, cmd);
    }
  }
}

function getCommand(name) {
  return commands.get(name);
}

function getAllCommands() {
  const unique = new Map();
  for (const [, cmd] of commands) {
    unique.set(cmd.name, cmd);
  }
  return Array.from(unique.values());
}

function getCommandsByCategory(category) {
  return getAllCommands().filter((cmd) => cmd.category === category);
}

function getCategories() {
  const cats = new Set();
  for (const cmd of getAllCommands()) {
    if (cmd.category) cats.add(cmd.category);
  }
  return Array.from(cats);
}

async function handleMessage(sock, msg) {
  if (!msg.message) return;
  if (msg.key.fromMe) return;

  const sender =
    msg.key.participant || msg.key.remoteJid;
  const isGroup = msg.key.remoteJid.endsWith('@g.us');
  const chatJid = msg.key.remoteJid;

  // Check if banned
  if (db.isBanned(sender)) return;

  // Check if group is muted
  if (isGroup) {
    const groupSetting = db.getGroupSetting(chatJid);
    if (groupSetting.mute) {
      const isOwnerMsg =
        sender.replace('@s.whatsapp.net', '') === config.ownerNumber;
      if (!isOwnerMsg) return;
    }
  }

  // Extract message text
  const messageType = Object.keys(msg.message).find(
    (k) =>
      k !== 'senderKeyDistributionMessage' &&
      k !== 'messageContextInfo'
  );
  let text = '';
  if (messageType === 'conversation') {
    text = msg.message.conversation;
  } else if (messageType === 'extendedTextMessage') {
    text = msg.message.extendedTextMessage.text;
  } else if (messageType === 'imageMessage') {
    text = msg.message.imageMessage.caption || '';
  } else if (messageType === 'videoMessage') {
    text = msg.message.videoMessage.caption || '';
  }

  // Check prefix
  const prefix = config.prefix;
  if (!text.startsWith(prefix)) {
    // Add XP for chatting
    db.addXP(sender, 5);
    return;
  }

  const args = text.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = getCommand(commandName);
  if (!command) return;

  // Check owner-only command
  const isOwner =
    sender.replace('@s.whatsapp.net', '') === config.ownerNumber;
  if (command.ownerOnly && !isOwner) {
    await sock.sendMessage(chatJid, {
      text: '❌ Perintah ini hanya untuk owner bot!',
    });
    return;
  }

  // Check group-only command
  if (command.groupOnly && !isGroup) {
    await sock.sendMessage(chatJid, {
      text: '❌ Perintah ini hanya bisa digunakan di grup!',
    });
    return;
  }

  // Check admin-only command
  if (command.adminOnly && isGroup) {
    const groupMeta = await sock.groupMetadata(chatJid);
    const participant = groupMeta.participants.find(
      (p) => p.id === sender
    );
    if (
      !participant ||
      (participant.admin !== 'admin' &&
        participant.admin !== 'superadmin')
    ) {
      if (!isOwner) {
        await sock.sendMessage(chatJid, {
          text: '❌ Perintah ini hanya untuk admin grup!',
        });
        return;
      }
    }
  }

  // Check bot admin for group commands
  if (command.botAdmin && isGroup) {
    const groupMeta = await sock.groupMetadata(chatJid);
    const botJid = sock.user.id.replace(/:\d+/, '');
    const botParticipant = groupMeta.participants.find((p) =>
      p.id.includes(botJid.split('@')[0])
    );
    if (
      !botParticipant ||
      (botParticipant.admin !== 'admin' &&
        botParticipant.admin !== 'superadmin')
    ) {
      await sock.sendMessage(chatJid, {
        text: '❌ Bot harus menjadi admin grup untuk menggunakan perintah ini!',
      });
      return;
    }
  }

  // Add XP
  db.addXP(sender, 10);

  // Build context
  const ctx = {
    sock,
    msg,
    args,
    text: args.join(' '),
    prefix,
    commandName,
    sender,
    chatJid,
    isGroup,
    isOwner,
    messageType,
    quoted: msg.message?.extendedTextMessage?.contextInfo?.quotedMessage
      ? {
          message: msg.message.extendedTextMessage.contextInfo.quotedMessage,
          sender:
            msg.message.extendedTextMessage.contextInfo.participant,
          key: {
            remoteJid: chatJid,
            fromMe: false,
            id: msg.message.extendedTextMessage.contextInfo.stanzaId,
            participant:
              msg.message.extendedTextMessage.contextInfo.participant,
          },
        }
      : null,
    reply: async (text, opts = {}) => {
      return sock.sendMessage(
        chatJid,
        { text, ...opts },
        { quoted: msg }
      );
    },
    react: async (emoji) => {
      return sock.sendMessage(chatJid, {
        react: { text: emoji, key: msg.key },
      });
    },
  };

  try {
    await ctx.react('⏳');
    await command.handler(ctx);
    await ctx.react('✅');
  } catch (err) {
    console.log(
      chalk.red(
        `[ERROR] Command ${commandName}: ${err.message}`
      )
    );
    await ctx.react('❌');
    await ctx.reply(`❌ Error: ${err.message}`);
  }
}

module.exports = {
  loadPlugins,
  handleMessage,
  getCommand,
  getAllCommands,
  getCommandsByCategory,
  getCategories,
};
