const config = require('../config');

const pickupLines = [
  'Kamu pasti capek ya? Soalnya kamu udah lari-larian di pikiranku seharian.',
  'Kalau kamu jadi bunga, aku mau jadi lebahnya. Biar aku bisa terus hinggap di hatimu.',
  'Kamu tahu nggak? Vitamin yang paling aku butuhkan itu vitamin U (you).',
  'Kamu pasti punya peta ya? Soalnya aku tersesat di matamu.',
  'Ayah kamu polisi ya? Soalnya kamu berhasil menangkap hatiku.',
  'Kamu pasti tukang sihir ya? Soalnya setiap aku lihat kamu, yang lain langsung hilang.',
  'Kamu barusan jatuh dari surga ya? Soalnya kamu mirip bidadari.',
  'Aku bukan fotografer, tapi aku bisa membayangkan kita bersama.',
];

const pantunLucu = [
  'Pergi ke toko beli beras,\nDi sana juga beli tahu,\nCowok ganteng tapi gak punya dompet tebal,\nYa sudah, ganteng doang gak laku.',
  'Burung kutilang hinggap di ranting,\nTerbang lagi ke pohon jati,\nJomblo memang menyedihkan,\nTapi lebih sedih kalau gak punya hati.',
  'Ikan lele di dalam kolam,\nDipancing pakai cacing tanah,\nJangan suka begadang malam,\nNanti mukamu kayak kapalan.',
  'Ke pasar beli terasi,\nJangan lupa beli kangkung,\nMau curhat tentang sakit hati,\nTapi sadar diri emang siapa agung.',
];

const jokesId = [
  'Kenapa semut tidak pernah sakit? Karena mereka punya anti-body (antibodi).',
  'Apa bedanya kamu sama kucing? Kucing punya 9 nyawa, kamu cuma punya 1 gebetan.',
  'Kenapa Superman pakai kostum ketat? Karena pakai ukuran S.',
  'Kenapa wifi lebih setia dari pacar? Karena wifi selalu kasih koneksi.',
  'Apa yang terjadi kalau Ironman kawin sama Wonder Woman? Mereka pakai baju besi berdua.',
  'Kenapa matematika itu sedih? Karena punya banyak masalah.',
  'Guru: "Siapa yang bisa buat kalimat dari kata kucing?" Murid: "Rambut saya dikusut kucing!"',
  'Kenapa chicken nugget selalu senang? Karena dia punya banyak teman-teman goreng.',
  'Apa bedanya antara hujan dan air mata? Kalau hujan ada pelanginya, kalau air mata ada dramanya.',
  'Kenapa atap rumah selalu basah kalau hujan? Karena atapnya di luar.',
];

const darkJokes = [
  'Kenapa skeleton tidak berantem? Karena mereka nggak punya nyali.',
  'Apa yang terjadi kalau kamu nggak bayar exorcist? Kamu direpossessed.',
  'Kenapa hantu jadi pembohong yang buruk? Karena kamu bisa lihat tembus mereka.',
  'Apa warna favorit hantu? Boo (blue).',
  'Kenapa vampire selalu sakit? Karena mereka coffin (coughin\').',
];

const puisiList = [
  { judul: 'Malam', isi: 'Malam ini begitu sunyi,\nBintang bertaburan di langit,\nAngin berbisik lembut padaku,\nMembawa kenangan yang tak terlupa.' },
  { judul: 'Hujan', isi: 'Hujan turun membasahi bumi,\nMembawa harap dan cita,\nSetiap tetes airnya,\nMenghapus luka yang ada.' },
  { judul: 'Harapan', isi: 'Di ujung jalan yang gelap,\nAda cahaya yang menanti,\nSelama hati masih berharap,\nTak ada yang sia-sia dalam mimpi.' },
  { judul: 'Rindu', isi: 'Rindu itu seperti angin,\nTak terlihat tapi terasa,\nMenyelinap masuk ke hati,\nTanpa bisa dicegah.' },
];

