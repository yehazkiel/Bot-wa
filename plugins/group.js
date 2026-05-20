const config = require('../config');
const db = require('../lib/database');
const { parseJid } = require('../lib/utils');

module.exports = [
  {
    name: 'kick',
    aliases: ['remove'],
    category: 'group',
    description: 'Keluarkan member dari grup',
    usage: 'kick @user',
    groupOnly: true,
    adminOnly: true,
    botAdmin: true,
    handler: async (ctx) => {
      let targetJid;
      if (ctx.quoted) {
        targetJid = ctx.quoted.sender;
      } else if (ctx.args[0]) {
        targetJid = parseJid(ctx.args[0]);
      } else {
        return ctx.reply(`Gunakan: ${config.prefix}kick @user atau reply pesan user`);
      }
      await ctx.sock.groupParticipantsUpdate(
        ctx.chatJid,
        [targetJid],
        'remove'
      );
      await ctx.reply(
        `✅ @${targetJid.split('@')[0]} telah dikeluarkan dari grup`
      );
    },
  },
  {
    name: 'add',
    category: 'group',
    description: 'Tambahkan member ke grup',
    usage: 'add <nomor>',
    groupOnly: true,
    adminOnly: true,
    botAdmin: true,
    handler: async (ctx) => {
      if (!ctx.args[0]) {
        return ctx.reply(`Gunakan: ${config.prefix}add <nomor>`);
      }
      const targetJid = parseJid(ctx.args[0]);
      try {
        await ctx.sock.groupParticipantsUpdate(
          ctx.chatJid,
          [targetJid],
          'add'
        );
        await ctx.reply(
          `✅ @${targetJid.split('@')[0]} berhasil ditambahkan ke grup`
        );
      } catch {
        await ctx.reply('❌ Gagal menambahkan member. Mungkin nomor tidak valid atau privasi tertutup.');
      }
    },
  },
  {
    name: 'promote',
    category: 'group',
    description: 'Jadikan member sebagai admin',
    usage: 'promote @user',
    groupOnly: true,
    adminOnly: true,
    botAdmin: true,
    handler: async (ctx) => {
      let targetJid;
      if (ctx.quoted) {
        targetJid = ctx.quoted.sender;
      } else if (ctx.args[0]) {
        targetJid = parseJid(ctx.args[0]);
      } else {
        return ctx.reply(
          `Gunakan: ${config.prefix}promote @user atau reply pesan user`
        );
      }
      await ctx.sock.groupParticipantsUpdate(
        ctx.chatJid,
        [targetJid],
        'promote'
      );
      await ctx.reply(
        `✅ @${targetJid.split('@')[0]} sekarang menjadi admin`
      );
    },
  },
  {
    name: 'demote',
    category: 'group',
    description: 'Hapus status admin member',
    usage: 'demote @user',
    groupOnly: true,
    adminOnly: true,
    botAdmin: true,
    handler: async (ctx) => {
      let targetJid;
      if (ctx.quoted) {
        targetJid = ctx.quoted.sender;
      } else if (ctx.args[0]) {
        targetJid = parseJid(ctx.args[0]);
      } else {
        return ctx.reply(
          `Gunakan: ${config.prefix}demote @user atau reply pesan user`
        );
      }
      await ctx.sock.groupParticipantsUpdate(
        ctx.chatJid,
        [targetJid],
        'demote'
      );
      await ctx.reply(
        `✅ @${targetJid.split('@')[0]} sudah bukan admin lagi`
      );
    },
  },
  {
    name: 'groupinfo',
    aliases: ['infogroup', 'gcinfo'],
    category: 'group',
    description: 'Informasi grup',
    groupOnly: true,
    handler: async (ctx) => {
      const meta = await ctx.sock.groupMetadata(ctx.chatJid);
      const admins = meta.participants
        .filter((p) => p.admin)
        .map((p) => `• @${p.id.split('@')[0]}`)
        .join('\n');
      const adminJids = meta.participants
        .filter((p) => p.admin)
        .map((p) => p.id);

      const info =
        '📋 *Informasi Grup*\n\n' +
        `📌 Nama: ${meta.subject}\n` +
        `🆔 ID: ${meta.id}\n` +
        `👥 Member: ${meta.participants.length}\n` +
        `📝 Deskripsi:\n${meta.desc || 'Tidak ada'}\n\n` +
        `👑 Admin (${adminJids.length}):\n${admins}`;

      await ctx.sock.sendMessage(
        ctx.chatJid,
        { text: info, mentions: adminJids },
        { quoted: ctx.msg }
      );
    },
  },
  {
    name: 'setname',
    aliases: ['setgcname', 'setsubject'],
    category: 'group',
    description: 'Ubah nama grup',
    usage: 'setname <nama_baru>',
    groupOnly: true,
    adminOnly: true,
    botAdmin: true,
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}setname <nama_baru>`);
      }
      await ctx.sock.groupUpdateSubject(ctx.chatJid, ctx.text);
      await ctx.reply(`✅ Nama grup berhasil diubah menjadi: ${ctx.text}`);
    },
  },
  {
    name: 'setdesc',
    aliases: ['setgcdesc', 'setdescription'],
    category: 'group',
    description: 'Ubah deskripsi grup',
    usage: 'setdesc <deskripsi_baru>',
    groupOnly: true,
    adminOnly: true,
    botAdmin: true,
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}setdesc <deskripsi_baru>`
        );
      }
      await ctx.sock.groupUpdateDescription(ctx.chatJid, ctx.text);
      await ctx.reply('✅ Deskripsi grup berhasil diubah!');
    },
  },
  {
    name: 'revoke',
    aliases: ['resetlink'],
    category: 'group',
    description: 'Reset link undangan grup',
    groupOnly: true,
    adminOnly: true,
    botAdmin: true,
    handler: async (ctx) => {
      await ctx.sock.groupRevokeInvite(ctx.chatJid);
      await ctx.reply('✅ Link undangan grup berhasil di-reset!');
    },
  },
  {
    name: 'linkgroup',
    aliases: ['linkgc', 'gclink'],
    category: 'group',
    description: 'Dapatkan link undangan grup',
    groupOnly: true,
    adminOnly: true,
    botAdmin: true,
    handler: async (ctx) => {
      const code = await ctx.sock.groupInviteCode(ctx.chatJid);
      await ctx.reply(
        `🔗 *Link Grup:*\n\nhttps://chat.whatsapp.com/${code}`
      );
    },
  },
  {
    name: 'tagall',
    aliases: ['mentionall'],
    category: 'group',
    description: 'Tag semua member grup',
    usage: 'tagall [pesan]',
    groupOnly: true,
    adminOnly: true,
    handler: async (ctx) => {
      const meta = await ctx.sock.groupMetadata(ctx.chatJid);
      const mentions = meta.participants.map((p) => p.id);
      let text = ctx.text
        ? `📢 *${ctx.text}*\n\n`
        : '📢 *Tag All*\n\n';
      for (const jid of mentions) {
        text += `@${jid.split('@')[0]}\n`;
      }
      await ctx.sock.sendMessage(
        ctx.chatJid,
        { text, mentions },
        { quoted: ctx.msg }
      );
    },
  },
  {
    name: 'hidetag',
    aliases: ['ht'],
    category: 'group',
    description: 'Tag semua member tanpa menampilkan mention',
    usage: 'hidetag <pesan>',
    groupOnly: true,
    adminOnly: true,
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}hidetag <pesan>`);
      }
      const meta = await ctx.sock.groupMetadata(ctx.chatJid);
      const mentions = meta.participants.map((p) => p.id);
      await ctx.sock.sendMessage(ctx.chatJid, {
        text: ctx.text,
        mentions,
      });
    },
  },
  {
    name: 'mute',
    category: 'group',
    description: 'Matikan bot di grup',
    groupOnly: true,
    adminOnly: true,
    handler: async (ctx) => {
      db.updateGroupSetting(ctx.chatJid, { mute: true });
      await ctx.reply(
        '🔇 Bot telah di-mute di grup ini. Hanya owner yang bisa menggunakan bot.'
      );
    },
  },
  {
    name: 'unmute',
    category: 'group',
    description: 'Nyalakan bot di grup',
    groupOnly: true,
    adminOnly: true,
    handler: async (ctx) => {
      db.updateGroupSetting(ctx.chatJid, { mute: false });
      await ctx.reply('🔊 Bot telah di-unmute di grup ini.');
    },
  },
  {
    name: 'antilink',
    category: 'group',
    description: 'Aktifkan/nonaktifkan anti-link',
    usage: 'antilink on/off',
    groupOnly: true,
    adminOnly: true,
    botAdmin: true,
    handler: async (ctx) => {
      const setting = db.getGroupSetting(ctx.chatJid);
      if (ctx.text === 'on') {
        db.updateGroupSetting(ctx.chatJid, { antilink: true });
        await ctx.reply('✅ Anti-link telah diaktifkan!');
      } else if (ctx.text === 'off') {
        db.updateGroupSetting(ctx.chatJid, { antilink: false });
        await ctx.reply('✅ Anti-link telah dinonaktifkan!');
      } else {
        await ctx.reply(
          `Anti-link saat ini: ${setting.antilink ? 'ON' : 'OFF'}\n\nGunakan: ${config.prefix}antilink on/off`
        );
      }
    },
  },
  {
    name: 'welcome',
    category: 'group',
    description: 'Aktifkan/nonaktifkan welcome message',
    usage: 'welcome on/off',
    groupOnly: true,
    adminOnly: true,
    handler: async (ctx) => {
      const setting = db.getGroupSetting(ctx.chatJid);
      if (ctx.text === 'on') {
        db.updateGroupSetting(ctx.chatJid, { welcome: true });
        await ctx.reply('✅ Welcome message telah diaktifkan!');
      } else if (ctx.text === 'off') {
        db.updateGroupSetting(ctx.chatJid, { welcome: false });
        await ctx.reply('✅ Welcome message telah dinonaktifkan!');
      } else {
        await ctx.reply(
          `Welcome saat ini: ${setting.welcome ? 'ON' : 'OFF'}\n\nGunakan: ${config.prefix}welcome on/off`
        );
      }
    },
  },
  {
    name: 'listadmin',
    aliases: ['adminlist'],
    category: 'group',
    description: 'Lihat daftar admin grup',
    groupOnly: true,
    handler: async (ctx) => {
      const meta = await ctx.sock.groupMetadata(ctx.chatJid);
      const admins = meta.participants.filter((p) => p.admin);
      const mentions = admins.map((p) => p.id);
      let text = `👑 *Daftar Admin (${admins.length})*\n\n`;
      for (const admin of admins) {
        const role =
          admin.admin === 'superadmin' ? '👑 Super Admin' : '🛡️ Admin';
        text += `${role}: @${admin.id.split('@')[0]}\n`;
      }
      await ctx.sock.sendMessage(
        ctx.chatJid,
        { text, mentions },
        { quoted: ctx.msg }
      );
    },
  },
];
