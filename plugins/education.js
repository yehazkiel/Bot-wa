const config = require('../config');

const peribahasaList = [
  { pb: 'Air beriak tanda tak dalam', arti: 'Orang yang banyak bicara biasanya kurang ilmunya.' },
  { pb: 'Bagai air di daun talas', arti: 'Orang yang tidak mempunyai pendirian tetap.' },
  { pb: 'Dimana bumi dipijak, di situ langit dijunjung', arti: 'Harus menghormati adat istiadat tempat tinggal.' },
  { pb: 'Gajah mati meninggalkan gading', arti: 'Orang besar meninggalkan nama dan jasa.' },
  { pb: 'Habis manis sepah dibuang', arti: 'Setelah tidak berguna, dibuang begitu saja.' },
  { pb: 'Nasi sudah menjadi bubur', arti: 'Sesuatu yang sudah terjadi tidak bisa diubah lagi.' },
  { pb: 'Seperti air dengan minyak', arti: 'Dua hal yang tidak bisa bersatu.' },
  { pb: 'Tak ada gading yang tak retak', arti: 'Tidak ada manusia yang sempurna.' },
  { pb: 'Tong kosong nyaring bunyinya', arti: 'Orang yang sedikit ilmunya banyak bicara.' },
  { pb: 'Buah jatuh tidak jauh dari pohonnya', arti: 'Sifat anak tidak jauh berbeda dari orang tuanya.' },
  { pb: 'Biar lambat asal selamat', arti: 'Lebih baik pelan tapi pasti daripada cepat tapi berbahaya.' },
  { pb: 'Sedia payung sebelum hujan', arti: 'Bersiap sebelum sesuatu terjadi.' },
];

const unsurKimia = [
  { simbol: 'H', nama: 'Hidrogen', nomor: 1, massa: '1.008' },
  { simbol: 'He', nama: 'Helium', nomor: 2, massa: '4.003' },
  { simbol: 'C', nama: 'Karbon', nomor: 6, massa: '12.011' },
  { simbol: 'N', nama: 'Nitrogen', nomor: 7, massa: '14.007' },
  { simbol: 'O', nama: 'Oksigen', nomor: 8, massa: '15.999' },
  { simbol: 'Fe', nama: 'Besi', nomor: 26, massa: '55.845' },
  { simbol: 'Au', nama: 'Emas', nomor: 79, massa: '196.967' },
  { simbol: 'Ag', nama: 'Perak', nomor: 47, massa: '107.868' },
  { simbol: 'Cu', nama: 'Tembaga', nomor: 29, massa: '63.546' },
  { simbol: 'Na', nama: 'Natrium', nomor: 11, massa: '22.990' },
  { simbol: 'Al', nama: 'Aluminium', nomor: 13, massa: '26.982' },
  { simbol: 'Si', nama: 'Silikon', nomor: 14, massa: '28.086' },
];

const planets = [
  { nama: 'Merkurius', jarak: '57.9 juta km', diameter: '4.879 km', info: 'Planet terkecil dan terdekat dari Matahari.' },
  { nama: 'Venus', jarak: '108.2 juta km', diameter: '12.104 km', info: 'Planet terpanas dengan suhu 462°C.' },
  { nama: 'Bumi', jarak: '149.6 juta km', diameter: '12.756 km', info: 'Satu-satunya planet yang diketahui memiliki kehidupan.' },
  { nama: 'Mars', jarak: '227.9 juta km', diameter: '6.792 km', info: 'Dijuluki Planet Merah karena oksida besi di permukaannya.' },
  { nama: 'Jupiter', jarak: '778.6 juta km', diameter: '142.984 km', info: 'Planet terbesar di tata surya.' },
  { nama: 'Saturnus', jarak: '1.433,5 juta km', diameter: '120.536 km', info: 'Terkenal dengan cincin-cincinnya yang indah.' },
  { nama: 'Uranus', jarak: '2.872,5 juta km', diameter: '51.118 km', info: 'Planet yang berputar miring 98 derajat.' },
  { nama: 'Neptunus', jarak: '4.495,1 juta km', diameter: '49.528 km', info: 'Planet terjauh dari Matahari dengan angin terkencang.' },
];