const cerpenList = [
  { judul: 'Koin di Trotoar', cerita: 'Seorang anak kecil menemukan koin di trotoar. Ia berlari ke toko roti dan membeli sepotong roti. Di perjalanan pulang, ia melihat seekor kucing kelaparan. Tanpa berpikir, ia memberikan setengah rotinya. Kucing itu mengeong senang. Anak itu tersenyum — perutnya lapar, tapi hatinya kenyang.' },
  { judul: 'Payung Merah', cerita: 'Setiap hujan, kakek selalu duduk di teras dengan payung merah di sampingnya. "Untuk siapa payung itu, Kek?" tanyaku. Kakek tersenyum, "Untuk nenekmu. Dulu dia selalu kehujanan saat pulang kerja." Nenek sudah pergi 5 tahun lalu, tapi payung merah itu selalu ada di sana.' },
  { judul: 'Pesan Terakhir', cerita: 'Ponselku bergetar. Pesan dari ibu: "Sudah makan?" Aku mengabaikannya seperti biasa. Keesokan harinya, ponselku bergetar lagi. Tapi kali ini dari kakak: "Ibu masuk rumah sakit." Aku berlari secepat mungkin. Di samping ranjangnya, aku membaca pesan terakhirnya yang belum terkirim: "Ibu sayang kamu."' },
];

const bucinQuotes = [
  'Aku mungkin bukan yang terbaik, tapi aku akan berusaha menjadi yang terbaik untukmu.',
  'Sebelum kenal kamu, aku nggak tahu kalau bahagia itu bisa sesederhana ini.',
  'Kamu itu kayak WiFi, tanpa kamu hidupku nggak ada koneksi.',
  'Dunia ini luas, tapi hatiku cuma cukup buat kamu.',
  'Aku bukan Superman, tapi untuk kamu, aku rela jadi pahlawan.',
  'Kamu adalah alasan kenapa aku senyum tanpa sebab.',
  'Tiap malam aku selalu berdoa, semoga kamu juga merindukanku seperti aku merindukanmu.',
];

const galauQuotes = [
  'Kadang yang paling sakit bukan ditinggalkan, tapi dilupakan.',
  'Tersenyum bukan berarti bahagia. Kadang tersenyum hanya untuk menutupi luka.',
  'Yang paling menyedihkan adalah ketika kamu sangat merindukan seseorang yang tidak merindukanmu.',
  'Aku baik-baik saja. Hanya saja, definisi baik-baik saja itu berbeda dari yang kamu pikirkan.',
  'Pernahkah kamu merasa sendirian di tengah keramaian?',
  'Hujan tidak pernah memilih tempat untuk turun. Sama seperti air mata yang tidak pernah memilih waktu untuk mengalir.',
  'Terkadang diam adalah jawaban terbaik untuk hati yang lelah.',
];

