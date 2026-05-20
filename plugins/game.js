const config = require('../config');

const tebakKataList = [
  { kata: 'JAVASCRIPT', hint: 'Bahasa pemrograman web' },
  { kata: 'INDONESIA', hint: 'Negara kepulauan terbesar' },
  { kata: 'KUCING', hint: 'Hewan peliharaan yang suka ikan' },
  { kata: 'MATAHARI', hint: 'Bintang terdekat dari bumi' },
  { kata: 'PANCASILA', hint: 'Dasar negara Indonesia' },
  { kata: 'GARUDA', hint: 'Lambang negara Indonesia' },
  { kata: 'BULAN', hint: 'Satelit alami bumi' },
  { kata: 'GAJAH', hint: 'Hewan darat terbesar' },
  { kata: 'HARIMAU', hint: 'Kucing besar bergaris' },
  { kata: 'GUNUNG', hint: 'Tonjolan besar di permukaan bumi' },
  { kata: 'SUNGAI', hint: 'Aliran air alami' },
  { kata: 'KOMPUTER', hint: 'Mesin pengolah data elektronik' },
  { kata: 'TELEPON', hint: 'Alat komunikasi jarak jauh' },
  { kata: 'PESAWAT', hint: 'Kendaraan udara' },
  { kata: 'RUMAH', hint: 'Tempat tinggal manusia' },
];

const riddles = [
  { q: 'Apa yang punya kaki tapi tidak bisa berjalan?', a: 'Meja' },
  { q: 'Semakin diambil semakin banyak. Apa itu?', a: 'Langkah kaki' },
  { q: 'Apa yang bisa kamu pegang tanpa menyentuhnya?', a: 'Napas' },
  { q: 'Apa yang naik tapi tidak pernah turun?', a: 'Umur' },
  { q: 'Apa yang punya mata tapi tidak bisa melihat?', a: 'Jarum' },
  { q: 'Binatang apa yang paling banyak kakinya?', a: 'Kaki seribu' },
  { q: 'Apa yang datang sekali dalam satu menit, dua kali dalam satu momen, tapi tidak pernah dalam seribu tahun?', a: 'Huruf M' },
  { q: 'Apa yang bisa mengisi ruangan tapi tidak memakan tempat?', a: 'Cahaya' },
  { q: 'Benda apa yang semakin panas semakin segar?', a: 'Es krim (terbalik)' },
  { q: 'Gajah apa yang paling kecil?', a: 'Gajah mada (cuma nama)' },
  { q: 'Monyet apa yang menakutkan?', a: 'Monyet-monyet lu!' },
  { q: 'Kenapa Superman bajunya ketat?', a: 'Karena pakai ukuran S' },
];

const triviaQuestions = [
  { q: 'Berapa jumlah provinsi di Indonesia?', a: '38', options: ['34', '36', '38', '40'] },
  { q: 'Siapa presiden pertama Indonesia?', a: 'Soekarno', options: ['Soekarno', 'Soeharto', 'Habibie', 'Megawati'] },
  { q: 'Planet terbesar di tata surya?', a: 'Jupiter', options: ['Mars', 'Jupiter', 'Saturnus', 'Uranus'] },
  { q: 'Berapa jumlah tulang dalam tubuh manusia dewasa?', a: '206', options: ['186', '196', '206', '216'] },
  { q: 'Ibukota Jepang?', a: 'Tokyo', options: ['Osaka', 'Tokyo', 'Kyoto', 'Nagoya'] },
  { q: 'Berapa jumlah surat dalam Al-Quran?', a: '114', options: ['110', '112', '114', '116'] },
  { q: 'Hewan darat tercepat di dunia?', a: 'Cheetah', options: ['Singa', 'Cheetah', 'Kuda', 'Kelinci'] },
  { q: 'Siapa penemu telepon?', a: 'Alexander Graham Bell', options: ['Thomas Edison', 'Nikola Tesla', 'Alexander Graham Bell', 'Albert Einstein'] },
  { q: 'Gunung tertinggi di dunia?', a: 'Everest', options: ['K2', 'Everest', 'Kilimanjaro', 'Denali'] },
  { q: 'Berapa lama bumi mengelilingi matahari?', a: '365 hari', options: ['360 hari', '365 hari', '370 hari', '354 hari'] },
];

