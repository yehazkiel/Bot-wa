const config = require('../config');

const quotes = [
  'Hidup itu seperti bersepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak. - Albert Einstein',
  'Jangan menunggu kesempatan, ciptakanlah. - George Bernard Shaw',
  'Kesuksesan adalah perjalanan, bukan tujuan. - Ben Sweetland',
  'Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang kamu lakukan. - Steve Jobs',
  'Kegagalan adalah bumbu yang memberi rasa pada keberhasilan.',
  'Pendidikan adalah senjata paling kuat yang bisa kamu gunakan untuk mengubah dunia. - Nelson Mandela',
  'Waktu terbaik untuk menanam pohon adalah 20 tahun yang lalu. Waktu terbaik kedua adalah sekarang.',
  'Jangan takut gagal, tapi takutlah untuk tidak pernah mencoba.',
  'Hidup bukan tentang menunggu badai berlalu, tapi belajar menari di tengah hujan.',
  'Keberanian bukanlah ketiadaan rasa takut, melainkan kemampuan untuk bertindak meskipun takut.',
  'Jadilah perubahan yang ingin kamu lihat di dunia ini. - Mahatma Gandhi',
  'Ilmu itu lebih baik daripada harta. Ilmu menjaga engkau dan engkau menjaga harta. - Ali bin Abi Thalib',
];

const truthQuestions = [
  'Siapa orang yang paling sering kamu stalking di media sosial?',
  'Apa hal paling memalukan yang pernah kamu lakukan?',
  'Pernahkah kamu berbohong kepada sahabatmu?',
  'Apa rahasia terbesarmu yang belum pernah kamu ceritakan?',
  'Siapa crush pertamamu?',
  'Hal apa yang paling kamu sesali?',
  'Pernahkah kamu menangis karena film?',
  'Apa kebiasaan burukmu yang tidak diketahui orang lain?',
  'Jika bisa mengubah satu hal di masa lalu, apa itu?',
  'Siapa orang yang paling kamu kagumi dan mengapa?',
];

const dareChallenge = [
  'Kirim pesan "Aku kangen kamu" ke kontak terakhir yang kamu chat!',
  'Ganti foto profil WA menjadi foto terlucu yang kamu punya selama 1 jam!',
  'Kirim voice note sambil menyanyi lagu anak-anak!',
  'Update status WA dengan kalimat "Aku sedang jatuh cinta" selama 1 jam!',
  'Kirim sticker sebanyak 10 sticker ke grup ini!',
  'Ketik pesan dengan mata tertutup dan kirim apa adanya!',
  'Puji 3 orang di grup ini secara tulus!',
  'Ceritakan momen paling memalukan di depan umum!',
  'Tiru gaya bicara admin selama 5 menit!',
  'Kirim foto selfie tanpa filter!',
];

