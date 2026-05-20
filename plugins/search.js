const config = require('../config');
const { fetchJson } = require('../lib/utils');

module.exports = [
  {
    name: 'wikipedia',
    aliases: ['wiki'],
    category: 'search',
    description: 'Cari informasi di Wikipedia',
    usage: 'wikipedia <query>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}wikipedia <query>\n\nContoh: ${config.prefix}wiki Indonesia`
        );
      }
      try {
        const searchUrl = `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ctx.text)}`;
        const data = await fetchJson(searchUrl);
        if (data.type === 'standard' || data.type === 'disambiguation') {
          let wikiText = '📚 *Wikipedia*\n\n';
          wikiText += `📌 *${data.title}*\n\n`;
          wikiText += `${data.extract}\n\n`;
          wikiText += `🔗 ${data.content_urls.desktop.page}`;
          await ctx.reply(wikiText);
        } else {
          await ctx.reply('❌ Artikel tidak ditemukan!');
        }
      } catch {
        await ctx.reply('❌ Artikel tidak ditemukan!');
      }
    },
  },
  {
    name: 'wikien',
    aliases: ['wikienglish'],
    category: 'search',
    description: 'Cari informasi di Wikipedia (English)',
    usage: 'wikien <query>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}wikien <query>\n\nContoh: ${config.prefix}wikien JavaScript`
        );
      }
      try {
        const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(ctx.text)}`;
        const data = await fetchJson(searchUrl);
        if (data.type === 'standard' || data.type === 'disambiguation') {
          let wikiText = '📚 *Wikipedia (EN)*\n\n';
          wikiText += `📌 *${data.title}*\n\n`;
          wikiText += `${data.extract}\n\n`;
          wikiText += `🔗 ${data.content_urls.desktop.page}`;
          await ctx.reply(wikiText);
        } else {
          await ctx.reply('❌ Article not found!');
        }
      } catch {
        await ctx.reply('❌ Article not found!');
      }
    },
  },
  {
    name: 'github',
    aliases: ['gh'],
    category: 'search',
    description: 'Cari profil GitHub',
    usage: 'github <username>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}github <username>\n\nContoh: ${config.prefix}github yehazkiel`
        );
      }
      try {
        const data = await fetchJson(
          `https://api.github.com/users/${encodeURIComponent(ctx.text)}`
        );
        let text = '🐙 *GitHub Profile*\n\n';
        text += `📌 Username: ${data.login}\n`;
        text += `📝 Nama: ${data.name || '-'}\n`;
        text += `📍 Lokasi: ${data.location || '-'}\n`;
        text += `📦 Repos: ${data.public_repos}\n`;
        text += `👥 Followers: ${data.followers}\n`;
        text += `👤 Following: ${data.following}\n`;
        text += `📅 Bergabung: ${new Date(data.created_at).toLocaleDateString('id-ID')}\n`;
        text += `📝 Bio: ${data.bio || '-'}\n`;
        text += `🔗 ${data.html_url}`;

        if (data.avatar_url) {
          const { fetchBuffer } = require('../lib/utils');
          const avatar = await fetchBuffer(data.avatar_url);
          await ctx.sock.sendMessage(
            ctx.chatJid,
            {
              image: avatar,
              mimetype: 'image/jpeg',
              caption: text,
            },
            { quoted: ctx.msg }
          );
        } else {
          await ctx.reply(text);
        }
      } catch {
        await ctx.reply('❌ User GitHub tidak ditemukan!');
      }
    },
  },
  {
    name: 'npm',
    aliases: ['npmjs'],
    category: 'search',
    description: 'Cari package di NPM',
    usage: 'npm <package_name>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}npm <nama_package>\n\nContoh: ${config.prefix}npm axios`
        );
      }
      try {
        const data = await fetchJson(
          `https://registry.npmjs.org/${encodeURIComponent(ctx.text)}`
        );
        const latest = data['dist-tags'].latest;
        const info = data.versions[latest];
        let text = '📦 *NPM Package*\n\n';
        text += `📌 Nama: ${data.name}\n`;
        text += `📝 Deskripsi: ${data.description || '-'}\n`;
        text += `🏷️ Versi: ${latest}\n`;
        text += `👤 Author: ${typeof info.author === 'object' ? info.author.name : info.author || '-'}\n`;
        text += `📜 Lisensi: ${info.license || '-'}\n`;
        text += `🔗 https://www.npmjs.com/package/${data.name}`;
        await ctx.reply(text);
      } catch {
        await ctx.reply('❌ Package NPM tidak ditemukan!');
      }
    },
  },
  {
    name: 'ip',
    aliases: ['ipinfo', 'iplookup'],
    category: 'search',
    description: 'Lookup informasi IP address',
    usage: 'ip <ip_address>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}ip <ip_address>\n\nContoh: ${config.prefix}ip 8.8.8.8`
        );
      }
      try {
        const data = await fetchJson(
          `http://ip-api.com/json/${encodeURIComponent(ctx.text)}`
        );
        if (data.status === 'success') {
          let text = '🌐 *IP Lookup*\n\n';
          text += `📌 IP: ${data.query}\n`;
          text += `🏢 ISP: ${data.isp}\n`;
          text += `🏙️ Kota: ${data.city}\n`;
          text += `🗺️ Region: ${data.regionName}\n`;
          text += `🌍 Negara: ${data.country}\n`;
          text += `📍 Lat/Lon: ${data.lat}, ${data.lon}\n`;
          text += `🕐 Timezone: ${data.timezone}`;
          await ctx.reply(text);
        } else {
          await ctx.reply('❌ IP address tidak valid!');
        }
      } catch {
        await ctx.reply('❌ Gagal lookup IP!');
      }
    },
  },
  {
    name: 'quote',
    aliases: ['quoteen', 'randomquote'],
    category: 'search',
    description: 'Dapatkan quote random dari internet',
    handler: async (ctx) => {
      try {
        const data = await fetchJson('https://api.quotable.io/random');
        await ctx.reply(
          `💬 *Random Quote*\n\n"${data.content}"\n\n— *${data.author}*`
        );
      } catch {
        const fallbackQuotes = [
          { content: 'The only way to do great work is to love what you do.', author: 'Steve Jobs' },
          { content: 'Innovation distinguishes between a leader and a follower.', author: 'Steve Jobs' },
          { content: 'Life is what happens when you\'re busy making other plans.', author: 'John Lennon' },
        ];
        const q = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        await ctx.reply(`💬 *Random Quote*\n\n"${q.content}"\n\n— *${q.author}*`);
      }
    },
  },
  {
    name: 'meme',
    aliases: ['randommeme'],
    category: 'search',
    description: 'Dapatkan meme random',
    handler: async (ctx) => {
      try {
        const data = await fetchJson('https://meme-api.com/gimme');
        if (data.url) {
          const { fetchBuffer } = require('../lib/utils');
          const buffer = await fetchBuffer(data.url);
          await ctx.sock.sendMessage(
            ctx.chatJid,
            {
              image: buffer,
              mimetype: 'image/jpeg',
              caption: `😂 *${data.title}*\n\n👍 ${data.ups} upvotes\n📌 r/${data.subreddit}`,
            },
            { quoted: ctx.msg }
          );
        } else {
          await ctx.reply('❌ Gagal mendapatkan meme!');
        }
      } catch {
        await ctx.reply('❌ Gagal mendapatkan meme!');
      }
    },
  },
];
