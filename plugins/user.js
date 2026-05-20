const config = require('../config');
const db = require('../lib/database');

module.exports = [
  {
    name: 'profile',
    aliases: ['profil', 'me'],
    category: 'user',
    description: 'Lihat profil kamu',
    handler: async (ctx) => {
      const user = db.getUser(ctx.sender);
      const nextLevelXP = user.level * 100;
      const progressBar =
        '█'.repeat(Math.floor((user.xp / nextLevelXP) * 10)) +
        '░'.repeat(10 - Math.floor((user.xp / nextLevelXP) * 10));

      let text = '👤 *Profil Pengguna*\n\n';
      text += `📌 Nomor: @${ctx.sender.split('@')[0]}\n`;
      text += `📝 Nama: ${user.name || '-'}\n`;
      text += `🏷️ Level: ${user.level}\n`;
      text += `⭐ XP: ${user.xp}/${nextLevelXP}\n`;
      text += `[${progressBar}]\n`;
      text += `💎 Premium: ${user.premium ? 'Ya' : 'Tidak'}\n`;
      text += `✅ Registered: ${user.registered ? 'Ya' : 'Tidak'}\n`;
      text += `🚫 Banned: ${user.banned ? 'Ya' : 'Tidak'}`;

      await ctx.sock.sendMessage(
        ctx.chatJid,
        { text, mentions: [ctx.sender] },
        { quoted: ctx.msg }
      );
    },
  },
  {
    name: 'register',
    aliases: ['reg', 'daftar'],
    category: 'user',
    description: 'Daftarkan dirimu ke bot',
    usage: 'register <nama>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}register <nama>\n\nContoh: ${config.prefix}register Budi`
        );
      }
      const user = db.getUser(ctx.sender);
      if (user.registered) {
        return ctx.reply('❌ Kamu sudah terdaftar!');
      }
      db.updateUser(ctx.sender, {
        name: ctx.text,
        registered: true,
        regTime: Date.now(),
      });
      await ctx.reply(
        `✅ Registrasi berhasil!\n\n📌 Nama: ${ctx.text}\n🆔 ID: @${ctx.sender.split('@')[0]}`,
        { mentions: [ctx.sender] }
      );
    },
  },
  {
    name: 'level',
    aliases: ['lvl', 'rank'],
    category: 'user',
    description: 'Cek level kamu',
    handler: async (ctx) => {
      const user = db.getUser(ctx.sender);
      const nextLevelXP = user.level * 100;
      const remaining = nextLevelXP - user.xp;

      await ctx.reply(
        '🏆 *Level Info*\n\n' +
          `🏷️ Level: ${user.level}\n` +
          `⭐ XP: ${user.xp}/${nextLevelXP}\n` +
          `📊 Tersisa: ${remaining} XP ke level ${user.level + 1}`
      );
    },
  },
  {
    name: 'leaderboard',
    aliases: ['lb', 'top'],
    category: 'user',
    description: 'Lihat peringkat user',
    handler: async (ctx) => {
      const users = db.getAllUsers();
      const sorted = Object.entries(users)
        .filter(([, u]) => u.registered)
        .sort(
          ([, a], [, b]) =>
            b.level * 1000 + b.xp - (a.level * 1000 + a.xp)
        )
        .slice(0, 10);

      if (sorted.length === 0) {
        return ctx.reply('Belum ada user yang terdaftar!');
      }

      const mentions = sorted.map(([jid]) => jid);
      let text = '🏆 *Leaderboard Top 10*\n\n';
      const medals = ['🥇', '🥈', '🥉'];
      for (let i = 0; i < sorted.length; i++) {
        const [jid, user] = sorted[i];
        const medal = medals[i] || `${i + 1}.`;
        text += `${medal} @${jid.split('@')[0]} - Lv.${user.level} (${user.xp} XP)\n`;
      }

      await ctx.sock.sendMessage(
        ctx.chatJid,
        { text, mentions },
        { quoted: ctx.msg }
      );
    },
  },
  {
    name: 'setpremium',
    category: 'owner',
    description: 'Set user sebagai premium',
    usage: 'setpremium @user',
    ownerOnly: true,
    handler: async (ctx) => {
      let targetJid;
      if (ctx.quoted) {
        targetJid = ctx.quoted.sender;
      } else if (ctx.args[0]) {
        const { parseJid } = require('../lib/utils');
        targetJid = parseJid(ctx.args[0]);
      } else {
        return ctx.reply(
          `Gunakan: ${config.prefix}setpremium @user`
        );
      }
      db.updateUser(targetJid, { premium: true });
      await ctx.reply(
        `✅ @${targetJid.split('@')[0]} sekarang menjadi premium!`
      );
    },
  },
  {
    name: 'delpremium',
    category: 'owner',
    description: 'Hapus status premium user',
    usage: 'delpremium @user',
    ownerOnly: true,
    handler: async (ctx) => {
      let targetJid;
      if (ctx.quoted) {
        targetJid = ctx.quoted.sender;
      } else if (ctx.args[0]) {
        const { parseJid } = require('../lib/utils');
        targetJid = parseJid(ctx.args[0]);
      } else {
        return ctx.reply(
          `Gunakan: ${config.prefix}delpremium @user`
        );
      }
      db.updateUser(targetJid, { premium: false });
      await ctx.reply(
        `✅ Premium @${targetJid.split('@')[0]} telah dihapus!`
      );
    },
  },
];