const negaraList = [
  { nama: 'Indonesia', ibukota: 'Jakarta', benua: 'Asia', bahasa: 'Bahasa Indonesia', populasi: '~275 juta', luas: '1.905.000 km²' },
  { nama: 'Jepang', ibukota: 'Tokyo', benua: 'Asia', bahasa: 'Jepang', populasi: '~125 juta', luas: '377.975 km²' },
  { nama: 'Amerika Serikat', ibukota: 'Washington D.C.', benua: 'Amerika Utara', bahasa: 'Inggris', populasi: '~331 juta', luas: '9.834.000 km²' },
  { nama: 'Brasil', ibukota: 'Brasilia', benua: 'Amerika Selatan', bahasa: 'Portugis', populasi: '~214 juta', luas: '8.516.000 km²' },
  { nama: 'Jerman', ibukota: 'Berlin', benua: 'Eropa', bahasa: 'Jerman', populasi: '~83 juta', luas: '357.022 km²' },
  { nama: 'Australia', ibukota: 'Canberra', benua: 'Oseania', bahasa: 'Inggris', populasi: '~26 juta', luas: '7.692.000 km²' },
  { nama: 'Mesir', ibukota: 'Kairo', benua: 'Afrika', bahasa: 'Arab', populasi: '~104 juta', luas: '1.002.000 km²' },
  { nama: 'India', ibukota: 'New Delhi', benua: 'Asia', bahasa: 'Hindi & Inggris', populasi: '~1.4 miliar', luas: '3.287.000 km²' },
];

const bahasaCodes = [
  'af - Afrikaans', 'ar - Arab', 'bn - Bengali', 'de - Jerman', 'en - Inggris',
  'es - Spanyol', 'fr - Prancis', 'hi - Hindi', 'id - Indonesia', 'it - Italia',
  'ja - Jepang', 'ko - Korea', 'ms - Melayu', 'nl - Belanda', 'pl - Polandia',
  'pt - Portugis', 'ru - Rusia', 'th - Thailand', 'tr - Turki', 'vi - Vietnam',
  'zh - Mandarin',
];