module.exports = [
  {
    name: 'pickup',
    aliases: ['gombal', 'pickupline'],
    category: 'fun',
    description: 'Pickup line / gombal',
    handler: async (ctx) => {
      const line = pickupLines[Math.floor(Math.random() * pickupLines.length)];
      await ctx.reply(`💘 *Pickup Line*\n\n${line}`);
    },
  },
  {
    name: 'pantunlucu',
    aliases: ['pantunfunny'],
    category: 'fun',
    description: 'Pantun lucu',
    handler: async (ctx) => {
      const p = pantunLucu[Math.floor(Math.random() * pantunLucu.length)];
      await ctx.reply(`😂 *Pantun Lucu*\n\n${p}`);
    },
  },
  {
    name: 'jokes',
    aliases: ['joke', 'lelucon'],
    category: 'fun',
    description: 'Jokes Indonesia',
    handler: async (ctx) => {
      const joke = jokesId[Math.floor(Math.random() * jokesId.length)];
      await ctx.reply(`😂 *Jokes*\n\n${joke}`);
    },
  },
  {
    name: 'darkjoke',
    aliases: ['darkhumor'],
    category: 'fun',
    description: 'Dark joke',
    handler: async (ctx) => {
      const joke = darkJokes[Math.floor(Math.random() * darkJokes.length)];
      await ctx.reply(`🌑 *Dark Joke*\n\n${joke}`);
    },
  },
  {
    name: 'puisi',
    aliases: ['poem'],
    category: 'fun',
    description: 'Puisi random',
    handler: async (ctx) => {
      const p = puisiList[Math.floor(Math.random() * puisiList.length)];
      await ctx.reply(`📝 *${p.judul}*\n\n${p.isi}`);
    },
  },
  {
    name: 'cerpen',
    aliases: ['shortstory'],
    category: 'fun',
    description: 'Cerpen pendek',
    handler: async (ctx) => {
      const c = cerpenList[Math.floor(Math.random() * cerpenList.length)];
      await ctx.reply(`📖 *${c.judul}*\n\n${c.cerita}`);
    },
  },
  {
    name: 'bucin',
    aliases: ['quotebucin'],
    category: 'fun',
    description: 'Kata-kata bucin',
    handler: async (ctx) => {
      const q = bucinQuotes[Math.floor(Math.random() * bucinQuotes.length)];
      await ctx.reply(`💕 *Bucin*\n\n${q}`);
    },
  },
  {
    name: 'galau',
    aliases: ['quotegalau', 'sad'],
    category: 'fun',
    description: 'Kata-kata galau',
    handler: async (ctx) => {
      const q = galauQuotes[Math.floor(Math.random() * galauQuotes.length)];
      await ctx.reply(`😢 *Galau*\n\n${q}`);
    },
  },
  {
    name: '8ball',
    aliases: ['magic8ball', 'ask'],
    category: 'fun',
    description: 'Magic 8 Ball',
    usage: '8ball <pertanyaan>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}8ball <pertanyaan>`);
      const answers = [
        'Ya, pasti!', 'Tentu saja.', 'Tanpa ragu.', 'Ya!', 'Kamu bisa mengandalkannya.',
        'Sepertinya iya.', 'Kemungkinan besar.', 'Prospek bagus.', 'Tanda menunjukkan ya.',
        'Tidak jelas, coba lagi.', 'Tanya lagi nanti.', 'Lebih baik tidak diberitahu sekarang.',
        'Tidak bisa diprediksi sekarang.', 'Konsentrasi dan tanya lagi.',
        'Jangan mengandalkannya.', 'Jawabanku adalah tidak.', 'Sumberku mengatakan tidak.',
        'Prospek tidak begitu bagus.', 'Sangat diragukan.',
      ];
      const answer = answers[Math.floor(Math.random() * answers.length)];
      await ctx.reply(`🎱 *Magic 8 Ball*\n\n❓ ${ctx.text}\n\n🔮 ${answer}`);
    },
  },
  {
    name: 'hack',
    aliases: ['fakehack'],
    category: 'fun',
    description: 'Fake hacking (bercanda)',
    usage: 'hack @user',
    handler: async (ctx) => {
      const target = ctx.mentions[0] ? ctx.mentions[0].split('@')[0] : ctx.text || 'target';
      const steps = [
        `[■□□□□□□□□□] 10% - Connecting to ${target}...`,
        '[■■■□□□□□□□] 30% - Bypassing firewall...',
        '[■■■■■□□□□□] 50% - Cracking password...',
        '[■■■■■■■□□□] 70% - Downloading data...',
        '[■■■■■■■■■□] 90% - Covering tracks...',
        '[■■■■■■■■■■] 100% - Complete!',
        '',
        '📂 Data Found:',
        `👤 Username: ${target}`,
        `🔑 Password: ${target}${Math.floor(Math.random() * 9999)}`,
        `📱 IP: ${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        '',
        '⚠️ Ini hanya bercanda! Tidak ada data yang diretas.',
      ];
      await ctx.reply(`🔓 *Hacking ${target}...*\n\n${steps.join('\n')}`);
    },
  },
  {
    name: 'afk',
    aliases: ['away'],
    category: 'fun',
    description: 'Set status AFK',
    usage: 'afk <alasan>',
    handler: async (ctx) => {
      const reason = ctx.text || 'Tidak disebutkan';
      await ctx.reply(`💤 *AFK*\n\n@${ctx.sender.split('@')[0]} sedang AFK.\n📝 Alasan: ${reason}`, { mentions: [ctx.sender] });
    },
  },
  {
    name: 'horoscope',
    aliases: ['ramalan', 'zodiak'],
    category: 'fun',
    description: 'Ramalan zodiak',
    usage: 'horoscope <zodiak>',
    handler: async (ctx) => {
      const zodiacs = {
        aries: { tanggal: '21 Mar - 19 Apr', elemen: 'Api', planet: 'Mars' },
        taurus: { tanggal: '20 Apr - 20 May', elemen: 'Tanah', planet: 'Venus' },
        gemini: { tanggal: '21 May - 20 Jun', elemen: 'Udara', planet: 'Merkurius' },
        cancer: { tanggal: '21 Jun - 22 Jul', elemen: 'Air', planet: 'Bulan' },
        leo: { tanggal: '23 Jul - 22 Aug', elemen: 'Api', planet: 'Matahari' },
        virgo: { tanggal: '23 Aug - 22 Sep', elemen: 'Tanah', planet: 'Merkurius' },
        libra: { tanggal: '23 Sep - 22 Oct', elemen: 'Udara', planet: 'Venus' },
        scorpio: { tanggal: '23 Oct - 21 Nov', elemen: 'Air', planet: 'Pluto' },
        sagittarius: { tanggal: '22 Nov - 21 Dec', elemen: 'Api', planet: 'Jupiter' },
        capricorn: { tanggal: '22 Dec - 19 Jan', elemen: 'Tanah', planet: 'Saturnus' },
        aquarius: { tanggal: '20 Jan - 18 Feb', elemen: 'Udara', planet: 'Uranus' },
        pisces: { tanggal: '19 Feb - 20 Mar', elemen: 'Air', planet: 'Neptunus' },
      };
      if (!ctx.text) {
        let text = '♈ *Zodiak*\n\n';
        Object.keys(zodiacs).forEach((z) => { text += `${z.charAt(0).toUpperCase() + z.slice(1)} (${zodiacs[z].tanggal})\n`; });
        text += `\nGunakan: ${config.prefix}horoscope <zodiak>`;
        return ctx.reply(text);
      }
      const z = ctx.text.toLowerCase();
      if (!zodiacs[z]) return ctx.reply('❌ Zodiak tidak ditemukan!');
      const ramalans = ['Hari ini penuh keberuntungan!', 'Waspada dengan keputusan besar.', 'Cinta akan datang dari arah tak terduga.', 'Fokus pada pekerjaan untuk hasil maksimal.', 'Waktu yang tepat untuk memulai sesuatu yang baru.', 'Jaga kesehatanmu hari ini.'];
      const ramalan = ramalans[Math.floor(Math.random() * ramalans.length)];
      const keberuntungan = Math.floor(Math.random() * 100) + 1;
      await ctx.reply(`♈ *${z.charAt(0).toUpperCase() + z.slice(1)}*\n\n📅 ${zodiacs[z].tanggal}\n🔥 Elemen: ${zodiacs[z].elemen}\n🪐 Planet: ${zodiacs[z].planet}\n\n🔮 Ramalan: ${ramalan}\n🍀 Keberuntungan: ${keberuntungan}%`);
    },
  },
  {
    name: 'couplepp',
    aliases: ['ppcouple'],
    category: 'fun',
    description: 'PP couple random',
    handler: async (ctx) => {
      const couples = [
        { cowo: 'https://i.pinimg.com/236x/7b/0e/5f/7b0e5f9b5c5e5b5b5b5b5b5b5b5b5b5b.jpg', cewe: 'https://i.pinimg.com/236x/8a/1e/6f/8a1e6f9b5c5e5b5b5b5b5b5b5b5b5b5b.jpg' },
      ];
      const c = couples[Math.floor(Math.random() * couples.length)];
      await ctx.reply(`👫 *PP Couple*\n\n👦 Cowok: ${c.cowo}\n👧 Cewek: ${c.cewe}`);
    },
  },
  {
    name: 'truth',
    category: 'fun',
    description: 'Truth or Dare - Truth',
    handler: async (ctx) => {
      const truths = [
        'Siapa crush kamu saat ini?', 'Apa rahasia terbesar kamu?',
        'Apa hal paling memalukan yang pernah kamu lakukan?', 'Siapa yang terakhir kamu stalking di medsos?',
        'Apa kebohongan terbesar yang pernah kamu buat?', 'Siapa orang yang paling kamu benci dan kenapa?',
        'Apa ketakutan terbesar kamu?', 'Pernahkah kamu berbohong ke sahabat kamu?',
        'Apa hal yang ingin kamu ubah dari diri kamu?', 'Siapa yang diam-diam kamu sukai di grup ini?',
        'Apa mimpi paling aneh yang pernah kamu alami?', 'Pernahkah kamu menangis karena film?',
      ];
      const t = truths[Math.floor(Math.random() * truths.length)];
      await ctx.reply(`🤔 *Truth*\n\n${t}`);
    },
  },
  {
    name: 'dare',
    category: 'fun',
    description: 'Truth or Dare - Dare',
    handler: async (ctx) => {
      const dares = [
        'Kirim chat "Aku suka kamu" ke kontak terakhir!', 'Ganti foto profil jadi foto terjelek selama 1 jam!',
        'Voice note nyanyi lagu anak-anak!', 'Ceritakan hal memalukan di grup!',
        'Kirim selfie tanpa filter sekarang!', 'Tulis status WhatsApp "Aku jomblo dan bahagia"!',
        'Telepon kontak terakhir dan bilang "Aku rindu kamu"!', 'Kirim foto gallery terakhir ke grup!',
        'Ganti nama grup jadi nama kamu selama 5 menit!', 'Kirim voice note tertawa selama 10 detik!',
      ];
      const d = dares[Math.floor(Math.random() * dares.length)];
      await ctx.reply(`😈 *Dare*\n\n${d}`);
    },
  },
  {
    name: 'ship',
    aliases: ['love', 'lovecalc'],
    category: 'fun',
    description: 'Love calculator',
    usage: 'ship @user1 @user2',
    handler: async (ctx) => {
      if (ctx.mentions.length < 2) return ctx.reply(`Gunakan: ${config.prefix}ship @user1 @user2`);
      const percentage = Math.floor(Math.random() * 101);
      let status;
      if (percentage >= 80) status = '💕 Cocok banget!';
      else if (percentage >= 60) status = '💗 Lumayan cocok!';
      else if (percentage >= 40) status = '💛 Biasa aja sih.';
      else if (percentage >= 20) status = '💔 Kurang cocok.';
      else status = '💀 Nggak cocok sama sekali!';
      const bar = '█'.repeat(Math.floor(percentage / 10)) + '░'.repeat(10 - Math.floor(percentage / 10));
      await ctx.reply(`💘 *Love Calculator*\n\n👤 @${ctx.mentions[0].split('@')[0]}\n❤️ @${ctx.mentions[1].split('@')[0]}\n\n[${bar}] ${percentage}%\n\n${status}`, { mentions: ctx.mentions });
    },
  },
  {
    name: 'siapakah',
    aliases: ['who', 'whois_fun'],
    category: 'fun',
    description: 'Pilih random member',
    handler: async (ctx) => {
      if (!ctx.isGroup) return ctx.reply('❌ Hanya bisa digunakan di grup!');
      try {
        const metadata = await ctx.sock.groupMetadata(ctx.chatJid);
        const members = metadata.participants;
        const random = members[Math.floor(Math.random() * members.length)];
        await ctx.reply(`🎯 *Siapakah?*\n\nYang terpilih adalah... @${random.id.split('@')[0]}! 🎉`, { mentions: [random.id] });
      } catch {
        await ctx.reply('❌ Gagal mengambil data member!');
      }
    },
  },
  {
    name: 'choose',
    aliases: ['pilih'],
    category: 'fun',
    description: 'Pilih dari beberapa opsi',
    usage: 'choose opsi1 | opsi2 | opsi3',
    handler: async (ctx) => {
      if (!ctx.text || !ctx.text.includes('|')) return ctx.reply(`Gunakan: ${config.prefix}choose opsi1 | opsi2 | opsi3`);
      const options = ctx.text.split('|').map((o) => o.trim()).filter((o) => o);
      const chosen = options[Math.floor(Math.random() * options.length)];
      await ctx.reply(`🎯 *Pilihan*\n\nDari ${options.length} opsi, aku memilih:\n\n*${chosen}*`);
    },
  },
  {
    name: 'rate',
    aliases: ['nilai'],
    category: 'fun',
    description: 'Rate sesuatu',
    usage: 'rate <sesuatu>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}rate <sesuatu>`);
      const rating = Math.floor(Math.random() * 101);
      const stars = '⭐'.repeat(Math.ceil(rating / 20));
      await ctx.reply(`📊 *Rating*\n\n${ctx.text}\n\n${stars}\n${rating}/100`);
    },
  },
  {
    name: 'flip',
    aliases: ['coinflip', 'koin'],
    category: 'fun',
    description: 'Lempar koin',
    handler: async (ctx) => {
      const result = Math.random() > 0.5 ? 'Heads 🪙' : 'Tails 🪙';
      await ctx.reply(`🪙 *Coin Flip*\n\n${result}`);
    },
  },
  {
    name: 'dice',
    aliases: ['dadu'],
    category: 'fun',
    description: 'Lempar dadu',
    handler: async (ctx) => {
      const result = Math.floor(Math.random() * 6) + 1;
      const diceEmoji = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
      await ctx.reply(`🎲 *Dice Roll*\n\n${diceEmoji[result - 1]} ${result}`);
    },
  },
  {
    name: 'rng',
    aliases: ['randomnumber'],
    category: 'fun',
    description: 'Random number generator',
    usage: 'rng <min> <max>',
    handler: async (ctx) => {
      const min = parseInt(ctx.args[0]) || 1;
      const max = parseInt(ctx.args[1]) || 100;
      const result = Math.floor(Math.random() * (max - min + 1)) + min;
      await ctx.reply(`🔢 *Random Number*\n\n${min} - ${max}\n\nHasil: *${result}*`);
    },
  },
  {
    name: 'reverse',
    aliases: ['balik'],
    category: 'fun',
    description: 'Balikkan teks',
    usage: 'reverse <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}reverse <teks>`);
      await ctx.reply(ctx.text.split('').reverse().join(''));
    },
  },
];