const capitalQuiz = [
  { negara: 'Indonesia', ibukota: 'Jakarta' },
  { negara: 'Jepang', ibukota: 'Tokyo' },
  { negara: 'Korea Selatan', ibukota: 'Seoul' },
  { negara: 'Thailand', ibukota: 'Bangkok' },
  { negara: 'Malaysia', ibukota: 'Kuala Lumpur' },
  { negara: 'Filipina', ibukota: 'Manila' },
  { negara: 'Vietnam', ibukota: 'Hanoi' },
  { negara: 'India', ibukota: 'New Delhi' },
  { negara: 'Mesir', ibukota: 'Kairo' },
  { negara: 'Brasil', ibukota: 'Brasilia' },
  { negara: 'Jerman', ibukota: 'Berlin' },
  { negara: 'Prancis', ibukota: 'Paris' },
  { negara: 'Italia', ibukota: 'Roma' },
  { negara: 'Kanada', ibukota: 'Ottawa' },
  { negara: 'Australia', ibukota: 'Canberra' },
];

module.exports = [
  {
    name: 'tebakkata',
    aliases: ['guessword'],
    category: 'game',
    description: 'Tebak kata dari petunjuk',
    handler: async (ctx) => {
      const item = tebakKataList[Math.floor(Math.random() * tebakKataList.length)];
      const scrambled = item.kata.split('').sort(() => Math.random() - 0.5).join('');
      await ctx.reply(`🎮 *Tebak Kata!*\n\n🔤 Huruf acak: ${scrambled}\n💡 Petunjuk: ${item.hint}\n\n⏱️ Jawab dengan mengetik jawabannya!\n\n||Jawaban: ${item.kata}||`);
    },
  },
  {
    name: 'suit',
    aliases: ['rps', 'jankenpon'],
    category: 'game',
    description: 'Batu gunting kertas',
    usage: 'suit <batu/gunting/kertas>',
    handler: async (ctx) => {
      const choices = ['batu', 'gunting', 'kertas'];
      const emojis = { batu: '🪨', gunting: '✂️', kertas: '📄' };
      const input = ctx.text ? ctx.text.toLowerCase() : '';
      if (!choices.includes(input)) {
        return ctx.reply(`Gunakan: ${config.prefix}suit <batu/gunting/kertas>`);
      }
      const bot = choices[Math.floor(Math.random() * 3)];
      let result;
      if (input === bot) result = '🤝 SERI!';
      else if (
        (input === 'batu' && bot === 'gunting') ||
        (input === 'gunting' && bot === 'kertas') ||
        (input === 'kertas' && bot === 'batu')
      ) result = '🎉 KAMU MENANG!';
      else result = '😢 KAMU KALAH!';
      await ctx.reply(`🎮 *Suit!*\n\n👤 Kamu: ${emojis[input]} ${input}\n🤖 Bot: ${emojis[bot]} ${bot}\n\n${result}`);
    },
  },
  {
    name: 'slot',
    aliases: ['slotmachine'],
    category: 'game',
    description: 'Main slot machine',
    handler: async (ctx) => {
      const symbols = ['🍎', '🍊', '🍋', '🍇', '🍒', '💎', '7️⃣', '🔔'];
      const s1 = symbols[Math.floor(Math.random() * symbols.length)];
      const s2 = symbols[Math.floor(Math.random() * symbols.length)];
      const s3 = symbols[Math.floor(Math.random() * symbols.length)];
      let result;
      if (s1 === s2 && s2 === s3) result = '🎉 JACKPOT! Kamu menang besar!';
      else if (s1 === s2 || s2 === s3 || s1 === s3) result = '🎊 Kamu menang kecil!';
      else result = '😢 Kamu kalah! Coba lagi!';
      await ctx.reply(`🎰 *Slot Machine*\n\n╔═══════════╗\n║ ${s1} ┃ ${s2} ┃ ${s3} ║\n╚═══════════╝\n\n${result}`);
    },
  },
  {
    name: 'mathquiz',
    aliases: ['kuismatematika', 'quizmath'],
    category: 'game',
    description: 'Kuis matematika',
    handler: async (ctx) => {
      const ops = ['+', '-', '*'];
      const op = ops[Math.floor(Math.random() * ops.length)];
      let a, b;
      if (op === '*') { a = Math.floor(Math.random() * 12) + 1; b = Math.floor(Math.random() * 12) + 1; }
      else { a = Math.floor(Math.random() * 100) + 1; b = Math.floor(Math.random() * 100) + 1; }
      // eslint-disable-next-line no-eval
      const answer = eval(`${a}${op}${b}`);
      await ctx.reply(`🔢 *Kuis Matematika*\n\n📝 Berapa ${a} ${op} ${b} = ?\n\n⏱️ Jawab dengan mengetik angkanya!\n\n||Jawaban: ${answer}||`);
    },
  },
  {
    name: 'riddle',
    aliases: ['tekateki', 'tebaktebakan'],
    category: 'game',
    description: 'Teka-teki',
    handler: async (ctx) => {
      const r = riddles[Math.floor(Math.random() * riddles.length)];
      await ctx.reply(`🤔 *Teka-Teki*\n\n${r.q}\n\n⏱️ Jawab!\n\n||Jawaban: ${r.a}||`);
    },
  },
  {
    name: 'trivia',
    aliases: ['quiztrivia'],
    category: 'game',
    description: 'Trivia quiz',
    handler: async (ctx) => {
      const t = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
      const shuffled = t.options.sort(() => Math.random() - 0.5);
      let text = `❓ *Trivia Quiz*\n\n${t.q}\n\n`;
      const labels = ['A', 'B', 'C', 'D'];
      shuffled.forEach((opt, i) => { text += `${labels[i]}. ${opt}\n`; });
      text += `\n||Jawaban: ${t.a}||`;
      await ctx.reply(text);
    },
  },
  {
    name: 'scramble',
    aliases: ['acakkata'],
    category: 'game',
    description: 'Susun kata yang diacak',
    handler: async (ctx) => {
      const words = ['KOMPUTER', 'INDONESIA', 'MERDEKA', 'BAHASA', 'SEKOLAH', 'BERMAIN', 'BELAJAR', 'MENULIS', 'MEMBACA', 'MENULIS', 'BERLARI', 'BERENANG', 'TERBANG', 'BERMIMPI', 'BERJUANG'];
      const word = words[Math.floor(Math.random() * words.length)];
      const scrambled = word.split('').sort(() => Math.random() - 0.5).join('');
      await ctx.reply(`🔤 *Scramble*\n\nSusun huruf berikut menjadi kata yang benar:\n\n*${scrambled}*\n\n||Jawaban: ${word}||`);
    },
  },
  {
    name: 'quizcapital',
    aliases: ['quizibukota', 'tebakibukota'],
    category: 'game',
    description: 'Quiz ibukota negara',
    handler: async (ctx) => {
      const q = capitalQuiz[Math.floor(Math.random() * capitalQuiz.length)];
      await ctx.reply(`🌍 *Quiz Ibukota*\n\nApa ibukota dari *${q.negara}*?\n\n||Jawaban: ${q.ibukota}||`);
    },
  },
  {
    name: 'emojiquiz',
    aliases: ['tebakemoji'],
    category: 'game',
    description: 'Tebak dari emoji',
    handler: async (ctx) => {
      const quizzes = [
        { emoji: '🦁👑', answer: 'The Lion King' },
        { emoji: '🕷️🕸️🦸', answer: 'Spider-Man' },
        { emoji: '❄️👸🏰', answer: 'Frozen' },
        { emoji: '🐭🏰✨', answer: 'Mickey Mouse / Disneyland' },
        { emoji: '🦇🌃🦸‍♂️', answer: 'Batman' },
        { emoji: '🧙‍♂️⚡📖', answer: 'Harry Potter' },
        { emoji: '🤖🔫👽', answer: 'Star Wars' },
        { emoji: '🐠🔍🌊', answer: 'Finding Nemo' },
        { emoji: '👻🔫🏠', answer: 'Ghostbusters' },
        { emoji: '🏴‍☠️⚓🗺️', answer: 'Pirates of the Caribbean' },
      ];
      const q = quizzes[Math.floor(Math.random() * quizzes.length)];
      await ctx.reply(`🎮 *Tebak Emoji*\n\nTebak film/karakter dari emoji:\n\n${q.emoji}\n\n||Jawaban: ${q.answer}||`);
    },
  },
  {
    name: 'quiziq',
    aliases: ['iqtest', 'tesiq'],
    category: 'game',
    description: 'Quiz IQ',
    handler: async (ctx) => {
      const questions = [
        { q: 'Jika 2 + 3 = 10, 7 + 2 = 63, 6 + 5 = 66, 8 + 4 = ?', a: '96' },
        { q: 'Angka berapa yang hilang? 1, 1, 2, 3, 5, 8, 13, ?', a: '21 (Fibonacci)' },
        { q: 'Jika kamu berlari dan melewati orang di posisi ke-2, kamu sekarang di posisi berapa?', a: 'Posisi ke-2' },
        { q: '5 + 5 + 5 + 5 = 555. Tambahkan SATU garis lurus untuk membuat persamaan ini benar.', a: 'Tambah garis di + pertama jadi 5 4 5 + 5 + 5 = 555' },
        { q: 'Ada 3 apel di meja. Kamu mengambil 2. Berapa apel yang kamu punya?', a: '2 apel (yang kamu ambil)' },
      ];
      const q = questions[Math.floor(Math.random() * questions.length)];
      await ctx.reply(`🧠 *Quiz IQ*\n\n${q.q}\n\n||Jawaban: ${q.a}||`);
    },
  },
  {
    name: 'tebakangka',
    aliases: ['guessnum'],
    category: 'game',
    description: 'Tebak angka 1-10',
    usage: 'tebakangka <angka>',
    handler: async (ctx) => {
      if (!ctx.args[0]) {
        return ctx.reply(`Gunakan: ${config.prefix}tebakangka <angka 1-10>`);
      }
      const guess = parseInt(ctx.args[0]);
      const answer = Math.floor(Math.random() * 10) + 1;
      if (guess === answer) {
        await ctx.reply(`🎉 *BENAR!* Angkanya adalah ${answer}! 🏆`);
      } else {
        await ctx.reply(`❌ *SALAH!* Angkanya adalah ${answer}, kamu menebak ${guess}.`);
      }
    },
  },
  {
    name: 'tebakbendera',
    aliases: ['quizflag'],
    category: 'game',
    description: 'Tebak bendera negara',
    handler: async (ctx) => {
      const flags = [
        { flag: '🇮🇩', country: 'Indonesia' }, { flag: '🇯🇵', country: 'Jepang' },
        { flag: '🇰🇷', country: 'Korea Selatan' }, { flag: '🇺🇸', country: 'Amerika Serikat' },
        { flag: '🇬🇧', country: 'Inggris' }, { flag: '🇫🇷', country: 'Prancis' },
        { flag: '🇩🇪', country: 'Jerman' }, { flag: '🇮🇹', country: 'Italia' },
        { flag: '🇧🇷', country: 'Brasil' }, { flag: '🇦🇺', country: 'Australia' },
        { flag: '🇨🇳', country: 'China' }, { flag: '🇷🇺', country: 'Rusia' },
        { flag: '🇲🇽', country: 'Meksiko' }, { flag: '🇹🇭', country: 'Thailand' },
        { flag: '🇲🇾', country: 'Malaysia' }, { flag: '🇸🇬', country: 'Singapura' },
      ];
      const f = flags[Math.floor(Math.random() * flags.length)];
      await ctx.reply(`🏴 *Tebak Bendera*\n\n${f.flag}\n\nNegara apa ini?\n\n||Jawaban: ${f.country}||`);
    },
  },
  {
    name: 'tebakkota',
    aliases: ['quizcity'],
    category: 'game',
    description: 'Tebak kota dari deskripsi',
    handler: async (ctx) => {
      const cities = [
        { desc: 'Kota ini dijuluki Kota Pahlawan dan terletak di Jawa Timur', answer: 'Surabaya' },
        { desc: 'Kota ini terkenal dengan Monas dan merupakan ibukota Indonesia', answer: 'Jakarta' },
        { desc: 'Kota ini dijuluki Paris van Java', answer: 'Bandung' },
        { desc: 'Kota ini terkenal dengan Candi Borobudur di dekatnya', answer: 'Magelang' },
        { desc: 'Kota ini dijuluki Kota Gudeg', answer: 'Yogyakarta' },
        { desc: 'Kota ini terkenal dengan Danau Toba', answer: 'Medan' },
        { desc: 'Kota ini dijuluki Kota Bunga', answer: 'Malang' },
        { desc: 'Kota ini terkenal dengan pantai Kuta', answer: 'Denpasar/Bali' },
      ];
      const c = cities[Math.floor(Math.random() * cities.length)];
      await ctx.reply(`🏙️ *Tebak Kota*\n\n${c.desc}\n\n||Jawaban: ${c.answer}||`);
    },
  },
  {
    name: 'tebaklirik',
    aliases: ['guesslyric'],
    category: 'game',
    description: 'Tebak lagu dari lirik',
    handler: async (ctx) => {
      const lyrics = [
        { lyric: '"Kau dan aku saling bertatapan..."', answer: 'Tulus - Hati-Hati di Jalan' },
        { lyric: '"Pergilah kasih, tak perlu kau tangisi..."', answer: 'Chrisye - Pergilah Kasih' },
        { lyric: '"Aku bukan pilihan di hatimu..."', answer: 'Iwan Fals - Yang Terlupakan' },
        { lyric: '"Bukan ku tak hargai..."', answer: 'Peterpan - Mungkin Nanti' },
        { lyric: '"Tak gendong, kemana-mana..."', answer: 'Mbah Surip - Tak Gendong' },
        { lyric: '"Ku mau dia, ku mau dia..."', answer: 'Andmesh - Cinta Luar Biasa' },
      ];
      const l = lyrics[Math.floor(Math.random() * lyrics.length)];
      await ctx.reply(`🎵 *Tebak Lirik*\n\n${l.lyric}\n\nLagu apa ini?\n\n||Jawaban: ${l.answer}||`);
    },
  },
  {
    name: 'wouldyourather',
    aliases: ['wyr'],
    category: 'game',
    description: 'Would you rather?',
    handler: async (ctx) => {
      const choices = [
        ['Bisa terbang', 'Bisa teleportasi'],
        ['Hidup di masa lalu', 'Hidup di masa depan'],
        ['Selalu kedinginan', 'Selalu kepanasan'],
        ['Jadi orang paling pintar', 'Jadi orang paling kaya'],
        ['Bisa baca pikiran orang', 'Bisa menghilang'],
        ['Tidak pernah tidur', 'Tidak pernah makan'],
        ['Hidup tanpa musik', 'Hidup tanpa film'],
        ['Punya kekuatan super', 'Punya kecerdasan super'],
      ];
      const c = choices[Math.floor(Math.random() * choices.length)];
      await ctx.reply(`🤔 *Would You Rather?*\n\nA. ${c[0]}\natau\nB. ${c[1]}\n\nPilih A atau B!`);
    },
  },
];