module.exports = [
  {
    name: 'quote',
    aliases: ['quotes', 'motivasi'],
    category: 'fun',
    description: 'Dapatkan quote motivasi',
    handler: async (ctx) => {
      const quote = quotes[Math.floor(Math.random() * quotes.length)];
      await ctx.reply(`💬 *Quote of the Day*\n\n"${quote}"`);
    },
  },
  {
    name: 'truth',
    category: 'fun',
    description: 'Dapatkan pertanyaan truth',
    handler: async (ctx) => {
      const question =
        truthQuestions[
          Math.floor(Math.random() * truthQuestions.length)
        ];
      await ctx.reply(`🤔 *Truth*\n\n${question}`);
    },
  },
  {
    name: 'dare',
    category: 'fun',
    description: 'Dapatkan tantangan dare',
    handler: async (ctx) => {
      const challenge =
        dareChallenge[
          Math.floor(Math.random() * dareChallenge.length)
        ];
      await ctx.reply(`😈 *Dare*\n\n${challenge}`);
    },
  },
  {
    name: 'flip',
    aliases: ['coinflip', 'coin'],
    category: 'fun',
    description: 'Lempar koin (heads/tails)',
    handler: async (ctx) => {
      const result = Math.random() < 0.5 ? 'Heads 🪙' : 'Tails 🪙';
      await ctx.reply(`*Lempar Koin*\n\nHasil: ${result}`);
    },
  },
  {
    name: 'dice',
    aliases: ['dadu'],
    category: 'fun',
    description: 'Lempar dadu',
    handler: async (ctx) => {
      const sides = parseInt(ctx.args[0]) || 6;
      const result = Math.floor(Math.random() * sides) + 1;
      await ctx.reply(
        `🎲 *Lempar Dadu (${sides} sisi)*\n\nHasil: ${result}`
      );
    },
  },
  {
    name: 'rng',
    aliases: ['random', 'acak'],
    category: 'fun',
    description: 'Generate angka random',
    usage: 'rng <min> <max>',
    handler: async (ctx) => {
      const min = parseInt(ctx.args[0]) || 1;
      const max = parseInt(ctx.args[1]) || 100;
      const result =
        Math.floor(Math.random() * (max - min + 1)) + min;
      await ctx.reply(
        `🔢 *Random Number*\n\n📊 Range: ${min} - ${max}\n🎯 Hasil: ${result}`
      );
    },
  },
  {
    name: 'rate',
    aliases: ['rateme'],
    category: 'fun',
    description: 'Rate sesuatu dari 1-100',
    usage: 'rate <sesuatu>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}rate <sesuatu>`);
      }
      const rating = Math.floor(Math.random() * 100) + 1;
      const stars = '⭐'.repeat(Math.ceil(rating / 20));
      await ctx.reply(
        `📊 *Rating*\n\n📝 "${ctx.text}"\n🏆 Rating: ${rating}/100\n${stars}`
      );
    },
  },
  {
    name: 'ship',
    aliases: ['love', 'couple'],
    category: 'fun',
    description: 'Cek kecocokan pasangan',
    usage: 'ship @user1 @user2',
    handler: async (ctx) => {
      if (ctx.args.length < 2) {
        return ctx.reply(
          `Gunakan: ${config.prefix}ship @user1 @user2`
        );
      }
      const percentage = Math.floor(Math.random() * 100) + 1;
      let status;
      if (percentage >= 80) status = '💕 Sangat Cocok!';
      else if (percentage >= 60) status = '💗 Cukup Cocok';
      else if (percentage >= 40) status = '💛 Lumayan';
      else if (percentage >= 20) status = '💔 Kurang Cocok';
      else status = '💀 Tidak Cocok!';

      const bar =
        '█'.repeat(Math.floor(percentage / 10)) +
        '░'.repeat(10 - Math.floor(percentage / 10));

      await ctx.reply(
        `💘 *Love Calculator*\n\n${ctx.args[0]} ❤️ ${ctx.args[1]}\n\n[${bar}] ${percentage}%\n\n${status}`
      );
    },
  },
  {
    name: 'siapakah',
    aliases: ['whois'],
    category: 'fun',
    description: 'Pilih random member (hanya grup)',
    groupOnly: true,
    handler: async (ctx) => {
      const question = ctx.text || 'orang paling ganteng/cantik';
      const meta = await ctx.sock.groupMetadata(ctx.chatJid);
      const randomMember =
        meta.participants[
          Math.floor(Math.random() * meta.participants.length)
        ];
      await ctx.sock.sendMessage(
        ctx.chatJid,
        {
          text: `🎯 *Siapakah ${question}?*\n\nJawabannya adalah @${randomMember.id.split('@')[0]}!`,
          mentions: [randomMember.id],
        },
        { quoted: ctx.msg }
      );
    },
  },
  {
    name: 'choose',
    aliases: ['pilih'],
    category: 'fun',
    description: 'Pilih salah satu opsi',
    usage: 'choose opsi1 | opsi2 | opsi3',
    handler: async (ctx) => {
      if (!ctx.text || !ctx.text.includes('|')) {
        return ctx.reply(
          `Gunakan: ${config.prefix}choose opsi1 | opsi2 | opsi3`
        );
      }
      const options = ctx.text.split('|').map((o) => o.trim());
      const choice =
        options[Math.floor(Math.random() * options.length)];
      await ctx.reply(
        `🤔 *Bot Memilih...*\n\n📋 Opsi: ${options.join(', ')}\n✅ Pilihan: ${choice}`
      );
    },
  },
  {
    name: 'zodiac',
    aliases: ['zodiak'],
    category: 'fun',
    description: 'Cek ramalan zodiak',
    usage: 'zodiac <dd/mm>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}zodiac <dd/mm>\n\nContoh: ${config.prefix}zodiac 15/03`
        );
      }
      const parts = ctx.text.split('/');
      const day = parseInt(parts[0]);
      const month = parseInt(parts[1]);

      if (!day || !month || day < 1 || day > 31 || month < 1 || month > 12) {
        return ctx.reply('❌ Format tanggal tidak valid! Gunakan dd/mm');
      }

      let zodiac;
      if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) zodiac = '♈ Aries';
      else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) zodiac = '♉ Taurus';
      else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) zodiac = '♊ Gemini';
      else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) zodiac = '♋ Cancer';
      else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) zodiac = '♌ Leo';
      else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) zodiac = '♍ Virgo';
      else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) zodiac = '♎ Libra';
      else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) zodiac = '♏ Scorpio';
      else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) zodiac = '♐ Sagittarius';
      else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) zodiac = '♑ Capricorn';
      else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) zodiac = '♒ Aquarius';
      else zodiac = '♓ Pisces';

      await ctx.reply(
        `🔮 *Zodiak*\n\n📅 Tanggal: ${ctx.text}\n⭐ Zodiak: ${zodiac}`
      );
    },
  },
  {
    name: 'tebakangka',
    aliases: ['guessnum'],
    category: 'fun',
    description: 'Tebak angka 1-10',
    usage: 'tebakangka <angka>',
    handler: async (ctx) => {
      if (!ctx.args[0]) {
        return ctx.reply(
          `Gunakan: ${config.prefix}tebakangka <angka 1-10>`
        );
      }
      const guess = parseInt(ctx.args[0]);
      const answer = Math.floor(Math.random() * 10) + 1;
      if (guess === answer) {
        await ctx.reply(
          `🎉 *BENAR!*\n\n🔢 Angkanya adalah ${answer}!\n\nKamu menang! 🏆`
        );
      } else {
        await ctx.reply(
          `❌ *SALAH!*\n\n🔢 Angkanya adalah ${answer}, kamu menebak ${guess}.`
        );
      }
    },
  },
  {
    name: 'aesthetic',
    category: 'fun',
    description: 'Ubah teks menjadi aesthetic',
    usage: 'aesthetic <teks>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}aesthetic <teks>`
        );
      }
      const aestheticText = ctx.text
        .split('')
        .map((char) => {
          const code = char.charCodeAt(0);
          if (code >= 33 && code <= 126) {
            return String.fromCharCode(code + 65248);
          }
          return char;
        })
        .join('');
      await ctx.reply(aestheticText);
    },
  },
  {
    name: 'reverse',
    aliases: ['balik'],
    category: 'fun',
    description: 'Balikkan teks',
    usage: 'reverse <teks>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}reverse <teks>`);
      }
      const reversed = ctx.text.split('').reverse().join('');
      await ctx.reply(
        `🔄 *Reverse*\n\n📝 Asli: ${ctx.text}\n✅ Hasil: ${reversed}`
      );
    },
  },
];
