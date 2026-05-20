const config = require('../config');
const { fetchJson } = require('../lib/utils');

module.exports = [
  {
    name: 'ai',
    aliases: ['gpt', 'chatgpt', 'openai'],
    category: 'ai',
    description: 'Chat dengan AI',
    usage: 'ai <pertanyaan>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(
          `Gunakan: ${config.prefix}ai <pertanyaan>\n\nContoh: ${config.prefix}ai Apa itu JavaScript?`
        );
      }
      try {
        const data = await fetchJson(
          `https://api.siputzx.my.id/api/ai/llama33-70b?content=${encodeURIComponent(ctx.text)}`
        );
        if (data && data.data) {
          await ctx.reply(`🤖 *AI Response*\n\n${data.data}`);
        } else {
          await ctx.reply('🤖 Hmm, aku tidak mengerti. Coba tanya yang lain!');
        }
      } catch {
        await ctx.reply('❌ AI sedang tidak tersedia, coba lagi nanti!');
      }
    },
  },
  {
    name: 'simi',
    aliases: ['simsimi'],
    category: 'ai',
    description: 'Chat dengan SimSimi',
    usage: 'simi <pesan>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}simi <pesan>`);
      }
      try {
        const axios = require('axios');
        const res = await axios.post(
          'https://api.simsimi.vn/v1/simtalk',
          new URLSearchParams({ text: ctx.text, lc: 'id' }),
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );
        if (res.data && res.data.message) {
          await ctx.reply(res.data.message);
        } else {
          await ctx.reply('🤖 Hmm, aku tidak mengerti...');
        }
      } catch {
        await ctx.reply('❌ SimSimi sedang tidak tersedia!');
      }
    },
  },
  {
    name: 'gemini',
    aliases: ['bard'],
    category: 'ai',
    description: 'Chat dengan Gemini AI',
    usage: 'gemini <pertanyaan>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}gemini <pertanyaan>`);
      }
      try {
        const data = await fetchJson(
          `https://api.siputzx.my.id/api/ai/gemini-pro?content=${encodeURIComponent(ctx.text)}`
        );
        if (data && data.data) {
          await ctx.reply(`🤖 *Gemini AI*\n\n${data.data}`);
        } else {
          await ctx.reply('❌ Gagal mendapat respon!');
        }
      } catch {
        await ctx.reply('❌ Gemini AI sedang tidak tersedia!');
      }
    },
  },
  {
    name: 'mistral',
    category: 'ai',
    description: 'Chat dengan Mistral AI',
    usage: 'mistral <pertanyaan>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}mistral <pertanyaan>`);
      }
      try {
        const data = await fetchJson(
          `https://api.siputzx.my.id/api/ai/mistral?content=${encodeURIComponent(ctx.text)}`
        );
        if (data && data.data) {
          await ctx.reply(`🤖 *Mistral AI*\n\n${data.data}`);
        } else {
          await ctx.reply('❌ Gagal mendapat respon!');
        }
      } catch {
        await ctx.reply('❌ Mistral AI sedang tidak tersedia!');
      }
    },
  },
  {
    name: 'deepseek',
    category: 'ai',
    description: 'Chat dengan DeepSeek AI',
    usage: 'deepseek <pertanyaan>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}deepseek <pertanyaan>`);
      }
      try {
        const data = await fetchJson(
          `https://api.siputzx.my.id/api/ai/deepseek-r1?content=${encodeURIComponent(ctx.text)}`
        );
        if (data && data.data) {
          await ctx.reply(`🤖 *DeepSeek AI*\n\n${data.data}`);
        } else {
          await ctx.reply('❌ Gagal mendapat respon!');
        }
      } catch {
        await ctx.reply('❌ DeepSeek AI sedang tidak tersedia!');
      }
    },
  },
  {
    name: 'fakta',
    aliases: ['fact', 'randomfact'],
    category: 'ai',
    description: 'Dapatkan fakta menarik random',
    handler: async (ctx) => {
      const fakta = [
        'Madu tidak pernah basi. Arkeolog menemukan madu berusia 3000 tahun di makam Mesir yang masih bisa dimakan.',
        'Gurita memiliki 3 jantung dan darah berwarna biru.',
        'Pisang secara teknis adalah buah beri, sedangkan stroberi bukan.',
        'Sidik jari koala sangat mirip dengan manusia, bahkan bisa membingungkan penyelidik TKP.',
        'Satu petir bisa memanaskan udara di sekitarnya hingga 30.000 Kelvin, 5x lebih panas dari permukaan matahari.',
        'Bumi berputar dengan kecepatan sekitar 1.670 km/jam di khatulistiwa.',
        'Otak manusia menggunakan sekitar 20% dari total energi tubuh.',
        'Ada lebih banyak bintang di alam semesta daripada butiran pasir di semua pantai di Bumi.',
        'Jantung manusia berdetak sekitar 100.000 kali per hari.',
        'DNA manusia 99.9% identik satu sama lain.',
        'Cahaya matahari membutuhkan waktu 8 menit 20 detik untuk sampai ke Bumi.',
        'Tubuh manusia mengandung cukup karbon untuk membuat 9.000 pensil.',
        'Lumba-lumba tidur dengan satu mata terbuka.',
        'Lebah madu bisa mengenali wajah manusia.',
        'Air panas membeku lebih cepat dari air dingin (Efek Mpemba).',
        'Setiap hari, jantungmu memompa sekitar 7.571 liter darah.',
        'Kecoak bisa hidup tanpa kepala selama seminggu.',
        'Harimau memiliki kulit yang bergaris, bukan hanya bulunya.',
        'Gajah adalah satu-satunya hewan yang tidak bisa melompat.',
        'Manusia berbagi 60% DNA dengan pisang.',
      ];
      const randomFact = fakta[Math.floor(Math.random() * fakta.length)];
      await ctx.reply(`🧠 *Fakta Menarik*\n\n${randomFact}`);
    },
  },
  {
    name: 'pantun',
    category: 'ai',
    description: 'Dapatkan pantun random',
    handler: async (ctx) => {
      const pantunList = [
        'Pergi ke pasar membeli roti,\nJangan lupa beli susu juga,\nHidup ini memang penuh arti,\nKalau kita mau berusaha.',
        'Burung merpati terbang tinggi,\nHinggap di dahan pohon rambutan,\nHari ini sangat berarti,\nKarena penuh kebahagiaan.',
        'Jalan-jalan ke kota Malang,\nSinggah sebentar di kota Batu,\nHidup jangan terlalu bimbang,\nJalani saja satu per satu.',
        'Buah mangga buah durian,\nDimakan enak di sore hari,\nJangan suka bermalas-malasan,\nAgar hidup penuh prestasi.',
        'Pergi berlayar ke Sulawesi,\nMembawa oleh-oleh untuk semua,\nJangan pernah merasa sendiri,\nKarena Tuhan selalu bersama.',
        'Ikan paus di lautan luas,\nBerenang bersama kawanannya,\nBelajarlah dengan tekun dan puas,\nAgar tercapai cita-citanya.',
        'Ke Bandung naik kereta api,\nSinggah dulu di Cimahi,\nMari kita jaga sesama ini,\nAgar dunia penuh harmoni.',
        'Bunga mawar merah merona,\nTumbuh indah di taman sari,\nJanganlah bersedih dan resah gulana,\nEsok pasti lebih baik dari hari ini.',
      ];
      const randomPantun = pantunList[Math.floor(Math.random() * pantunList.length)];
      await ctx.reply(`📝 *Pantun*\n\n${randomPantun}`);
    },
  },
  {
    name: 'ceritahorror',
    aliases: ['horror', 'ceritaseram'],
    category: 'ai',
    description: 'Cerita horror pendek',
    handler: async (ctx) => {
      const stories = [
        'Aku terbangun tengah malam karena mendengar suara ketukan di jendela kamar. Aku tinggal di lantai 13.',
        'Aku menemukan diary lama di loteng. Halaman terakhir bertuliskan: "Dia sudah membaca ini. Dia ada di belakangmu sekarang."',
        'Setiap malam, aku mendengar langkah kaki di loteng. Anehnya, rumah ini tidak punya loteng.',
        'Aku bermain petak umpet dengan anakku. Ketika aku menemukannya di lemari, dia berbisik: "Sst, ada orang lain yang juga bersembunyi di sini."',
        'Aku baru saja menidurkan anakku. Dari bawah tempat tidurnya, aku mendengar suara: "Papa, ada seseorang di atas tempat tidurku."',
        'Cermin di kamar mandiku menampilkan bayangan yang tersenyum, padahal aku sedang tidak tersenyum.',
        'Alarm rumahku berbunyi jam 3 pagi. Layar CCTV menunjukkan semua pintu terbuka. Tapi aku tinggal sendiri dan semua pintu sudah kukunci.',
        'Aku mendapat notifikasi dari kamera keamanan rumahku. Di sana terlihat seseorang duduk di sofa ruang tamu. Aku tinggal sendiri.',
      ];
      const story = stories[Math.floor(Math.random() * stories.length)];
      await ctx.reply(`👻 *Cerita Horror*\n\n${story}`);
    },
  },
];
