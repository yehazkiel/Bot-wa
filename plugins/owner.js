const config = require('../config');
const db = require('../lib/database');
const { parseJid } = require('../lib/utils');

module.exports = [
  {
    name: 'broadcast',
    aliases: ['bc'],
    category: 'owner',
    description: 'Broadcast pesan ke semua chat',
    usage: 'broadcast <pesan>',
    ownerOnly: true,
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}broadcast <pesan>`);
      }
      const users = db.getAllUsers();
      const jids = Object.keys(users);
      let success = 0;
      for (const jid of jids) {
        try {
          await ctx.sock.sendMessage(jid, {
            text: `📢 *BROADCAST*\n\n${ctx.text}\n\n- ${config.botName}`,
          });
          success++;
        } catch {
          // skip failed
        }
      }
      await ctx.reply(
        `✅ Broadcast terkirim ke ${success}/${jids.length} chat`
      );
    },
  },
  {
    name: 'ban',
    aliases: ['block'],
    category: 'owner',
    description: 'Ban pengguna dari bot',
    usage: 'ban @user',
    ownerOnly: true,
    handler: async (ctx) => {
      let targetJid;
      if (ctx.quoted) {
        targetJid = ctx.quoted.sender;
      } else if (ctx.args[0]) {
        targetJid = parseJid(ctx.args[0]);
      } else {
        return ctx.reply(`Gunakan: ${config.prefix}ban @user atau reply pesan user`);
      }
      db.banUser(targetJid);
      await ctx.reply(
        `✅ @${targetJid.split('@')[0]} telah di-ban dari bot`,
        { mentions: [targetJid] }
      );
    },
  },
  {
    name: 'unban',
    aliases: ['unblock'],
    category: 'owner',
    description: 'Unban pengguna dari bot',
    usage: 'unban @user',
    ownerOnly: true,
    handler: async (ctx) => {
      let targetJid;
      if (ctx.quoted) {
        targetJid = ctx.quoted.sender;
      } else if (ctx.args[0]) {
        targetJid = parseJid(ctx.args[0]);
      } else {
        return ctx.reply(
          `Gunakan: ${config.prefix}unban @user atau reply pesan user`
        );
      }
      db.unbanUser(targetJid);
      await ctx.reply(
        `✅ @${targetJid.split('@')[0]} telah di-unban`,
        { mentions: [targetJid] }
      );
    },
  },
  {
    name: 'banlist',
    category: 'owner',
    description: 'Lihat daftar pengguna yang di-ban',
    ownerOnly: true,
    handler: async (ctx) => {
      const users = db.getAllUsers();
      const banned = Object.entries(users)
        .filter(([, u]) => u.banned)
        .map(([jid]) => `• @${jid.split('@')[0]}`);
      if (banned.length === 0) {
        return ctx.reply('Tidak ada pengguna yang di-ban.');
      }
      const mentions = Object.entries(users)
        .filter(([, u]) => u.banned)
        .map(([jid]) => jid);
      await ctx.sock.sendMessage(
        ctx.chatJid,
        {
          text: `🚫 *Daftar Ban (${banned.length})*\n\n${banned.join('\n')}`,
          mentions,
        },
        { quoted: ctx.msg }
      );
    },
  },
  {
    name: 'setprefix',
    category: 'owner',
    description: 'Ubah prefix bot',
    usage: 'setprefix <prefix_baru>',
    ownerOnly: true,
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}setprefix <prefix_baru>`
        );
      }
      config.prefix = ctx.text;
      await ctx.reply(`✅ Prefix berhasil diubah menjadi: ${ctx.text}`);
    },
  },
  {
    name: 'setbotname',
    category: 'owner',
    description: 'Ubah nama bot',
    usage: 'setbotname <nama_baru>',
    ownerOnly: true,
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}setbotname <nama_baru>`
        );
      }
      config.botName = ctx.text;
      await ctx.reply(`✅ Nama bot berhasil diubah menjadi: ${ctx.text}`);
    },
  },
  {
    name: 'join',
    category: 'owner',
    description: 'Bot join ke grup via link',
    usage: 'join <link_grup>',
    ownerOnly: true,
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}join <link_grup>`);
      }
      const link = ctx.text.match(
        /chat\.whatsapp\.com\/([a-zA-Z0-9]+)/
      );
      if (!link) {
        return ctx.reply('❌ Link grup tidak valid!');
      }
      try {
        await ctx.sock.groupAcceptInvite(link[1]);
        await ctx.reply('✅ Berhasil join ke grup!');
      } catch {
        await ctx.reply('❌ Gagal join ke grup!');
      }
    },
  },
  {
    name: 'leave',
    category: 'owner',
    description: 'Bot keluar dari grup',
    ownerOnly: true,
    groupOnly: true,
    handler: async (ctx) => {
      await ctx.reply('👋 Sayonara~');
      await ctx.sock.groupLeave(ctx.chatJid);
    },
  },
  {
    name: 'eval',
    aliases: ['ev', '>'],
    category: 'owner',
    description: 'Evaluate JavaScript code',
    usage: 'eval <code>',
    ownerOnly: true,
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}eval <code>`);
      }
      try {
        // eslint-disable-next-line no-eval
        let result = eval(ctx.text);
        if (typeof result === 'object') {
          result = JSON.stringify(result, null, 2);
        }
        await ctx.reply(`${result}`);
      } catch (err) {
        await ctx.reply(`❌ Error:\n${err.message}`);
      }
    },
  },
  {
    name: 'cleartmp',
    aliases: ['cleansession'],
    category: 'owner',
    description: 'Bersihkan file temporary',
    ownerOnly: true,
    handler: async (ctx) => {
      const { cleanTemp } = require('../lib/utils');
      cleanTemp();
      await ctx.reply('✅ File temporary berhasil dibersihkan!');
    },
  },
];
