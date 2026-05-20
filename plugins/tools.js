const config = require('../config');
const { fetchJson } = require('../lib/utils');
const { evaluate } = require('mathjs');
const moment = require('moment-timezone');
const QRCode = require('qrcode');

module.exports = [
  {
    name: 'calc',
    aliases: ['kalkulator', 'math', 'hitung'],
    category: 'tools',
    description: 'Kalkulator matematika',
    usage: 'calc <ekspresi>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}calc <ekspresi>\n\nContoh: ${config.prefix}calc 2+2*5`
        );
      }
      try {
        const result = evaluate(ctx.text);
        await ctx.reply(
          `🔢 *Kalkulator*\n\n📝 Soal: ${ctx.text}\n✅ Hasil: ${result}`
        );
      } catch {
        await ctx.reply('❌ Ekspresi matematika tidak valid!');
      }
    },
  },
  {
    name: 'translate',
    aliases: ['tr', 'terjemah'],
    category: 'tools',
    description: 'Terjemahkan teks',
    usage: 'translate <kode_bahasa> <teks>',
    handler: async (ctx) => {
      if (ctx.args.length < 2) {
        return ctx.reply(
          `Gunakan: ${config.prefix}translate <kode_bahasa> <teks>\n\nContoh: ${config.prefix}translate en Halo apa kabar\n\nKode bahasa: id, en, ja, ko, zh, ar, fr, de, es, dll.`
        );
      }
      const targetLang = ctx.args[0];
      const text = ctx.args.slice(1).join(' ');
      try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=auto|${targetLang}`;
        const data = await fetchJson(url);
        if (data.responseStatus === 200) {
          await ctx.reply(
            `🌐 *Translate*\n\n📝 Teks: ${text}\n🔤 Bahasa: ${targetLang}\n✅ Hasil: ${data.responseData.translatedText}`
          );
        } else {
          await ctx.reply('❌ Gagal menerjemahkan teks!');
        }
      } catch {
        await ctx.reply('❌ Gagal menerjemahkan teks!');
      }
    },
  },
  {
    name: 'cuaca',
    aliases: ['weather', 'weatherid'],
    category: 'tools',
    description: 'Cek cuaca suatu kota (gratis)',
    usage: 'cuaca <nama_kota>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}cuaca <nama_kota>\n\nContoh: ${config.prefix}cuaca Jakarta`
        );
      }
      try {
        const data = await fetchJson(
          `https://wttr.in/${encodeURIComponent(ctx.text)}?format=j1`
        );
        const current = data.current_condition[0];
        const area = data.nearest_area[0];
        let text = `🌤️ *Cuaca di ${area.areaName[0].value}, ${area.country[0].value}*\n\n`;
        text += `🌡️ Suhu: ${current.temp_C}°C\n`;
        text += `🌡️ Terasa: ${current.FeelsLikeC}°C\n`;
        text += `💧 Kelembaban: ${current.humidity}%\n`;
        text += `☁️ Cuaca: ${current.weatherDesc[0].value}\n`;
        text += `💨 Angin: ${current.windspeedKmph} km/h\n`;
        text += `👁️ Jarak Pandang: ${current.visibility} km\n`;
        text += `☀️ UV Index: ${current.uvIndex}`;
        await ctx.reply(text);
      } catch {
        await ctx.reply('❌ Kota tidak ditemukan!');
      }
    },
  },
  {
    name: 'qr',
    aliases: ['qrcode', 'buatqr'],
    category: 'tools',
    description: 'Buat QR code dari teks',
    usage: 'qr <teks/url>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}qr <teks/url>\n\nContoh: ${config.prefix}qr https://google.com`
        );
      }
      const buffer = await QRCode.toBuffer(ctx.text, {
        width: 512,
        margin: 2,
      });
      await ctx.sock.sendMessage(
        ctx.chatJid,
        {
          image: buffer,
          mimetype: 'image/png',
          caption: `✅ QR Code berhasil dibuat!\n\n📝 Isi: ${ctx.text}`,
        },
        { quoted: ctx.msg }
      );
    },
  },
  {
    name: 'shorturl',
    aliases: ['short', 'tinyurl'],
    category: 'tools',
    description: 'Perpendek URL',
    usage: 'shorturl <url>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}shorturl <url>`);
      }
      try {
        const axios = require('axios');
        const res = await axios.get(
          `https://tinyurl.com/api-create.php?url=${encodeURIComponent(ctx.text)}`
        );
        await ctx.reply(
          `🔗 *URL Shortener*\n\n📝 Asli: ${ctx.text}\n✅ Pendek: ${res.data}`
        );
      } catch {
        await ctx.reply('❌ Gagal memperpendek URL!');
      }
    },
  },
  {
    name: 'waktu',
    aliases: ['time', 'jam'],
    category: 'tools',
    description: 'Lihat waktu di berbagai zona',
    handler: async (ctx) => {
      const zones = [
        { name: 'WIB (Jakarta)', tz: 'Asia/Jakarta' },
        { name: 'WITA (Makassar)', tz: 'Asia/Makassar' },
        { name: 'WIT (Jayapura)', tz: 'Asia/Jayapura' },
        { name: 'Tokyo', tz: 'Asia/Tokyo' },
        { name: 'London', tz: 'Europe/London' },
        { name: 'New York', tz: 'America/New_York' },
      ];
      let text = '🕐 *Waktu Dunia*\n\n';
      for (const zone of zones) {
        text += `${zone.name}: ${moment().tz(zone.tz).format('HH:mm:ss DD/MM/YYYY')}\n`;
      }
      await ctx.reply(text);
    },
  },
  {
    name: 'reminder',
    aliases: ['ingatkan', 'remind'],
    category: 'tools',
    description: 'Set pengingat',
    usage: 'reminder <menit> <pesan>',
    handler: async (ctx) => {
      if (ctx.args.length < 2) {
        return ctx.reply(
          `Gunakan: ${config.prefix}reminder <menit> <pesan>\n\nContoh: ${config.prefix}reminder 5 Makan siang`
        );
      }
      const minutes = parseInt(ctx.args[0]);
      if (isNaN(minutes) || minutes < 1 || minutes > 1440) {
        return ctx.reply('❌ Menit harus antara 1-1440!');
      }
      const message = ctx.args.slice(1).join(' ');
      await ctx.reply(
        `⏰ Pengingat akan dikirim dalam ${minutes} menit!\n📝 Pesan: ${message}`
      );
      setTimeout(async () => {
        await ctx.sock.sendMessage(
          ctx.chatJid,
          {
            text: `⏰ *PENGINGAT!*\n\n📝 ${message}\n\n_Diatur oleh @${ctx.sender.split('@')[0]}_`,
            mentions: [ctx.sender],
          },
          { quoted: ctx.msg }
        );
      }, minutes * 60 * 1000);
    },
  },
  {
    name: 'base64encode',
    aliases: ['b64e', 'encode'],
    category: 'tools',
    description: 'Encode teks ke Base64',
    usage: 'base64encode <teks>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}base64encode <teks>`
        );
      }
      const encoded = Buffer.from(ctx.text).toString('base64');
      await ctx.reply(
        `🔐 *Base64 Encode*\n\n📝 Input: ${ctx.text}\n✅ Output: ${encoded}`
      );
    },
  },
  {
    name: 'base64decode',
    aliases: ['b64d', 'decode'],
    category: 'tools',
    description: 'Decode Base64 ke teks',
    usage: 'base64decode <base64>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}base64decode <base64>`
        );
      }
      try {
        const decoded = Buffer.from(ctx.text, 'base64').toString('utf-8');
        await ctx.reply(
          `🔓 *Base64 Decode*\n\n📝 Input: ${ctx.text}\n✅ Output: ${decoded}`
        );
      } catch {
        await ctx.reply('❌ Input Base64 tidak valid!');
      }
    },
  },
  {
    name: 'randomcolor',
    aliases: ['color', 'warna'],
    category: 'tools',
    description: 'Generate warna random',
    handler: async (ctx) => {
      const hex =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      await ctx.reply(
        `🎨 *Random Color*\n\n🔹 HEX: ${hex}\n🔹 RGB: ${r}, ${g}, ${b}`
      );
    },
  },
  {
    name: 'count',
    aliases: ['charcount', 'hitungkata'],
    category: 'tools',
    description: 'Hitung jumlah karakter & kata',
    usage: 'count <teks>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}count <teks>`);
      }
      const chars = ctx.text.length;
      const words = ctx.text.split(/\s+/).filter(Boolean).length;
      const sentences = ctx.text.split(/[.!?]+/).filter(Boolean).length;
      const lines = ctx.text.split('\n').length;
      await ctx.reply(
        `📊 *Text Counter*\n\n📝 Karakter: ${chars}\n📝 Kata: ${words}\n📝 Kalimat: ${sentences}\n📝 Baris: ${lines}`
      );
    },
  },
  {
    name: 'password',
    aliases: ['genpass', 'randompass'],
    category: 'tools',
    description: 'Generate password random',
    usage: 'password [panjang]',
    handler: async (ctx) => {
      const length = parseInt(ctx.args[0]) || 16;
      if (length < 4 || length > 128) {
        return ctx.reply('❌ Panjang password harus antara 4-128!');
      }
      const charset =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=';
      let password = '';
      for (let i = 0; i < length; i++) {
        password += charset.charAt(
          Math.floor(Math.random() * charset.length)
        );
      }
      await ctx.reply(
        `🔑 *Password Generator*\n\n🔒 Password: \`${password}\`\n📏 Panjang: ${length} karakter`
      );
    },
  },
];