module.exports = [
  {
    name: 'peribahasa',
    aliases: ['proverb'],
    category: 'education',
    description: 'Peribahasa random',
    handler: async (ctx) => {
      const p = peribahasaList[Math.floor(Math.random() * peribahasaList.length)];
      await ctx.reply(`📖 *Peribahasa*\n\n"${p.pb}"\n\n📝 Arti: ${p.arti}`);
    },
  },
  {
    name: 'unsur',
    aliases: ['kimia', 'element'],
    category: 'education',
    description: 'Info unsur kimia',
    usage: 'unsur <simbol/nama>',
    handler: async (ctx) => {
      if (!ctx.text) {
        const r = unsurKimia[Math.floor(Math.random() * unsurKimia.length)];
        return ctx.reply(`🧪 *Unsur Kimia*\n\n🔬 ${r.nama} (${r.simbol})\n📊 Nomor Atom: ${r.nomor}\n⚖️ Massa Atom: ${r.massa}`);
      }
      const q = ctx.text.toLowerCase();
      const found = unsurKimia.find((u) => u.simbol.toLowerCase() === q || u.nama.toLowerCase() === q);
      if (!found) return ctx.reply('❌ Unsur tidak ditemukan!');
      await ctx.reply(`🧪 *Unsur Kimia*\n\n🔬 ${found.nama} (${found.simbol})\n📊 Nomor Atom: ${found.nomor}\n⚖️ Massa Atom: ${found.massa}`);
    },
  },
  {
    name: 'planet',
    aliases: ['tatasurya'],
    category: 'education',
    description: 'Info planet tata surya',
    usage: 'planet <nama>',
    handler: async (ctx) => {
      if (!ctx.text) {
        let text = '🌍 *Tata Surya*\n\n';
        planets.forEach((p, i) => { text += `${i + 1}. ${p.nama}\n`; });
        text += `\nGunakan: ${config.prefix}planet <nama>`;
        return ctx.reply(text);
      }
      const found = planets.find((p) => p.nama.toLowerCase() === ctx.text.toLowerCase());
      if (!found) return ctx.reply('❌ Planet tidak ditemukan!');
      await ctx.reply(`🌍 *${found.nama}*\n\n📏 Jarak dari Matahari: ${found.jarak}\n📐 Diameter: ${found.diameter}\n📝 ${found.info}`);
    },
  },
  {
    name: 'negara',
    aliases: ['country'],
    category: 'education',
    description: 'Info negara',
    usage: 'negara <nama>',
    handler: async (ctx) => {
      if (!ctx.text) {
        const r = negaraList[Math.floor(Math.random() * negaraList.length)];
        return ctx.reply(`🌏 *${r.nama}*\n\n🏛️ Ibukota: ${r.ibukota}\n🌍 Benua: ${r.benua}\n🗣️ Bahasa: ${r.bahasa}\n👥 Populasi: ${r.populasi}\n📐 Luas: ${r.luas}`);
      }
      const found = negaraList.find((n) => n.nama.toLowerCase() === ctx.text.toLowerCase());
      if (!found) return ctx.reply('❌ Negara tidak ditemukan dalam database!');
      await ctx.reply(`🌏 *${found.nama}*\n\n🏛️ Ibukota: ${found.ibukota}\n🌍 Benua: ${found.benua}\n🗣️ Bahasa: ${found.bahasa}\n👥 Populasi: ${found.populasi}\n📐 Luas: ${found.luas}`);
    },
  },
  {
    name: 'bahasa',
    aliases: ['langcodes', 'kodebahasa'],
    category: 'education',
    description: 'Daftar kode bahasa',
    handler: async (ctx) => {
      let text = '🗣️ *Kode Bahasa*\n\n';
      bahasaCodes.forEach((b) => { text += `${b}\n`; });
      await ctx.reply(text);
    },
  },
  {
    name: 'binary',
    aliases: ['tobinary'],
    category: 'education',
    description: 'Konversi teks ke binary',
    usage: 'binary <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}binary <teks>`);
      const binary = ctx.text.split('').map((c) => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      await ctx.reply(`💻 *Binary*\n\n${binary}`);
    },
  },
  {
    name: 'frombinary',
    aliases: ['binarytotext'],
    category: 'education',
    description: 'Konversi binary ke teks',
    usage: 'frombinary <binary>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}frombinary <binary>`);
      try {
        const text = ctx.text.split(' ').map((b) => String.fromCharCode(parseInt(b, 2))).join('');
        await ctx.reply(`📝 *Teks*\n\n${text}`);
      } catch {
        await ctx.reply('❌ Format binary tidak valid!');
      }
    },
  },
  {
    name: 'hex',
    aliases: ['tohex'],
    category: 'education',
    description: 'Konversi teks ke hexadecimal',
    usage: 'hex <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}hex <teks>`);
      const hex = ctx.text.split('').map((c) => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
      await ctx.reply(`💻 *Hexadecimal*\n\n${hex}`);
    },
  },
  {
    name: 'fromhex',
    aliases: ['hextotext'],
    category: 'education',
    description: 'Konversi hexadecimal ke teks',
    usage: 'fromhex <hex>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}fromhex <hex>`);
      try {
        const text = ctx.text.split(' ').map((h) => String.fromCharCode(parseInt(h, 16))).join('');
        await ctx.reply(`📝 *Teks*\n\n${text}`);
      } catch {
        await ctx.reply('❌ Format hex tidak valid!');
      }
    },
  },
  {
    name: 'roman',
    aliases: ['romawi'],
    category: 'education',
    description: 'Konversi angka ke romawi',
    usage: 'roman <angka>',
    handler: async (ctx) => {
      const num = parseInt(ctx.text);
      if (!num || isNaN(num) || num < 1 || num > 3999) return ctx.reply(`Gunakan: ${config.prefix}roman <1-3999>`);
      const vals = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
      const syms = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];
      let result = '', n = num;
      for (let i = 0; i < vals.length; i++) {
        while (n >= vals[i]) { result += syms[i]; n -= vals[i]; }
      }
      await ctx.reply(`🔢 *Angka Romawi*\n\n${num} = ${result}`);
    },
  },
  {
    name: 'suhu',
    aliases: ['temperature', 'konversisuhu'],
    category: 'education',
    description: 'Konversi suhu',
    usage: 'suhu <angka> <C/F/K>',
    handler: async (ctx) => {
      if (!ctx.args[0] || !ctx.args[1]) return ctx.reply(`Gunakan: ${config.prefix}suhu <angka> <C/F/K>\n\nContoh: ${config.prefix}suhu 100 C`);
      const val = parseFloat(ctx.args[0]);
      const unit = ctx.args[1].toUpperCase();
      if (isNaN(val)) return ctx.reply('❌ Angka tidak valid!');
      let c, f, k;
      if (unit === 'C') { c = val; f = val * 9 / 5 + 32; k = val + 273.15; }
      else if (unit === 'F') { c = (val - 32) * 5 / 9; f = val; k = (val - 32) * 5 / 9 + 273.15; }
      else if (unit === 'K') { c = val - 273.15; f = (val - 273.15) * 9 / 5 + 32; k = val; }
      else return ctx.reply('❌ Unit tidak valid! Gunakan C, F, atau K');
      await ctx.reply(`🌡️ *Konversi Suhu*\n\n${val}°${unit} =\n🔹 ${c.toFixed(2)}°C\n🔹 ${f.toFixed(2)}°F\n🔹 ${k.toFixed(2)}K`);
    },
  },
  {
    name: 'berat',
    aliases: ['weight', 'konversiberat'],
    category: 'education',
    description: 'Konversi berat',
    usage: 'berat <angka> <kg/g/mg/lb/oz>',
    handler: async (ctx) => {
      if (!ctx.args[0] || !ctx.args[1]) return ctx.reply(`Gunakan: ${config.prefix}berat <angka> <kg/g/mg/lb/oz>`);
      const val = parseFloat(ctx.args[0]);
      const unit = ctx.args[1].toLowerCase();
      if (isNaN(val)) return ctx.reply('❌ Angka tidak valid!');
      let kg;
      if (unit === 'kg') kg = val;
      else if (unit === 'g') kg = val / 1000;
      else if (unit === 'mg') kg = val / 1000000;
      else if (unit === 'lb') kg = val * 0.453592;
      else if (unit === 'oz') kg = val * 0.0283495;
      else return ctx.reply('❌ Unit tidak valid!');
      await ctx.reply(`⚖️ *Konversi Berat*\n\n${val} ${unit} =\n🔹 ${kg.toFixed(4)} kg\n🔹 ${(kg * 1000).toFixed(2)} g\n🔹 ${(kg * 1000000).toFixed(0)} mg\n🔹 ${(kg / 0.453592).toFixed(4)} lb\n🔹 ${(kg / 0.0283495).toFixed(4)} oz`);
    },
  },
  {
    name: 'panjang',
    aliases: ['length', 'konversipanjang'],
    category: 'education',
    description: 'Konversi panjang',
    usage: 'panjang <angka> <km/m/cm/mm/mi/ft/in>',
    handler: async (ctx) => {
      if (!ctx.args[0] || !ctx.args[1]) return ctx.reply(`Gunakan: ${config.prefix}panjang <angka> <km/m/cm/mm/mi/ft/in>`);
      const val = parseFloat(ctx.args[0]);
      const unit = ctx.args[1].toLowerCase();
      if (isNaN(val)) return ctx.reply('❌ Angka tidak valid!');
      let m;
      if (unit === 'km') m = val * 1000;
      else if (unit === 'm') m = val;
      else if (unit === 'cm') m = val / 100;
      else if (unit === 'mm') m = val / 1000;
      else if (unit === 'mi') m = val * 1609.34;
      else if (unit === 'ft') m = val * 0.3048;
      else if (unit === 'in') m = val * 0.0254;
      else return ctx.reply('❌ Unit tidak valid!');
      await ctx.reply(`📏 *Konversi Panjang*\n\n${val} ${unit} =\n🔹 ${(m / 1000).toFixed(6)} km\n🔹 ${m.toFixed(4)} m\n🔹 ${(m * 100).toFixed(2)} cm\n🔹 ${(m * 1000).toFixed(1)} mm\n🔹 ${(m / 1609.34).toFixed(6)} mi\n🔹 ${(m / 0.3048).toFixed(4)} ft`);
    },
  },
  {
    name: 'rumusmatika',
    aliases: ['rumus', 'mathformula'],
    category: 'education',
    description: 'Rumus matematika dasar',
    handler: async (ctx) => {
      await ctx.reply('📐 *Rumus Matematika Dasar*\n\n📌 Luas Persegi: s × s\n📌 Luas Persegi Panjang: p × l\n📌 Luas Segitiga: ½ × a × t\n📌 Luas Lingkaran: π × r²\n📌 Keliling Lingkaran: 2 × π × r\n📌 Volume Kubus: s³\n📌 Volume Balok: p × l × t\n📌 Volume Tabung: π × r² × t\n📌 Volume Kerucut: ⅓ × π × r² × t\n📌 Volume Bola: ⁴⁄₃ × π × r³\n📌 Pythagoras: a² + b² = c²\n📌 Luas Trapesium: ½ × (a+b) × t');
    },
  },
  {
    name: 'katamutiara',
    aliases: ['wisdom'],
    category: 'education',
    description: 'Kata mutiara',
    handler: async (ctx) => {
      const quotes = [
        'Pendidikan adalah senjata paling ampuh untuk mengubah dunia. — Nelson Mandela',
        'Orang yang tidak pernah membuat kesalahan adalah orang yang tidak pernah mencoba sesuatu yang baru. — Albert Einstein',
        'Satu-satunya cara untuk melakukan pekerjaan hebat adalah mencintai apa yang kamu kerjakan. — Steve Jobs',
        'Kesuksesan adalah pergi dari kegagalan ke kegagalan tanpa kehilangan semangat. — Winston Churchill',
        'Hidup ini seperti mengendarai sepeda. Untuk menjaga keseimbangan, kamu harus terus bergerak. — Albert Einstein',
        'Masa depan milik mereka yang percaya pada keindahan mimpi-mimpi mereka. — Eleanor Roosevelt',
        'Jangan menunggu. Waktunya tidak akan pernah tepat. — Napoleon Hill',
        'Berani memulai itulah separuh dari keberhasilan. — Pepatah',
      ];
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      await ctx.reply(`💎 *Kata Mutiara*\n\n"${q}"`);
    },
  },
];
