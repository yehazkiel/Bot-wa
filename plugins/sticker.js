const config = require('../config');
const { downloadMedia, getTempPath } = require('../lib/utils');
const fs = require('fs');
const sharp = require('sharp');

module.exports = [
  {
    name: 'sticker',
    aliases: ['s', 'stiker'],
    category: 'converter',
    description: 'Buat sticker dari gambar/video',
    usage: 'sticker (reply/kirim gambar)',
    handler: async (ctx) => {
      let mediaMsg = null;
      let mediaType = null;

      if (
        ctx.messageType === 'imageMessage' ||
        ctx.messageType === 'videoMessage'
      ) {
        mediaMsg = ctx.msg;
        mediaType = ctx.messageType;
      } else if (ctx.quoted) {
        const quotedType = Object.keys(ctx.quoted.message).find(
          (k) =>
            k === 'imageMessage' || k === 'videoMessage'
        );
        if (quotedType) {
          mediaMsg = {
            message: ctx.quoted.message,
            key: ctx.quoted.key,
          };
          mediaType = quotedType;
        }
      }

      if (!mediaMsg) {
        return ctx.reply(
          `Kirim/reply gambar atau video dengan caption ${config.prefix}sticker`
        );
      }

      if (
        mediaType === 'videoMessage' &&
        mediaMsg.message?.videoMessage?.seconds > 10
      ) {
        return ctx.reply('❌ Video maksimal 10 detik!');
      }

      const buffer = await downloadMedia(mediaMsg);

      if (mediaType === 'imageMessage') {
        const stickerBuffer = await sharp(buffer)
          .resize(512, 512, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
          .webp({ quality: 80 })
          .toBuffer();

        await ctx.sock.sendMessage(
          ctx.chatJid,
          {
            sticker: stickerBuffer,
            mimetype: 'image/webp',
          },
          { quoted: ctx.msg }
        );
      } else {
        // For video stickers, send as video note
        const ffmpeg = require('fluent-ffmpeg');
        const inputPath = getTempPath('.mp4');
        const outputPath = getTempPath('.webp');

        fs.writeFileSync(inputPath, buffer);

        await new Promise((resolve, reject) => {
          ffmpeg(inputPath)
            .addOutputOptions([
              '-vcodec libwebp',
              '-vf',
              'scale=512:512:force_original_aspect_ratio=decrease,fps=15,pad=512:512:-1:-1:color=black@0.0,split[a][b];[a]palettegen=reserve_transparent=on:transparency_color=ffffff[p];[b][p]paletteuse',
              '-loop',
              '0',
              '-ss',
              '00:00:00',
              '-t',
              '00:00:10',
              '-preset',
              'default',
              '-an',
              '-vsync',
              '0',
            ])
            .toFormat('webp')
            .save(outputPath)
            .on('end', resolve)
            .on('error', reject);
        });

        const stickerBuffer = fs.readFileSync(outputPath);
        await ctx.sock.sendMessage(
          ctx.chatJid,
          {
            sticker: stickerBuffer,
            mimetype: 'image/webp',
          },
          { quoted: ctx.msg }
        );

        // Cleanup
        try {
          fs.unlinkSync(inputPath);
          fs.unlinkSync(outputPath);
        } catch {
          // ignore
        }
      }
    },
  },
  {
    name: 'toimg',
    aliases: ['toimage', 'stickertoimg'],
    category: 'converter',
    description: 'Ubah sticker menjadi gambar',
    usage: 'toimg (reply sticker)',
    handler: async (ctx) => {
      let stickerMsg = null;

      if (ctx.messageType === 'stickerMessage') {
        stickerMsg = ctx.msg;
      } else if (ctx.quoted) {
        const quotedType = Object.keys(ctx.quoted.message).find(
          (k) => k === 'stickerMessage'
        );
        if (quotedType) {
          stickerMsg = {
            message: ctx.quoted.message,
            key: ctx.quoted.key,
          };
        }
      }

      if (!stickerMsg) {
        return ctx.reply(
          `Reply sticker dengan ${config.prefix}toimg`
        );
      }

      const buffer = await downloadMedia(stickerMsg);
      const imageBuffer = await sharp(buffer).png().toBuffer();

      await ctx.sock.sendMessage(
        ctx.chatJid,
        {
          image: imageBuffer,
          mimetype: 'image/png',
          caption: '✅ Sticker berhasil diubah ke gambar!',
        },
        { quoted: ctx.msg }
      );
    },
  },
  {
    name: 'circle',
    aliases: ['roundsticker'],
    category: 'converter',
    description: 'Buat sticker bulat dari gambar',
    usage: 'circle (reply/kirim gambar)',
    handler: async (ctx) => {
      let mediaMsg = null;

      if (ctx.messageType === 'imageMessage') {
        mediaMsg = ctx.msg;
      } else if (ctx.quoted) {
        const quotedType = Object.keys(ctx.quoted.message).find(
          (k) => k === 'imageMessage'
        );
        if (quotedType) {
          mediaMsg = {
            message: ctx.quoted.message,
            key: ctx.quoted.key,
          };
        }
      }

      if (!mediaMsg) {
        return ctx.reply(
          `Kirim/reply gambar dengan ${config.prefix}circle`
        );
      }

      const buffer = await downloadMedia(mediaMsg);
      const size = 512;
      const circleMask = Buffer.from(
        `<svg><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" /></svg>`
      );

      const stickerBuffer = await sharp(buffer)
        .resize(size, size, { fit: 'cover' })
        .composite([{ input: circleMask, blend: 'dest-in' }])
        .webp()
        .toBuffer();

      await ctx.sock.sendMessage(
        ctx.chatJid,
        { sticker: stickerBuffer, mimetype: 'image/webp' },
        { quoted: ctx.msg }
      );
    },
  },
  {
    name: 'resize',
    aliases: ['resizeimg'],
    category: 'converter',
    description: 'Resize gambar',
    usage: 'resize <width> <height> (reply/kirim gambar)',
    handler: async (ctx) => {
      let mediaMsg = null;

      if (ctx.messageType === 'imageMessage') {
        mediaMsg = ctx.msg;
      } else if (ctx.quoted) {
        const quotedType = Object.keys(ctx.quoted.message).find(
          (k) => k === 'imageMessage'
        );
        if (quotedType) {
          mediaMsg = {
            message: ctx.quoted.message,
            key: ctx.quoted.key,
          };
        }
      }

      if (!mediaMsg) {
        return ctx.reply(
          `Kirim/reply gambar dengan ${config.prefix}resize <width> <height>`
        );
      }

      const width = parseInt(ctx.args[0]) || 512;
      const height = parseInt(ctx.args[1]) || 512;

      if (width > 4096 || height > 4096) {
        return ctx.reply('❌ Ukuran maksimal 4096x4096!');
      }

      const buffer = await downloadMedia(mediaMsg);
      const resizedBuffer = await sharp(buffer)
        .resize(width, height, { fit: 'contain' })
        .png()
        .toBuffer();

      await ctx.sock.sendMessage(
        ctx.chatJid,
        {
          image: resizedBuffer,
          mimetype: 'image/png',
          caption: `✅ Gambar berhasil di-resize ke ${width}x${height}`,
        },
        { quoted: ctx.msg }
      );
    },
  },
];
