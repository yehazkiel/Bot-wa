const config = require('../config');
const { fetchJson, fetchBuffer, isUrl } = require('../lib/utils');

module.exports = [
  {
    name: 'ytmp3',
    aliases: ['yta', 'youtubeaudio'],
    category: 'downloader',
    description: 'Download audio dari YouTube',
    usage: 'ytmp3 <url_youtube>',
    handler: async (ctx) => {
      if (!ctx.text || !isUrl(ctx.text)) {
        return ctx.reply(
          `Gunakan: ${config.prefix}ytmp3 <url_youtube>\n\nContoh: ${config.prefix}ytmp3 https://youtu.be/xxxxx`
        );
      }
      await ctx.reply('⏳ Sedang memproses, mohon tunggu...');
      try {
        const apiUrl = 'https://api.cobalt.tools/api/json';
        const data = await fetchJson(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          data: { url: ctx.text, isAudioOnly: true },
        });
        if (data.url) {
          const buffer = await fetchBuffer(data.url);
          await ctx.sock.sendMessage(
            ctx.chatJid,
            {
              audio: buffer,
              mimetype: 'audio/mpeg',
              ptt: false,
            },
            { quoted: ctx.msg }
          );
        } else {
          await ctx.reply('❌ Gagal download audio. Coba lagi nanti.');
        }
      } catch {
        await ctx.reply(
          '❌ Gagal download audio. Server sedang sibuk, coba lagi nanti.'
        );
      }
    },
  },
  {
    name: 'ytmp4',
    aliases: ['ytv', 'youtubevideo'],
    category: 'downloader',
    description: 'Download video dari YouTube',
    usage: 'ytmp4 <url_youtube>',
    handler: async (ctx) => {
      if (!ctx.text || !isUrl(ctx.text)) {
        return ctx.reply(
          `Gunakan: ${config.prefix}ytmp4 <url_youtube>\n\nContoh: ${config.prefix}ytmp4 https://youtu.be/xxxxx`
        );
      }
      await ctx.reply('⏳ Sedang memproses, mohon tunggu...');
      try {
        const apiUrl = 'https://api.cobalt.tools/api/json';
        const data = await fetchJson(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          data: { url: ctx.text },
        });
        if (data.url) {
          const buffer = await fetchBuffer(data.url);
          await ctx.sock.sendMessage(
            ctx.chatJid,
            {
              video: buffer,
              mimetype: 'video/mp4',
              caption: '✅ Video berhasil didownload!',
            },
            { quoted: ctx.msg }
          );
        } else {
          await ctx.reply('❌ Gagal download video. Coba lagi nanti.');
        }
      } catch {
        await ctx.reply(
          '❌ Gagal download video. Server sedang sibuk, coba lagi nanti.'
        );
      }
    },
  },
  {
    name: 'tiktok',
    aliases: ['tt', 'tiktokdl'],
    category: 'downloader',
    description: 'Download video TikTok tanpa watermark',
    usage: 'tiktok <url_tiktok>',
    handler: async (ctx) => {
      if (!ctx.text || !isUrl(ctx.text)) {
        return ctx.reply(
          `Gunakan: ${config.prefix}tiktok <url_tiktok>\n\nContoh: ${config.prefix}tiktok https://vt.tiktok.com/xxxxx`
        );
      }
      await ctx.reply('⏳ Sedang memproses, mohon tunggu...');
      try {
        const apiUrl = 'https://api.cobalt.tools/api/json';
        const data = await fetchJson(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          data: { url: ctx.text },
        });
        if (data.url) {
          const buffer = await fetchBuffer(data.url);
          await ctx.sock.sendMessage(
            ctx.chatJid,
            {
              video: buffer,
              mimetype: 'video/mp4',
              caption: '✅ TikTok berhasil didownload!',
            },
            { quoted: ctx.msg }
          );
        } else {
          await ctx.reply('❌ Gagal download TikTok. Coba lagi nanti.');
        }
      } catch {
        await ctx.reply(
          '❌ Gagal download TikTok. Coba lagi nanti.'
        );
      }
    },
  },
  {
    name: 'instagram',
    aliases: ['ig', 'igdl'],
    category: 'downloader',
    description: 'Download post/reel Instagram',
    usage: 'instagram <url_instagram>',
    handler: async (ctx) => {
      if (!ctx.text || !isUrl(ctx.text)) {
        return ctx.reply(
          `Gunakan: ${config.prefix}instagram <url_instagram>\n\nContoh: ${config.prefix}ig https://www.instagram.com/p/xxxxx`
        );
      }
      await ctx.reply('⏳ Sedang memproses, mohon tunggu...');
      try {
        const apiUrl = 'https://api.cobalt.tools/api/json';
        const data = await fetchJson(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          data: { url: ctx.text },
        });
        if (data.url) {
          const buffer = await fetchBuffer(data.url);
          const isVideo = ctx.text.includes('/reel/');
          if (isVideo) {
            await ctx.sock.sendMessage(
              ctx.chatJid,
              {
                video: buffer,
                mimetype: 'video/mp4',
                caption: '✅ Instagram Reel berhasil didownload!',
              },
              { quoted: ctx.msg }
            );
          } else {
            await ctx.sock.sendMessage(
              ctx.chatJid,
              {
                image: buffer,
                mimetype: 'image/jpeg',
                caption: '✅ Instagram Post berhasil didownload!',
              },
              { quoted: ctx.msg }
            );
          }
        } else {
          await ctx.reply('❌ Gagal download Instagram. Coba lagi nanti.');
        }
      } catch {
        await ctx.reply(
          '❌ Gagal download Instagram. Coba lagi nanti.'
        );
      }
    },
  },
  {
    name: 'twitter',
    aliases: ['tw', 'x', 'twitterdl'],
    category: 'downloader',
    description: 'Download video dari Twitter/X',
    usage: 'twitter <url_twitter>',
    handler: async (ctx) => {
      if (!ctx.text || !isUrl(ctx.text)) {
        return ctx.reply(
          `Gunakan: ${config.prefix}twitter <url_twitter>\n\nContoh: ${config.prefix}twitter https://twitter.com/user/status/xxxxx`
        );
      }
      await ctx.reply('⏳ Sedang memproses, mohon tunggu...');
      try {
        const apiUrl = 'https://api.cobalt.tools/api/json';
        const data = await fetchJson(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          data: { url: ctx.text },
        });
        if (data.url) {
          const buffer = await fetchBuffer(data.url);
          await ctx.sock.sendMessage(
            ctx.chatJid,
            {
              video: buffer,
              mimetype: 'video/mp4',
              caption: '✅ Twitter/X berhasil didownload!',
            },
            { quoted: ctx.msg }
          );
        } else {
          await ctx.reply('❌ Gagal download Twitter. Coba lagi nanti.');
        }
      } catch {
        await ctx.reply(
          '❌ Gagal download Twitter. Coba lagi nanti.'
        );
      }
    },
  },
  {
    name: 'facebook',
    aliases: ['fb', 'fbdl'],
    category: 'downloader',
    description: 'Download video dari Facebook',
    usage: 'facebook <url_facebook>',
    handler: async (ctx) => {
      if (!ctx.text || !isUrl(ctx.text)) {
        return ctx.reply(
          `Gunakan: ${config.prefix}facebook <url_facebook>`
        );
      }
      await ctx.reply('⏳ Sedang memproses, mohon tunggu...');
      try {
        const apiUrl = 'https://api.cobalt.tools/api/json';
        const data = await fetchJson(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          data: { url: ctx.text },
        });
        if (data.url) {
          const buffer = await fetchBuffer(data.url);
          await ctx.sock.sendMessage(
            ctx.chatJid,
            {
              video: buffer,
              mimetype: 'video/mp4',
              caption: '✅ Facebook video berhasil didownload!',
            },
            { quoted: ctx.msg }
          );
        } else {
          await ctx.reply('❌ Gagal download Facebook video.');
        }
      } catch {
        await ctx.reply('❌ Gagal download Facebook video.');
      }
    },
  },
  {
    name: 'mediafire',
    aliases: ['mf'],
    category: 'downloader',
    description: 'Download file dari MediaFire',
    usage: 'mediafire <url_mediafire>',
    handler: async (ctx) => {
      if (!ctx.text || !ctx.text.includes('mediafire.com')) {
        return ctx.reply(
          `Gunakan: ${config.prefix}mediafire <url_mediafire>`
        );
      }
      await ctx.reply('⏳ Sedang memproses, mohon tunggu...');
      try {
        const axios = require('axios');
        const res = await axios.get(ctx.text);
        const html = res.data;
        const downloadUrl = html.match(
          /href="(https:\/\/download[^"]+)"/
        );
        const fileName = html.match(
          /class="dl-btn-label"[^>]*>([^<]+)/
        );
        const fileSize = html.match(
          /class="dl-info"[^>]*>.*?<span[^>]*>([^<]+)/s
        );

        if (downloadUrl) {
          const buffer = await fetchBuffer(downloadUrl[1]);
          await ctx.sock.sendMessage(
            ctx.chatJid,
            {
              document: buffer,
              mimetype: 'application/octet-stream',
              fileName: fileName ? fileName[1].trim() : 'file',
              caption: `✅ MediaFire Download\n📁 Nama: ${fileName ? fileName[1].trim() : 'file'}\n📊 Size: ${fileSize ? fileSize[1].trim() : 'Unknown'}`,
            },
            { quoted: ctx.msg }
          );
        } else {
          await ctx.reply('❌ Gagal mendapatkan link download!');
        }
      } catch {
        await ctx.reply('❌ Gagal download dari MediaFire!');
      }
    },
  },
];
