const config = require('../config');
const handler = require('../lib/handler');
const { formatDuration } = require('../lib/utils');
const db = require('../lib/database');
const os = require('os');

const startTime = Date.now();

module.exports = [
  {
    name: 'menu',
    aliases: ['help', 'bantuan'],
    category: 'info',
    description: 'Menampilkan daftar perintah',
    handler: async (ctx) => {
      const categories = handler.getCategories();
      const user = db.getUser(ctx.sender);
      const uptime = formatDuration(Date.now() - startTime);

      let menuText = `
╭━━━━━━━━━━━━━━━╮
┃  *${config.botName}*
┃  
┃  👤 User: @${ctx.sender.split('@')[0]}
┃  🏷️ Level: ${user.level}
┃  ⭐ XP: ${user.xp}/${user.level * 100}
┃  ⏱️ Uptime: ${uptime}
┃  📊 RAM: ${(os.totalmem() / 1024 / 1024 / 1024).toFixed(1)}GB
┃  🤖 Prefix: ${config.prefix}
╰━━━━━━━━━━━━━━━╯\n`;

      for (const cat of categories.sort()) {
        const cmds = handler.getCommandsByCategory(cat);
        menuText += `\n╭──「 *${cat.toUpperCase()}* 」`;
        for (const cmd of cmds) {
          menuText += `\n┃ ${config.prefix}${cmd.name}`;
          if (cmd.description) menuText += ` - ${cmd.description}`;
        }
        menuText += '\n╰──────────\n';
      }

      menuText += `\n_Ketik ${config.prefix}info <perintah> untuk detail_`;

      await ctx.sock.sendMessage(
        ctx.chatJid,
        {
          text: menuText,
          mentions: [ctx.sender],
        },
        { quoted: ctx.msg }
      );
    },
  },
  {
    name: 'info',
    aliases: ['detail'],
    category: 'info',
    description: 'Detail perintah tertentu',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}info <nama_perintah>`
        );
      }
      const cmd = handler.getCommand(ctx.text.toLowerCase());
      if (!cmd) {
        return ctx.reply('❌ Perintah tidak ditemukan!');
      }
      let infoText = '*Detail Perintah*\n\n';
      infoText += `📌 Nama: ${cmd.name}\n`;
      infoText += `📝 Deskripsi: ${cmd.description || '-'}\n`;
      infoText += `📂 Kategori: ${cmd.category || '-'}\n`;
      infoText += `🔗 Alias: ${cmd.aliases ? cmd.aliases.join(', ') : '-'}\n`;
      infoText += `👑 Owner Only: ${cmd.ownerOnly ? 'Ya' : 'Tidak'}\n`;
      infoText += `👥 Grup Only: ${cmd.groupOnly ? 'Ya' : 'Tidak'}\n`;
      infoText += `🛡️ Admin Only: ${cmd.adminOnly ? 'Ya' : 'Tidak'}\n`;
      if (cmd.usage) infoText += `\n💡 Penggunaan: ${config.prefix}${cmd.usage}`;
      await ctx.reply(infoText);
    },
  },
  {
    name: 'ping',
    aliases: ['speed', 'p'],
    category: 'info',
    description: 'Cek kecepatan respon bot',
    handler: async (ctx) => {
      const start = Date.now();
      await ctx.reply('_Mengukur..._');
      const end = Date.now();
      const uptime = formatDuration(Date.now() - startTime);
      await ctx.reply(
        '🏓 *Pong!*\n\n' +
          `⚡ Speed: ${end - start}ms\n` +
          `⏱️ Uptime: ${uptime}\n` +
          `💾 RAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
      );
    },
  },
  {
    name: 'runtime',
    aliases: ['uptime'],
    category: 'info',
    description: 'Menampilkan waktu aktif bot',
    handler: async (ctx) => {
      const uptime = formatDuration(Date.now() - startTime);
      await ctx.reply(`⏱️ Bot sudah aktif selama: ${uptime}`);
    },
  },
  {
    name: 'owner',
    aliases: ['creator'],
    category: 'info',
    description: 'Info owner bot',
    handler: async (ctx) => {
      await ctx.sock.sendMessage(ctx.chatJid, {
        contacts: {
          displayName: config.ownerName,
          contacts: [
            {
              vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${config.ownerName}\nTEL;type=CELL;type=VOICE;waid=${config.ownerNumber}:+${config.ownerNumber}\nEND:VCARD`,
            },
          ],
        },
      });
    },
  },
  {
    name: 'script',
    aliases: ['sc', 'source'],
    category: 'info',
    description: 'Source code bot',
    handler: async (ctx) => {
      await ctx.reply(
        '📂 *Source Code Bot*\n\nhttps://github.com/yehazkiel/Bot-wa\n\nJangan lupa ⭐ star ya!'
      );
    },
  },
];
