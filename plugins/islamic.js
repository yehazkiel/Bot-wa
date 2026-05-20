const config = require('../config');
const { fetchJson } = require('../lib/utils');

const doaHarian = [
  { nama: 'Doa Sebelum Makan', arab: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ', latin: 'Allahumma baarik lanaa fiimaa razaqtanaa wa qinaa \'adzaa ban naar', arti: 'Ya Allah, berkahilah kami dalam rezeki yang telah Engkau berikan kepada kami dan peliharalah kami dari siksa api neraka.' },
  { nama: 'Doa Sesudah Makan', arab: 'اَلْحَمْدُ لِلَّهِ الَّذِيْ أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِيْنَ', latin: 'Alhamdulillaahil ladzii ath\'amanaa wa saqoonaa wa ja\'alanaa muslimiin', arti: 'Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami termasuk orang-orang Islam.' },
  { nama: 'Doa Sebelum Tidur', arab: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوْتُ', latin: 'Bismikallaahumma ahyaa wa amuut', arti: 'Dengan menyebut nama-Mu ya Allah, aku hidup dan aku mati.' },
  { nama: 'Doa Bangun Tidur', arab: 'اَلْحَمْدُ لِلَّهِ الَّذِيْ أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُوْرُ', latin: 'Alhamdulillaahil ladzii ahyaanaa ba\'da maa amaatanaa wa ilaihin nusyuur', arti: 'Segala puji bagi Allah yang telah menghidupkan kami setelah mematikan kami dan kepada-Nya lah kami akan kembali.' },
  { nama: 'Doa Masuk Rumah', arab: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ الْمَوْلَجِ وَخَيْرَ الْمَخْرَجِ', latin: 'Allaahumma innii as-aluka khairal mauliji wa khairal makhraji', arti: 'Ya Allah, sesungguhnya aku memohon kepada-Mu kebaikan tempat masuk dan kebaikan tempat keluar.' },
  { nama: 'Doa Keluar Rumah', arab: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', latin: 'Bismillaahi tawakkaltu \'alallaahi laa haula wa laa quwwata illaa billaah', arti: 'Dengan menyebut nama Allah, aku bertawakal kepada Allah, tiada daya dan upaya melainkan dengan pertolongan Allah.' },
  { nama: 'Doa Masuk Masjid', arab: 'اللَّهُمَّ افْتَحْ لِيْ أَبْوَابَ رَحْمَتِكَ', latin: 'Allaahummaf tahlii abwaaba rahmatik', arti: 'Ya Allah, bukakanlah untukku pintu-pintu rahmat-Mu.' },
  { nama: 'Doa Masuk WC', arab: 'اللَّهُمَّ إِنِّي أَعُوْذُبِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ', latin: 'Allaahumma innii a\'uudzubika minal khubutsi wal khabaa-its', arti: 'Ya Allah, aku berlindung kepada-Mu dari godaan setan laki-laki dan setan perempuan.' },
  { nama: 'Doa Bepergian', arab: 'سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُوْنَ', latin: 'Subhaanal ladzii sakhkhara lanaa haadzaa wa maa kunnaa lahuu muqriniin wa innaa ilaa rabbinaa lamunqalibuun', arti: 'Maha Suci Tuhan yang telah menundukkan semua ini bagi kami padahal kami sebelumnya tidak mampu menguasainya dan sesungguhnya kami akan kembali kepada Tuhan kami.' },
  { nama: 'Doa Naik Kendaraan', arab: 'بِسْمِ اللَّهِ وَالْحَمْدُ لِلَّهِ سُبْحَانَ الَّذِيْ سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِيْنَ', latin: 'Bismillaahi walhamdulillaah subhaanal ladzii sakhkhara lanaa haadzaa wa maa kunnaa lahuu muqriniin', arti: 'Dengan menyebut nama Allah dan segala puji bagi Allah. Maha Suci Tuhan yang telah menundukkan semua ini bagi kami.' },
];

const asmaulHusna = [
  'Ar-Rahman (Yang Maha Pengasih)', 'Ar-Rahim (Yang Maha Penyayang)', 'Al-Malik (Yang Maha Merajai)',
  'Al-Quddus (Yang Maha Suci)', 'As-Salam (Yang Maha Memberi Keselamatan)', 'Al-Mu\'min (Yang Maha Pemberi Keamanan)',
  'Al-Muhaimin (Yang Maha Pemelihara)', 'Al-Aziz (Yang Maha Perkasa)', 'Al-Jabbar (Yang Maha Memaksa)',
  'Al-Mutakabbir (Yang Maha Megah)', 'Al-Khaliq (Yang Maha Pencipta)', 'Al-Bari\' (Yang Maha Melepaskan)',
  'Al-Mushawwir (Yang Maha Membentuk Rupa)', 'Al-Ghaffar (Yang Maha Pengampun)', 'Al-Qahhar (Yang Maha Memaksa)',
  'Al-Wahhab (Yang Maha Pemberi Karunia)', 'Ar-Razzaq (Yang Maha Pemberi Rezeki)', 'Al-Fattah (Yang Maha Pembuka)',
  'Al-\'Alim (Yang Maha Mengetahui)', 'Al-Qabidh (Yang Maha Menyempitkan)', 'Al-Basith (Yang Maha Melapangkan)',
];

const kisahNabi = [
  { nama: 'Nabi Adam AS', kisah: 'Nabi Adam AS adalah manusia dan nabi pertama yang diciptakan Allah dari tanah. Beliau ditempatkan di surga bersama Hawa, namun karena godaan iblis mereka memakan buah terlarang dan diturunkan ke bumi.' },
  { nama: 'Nabi Nuh AS', kisah: 'Nabi Nuh AS berdakwah selama 950 tahun. Ketika kaumnya tetap ingkar, Allah memerintahkan beliau membangun bahtera. Banjir besar datang menenggelamkan orang-orang kafir.' },
  { nama: 'Nabi Ibrahim AS', kisah: 'Nabi Ibrahim AS dikenal sebagai Khalilullah (Kekasih Allah). Beliau menghancurkan berhala-berhala kaumnya dan dilempar ke api oleh Raja Namrud, namun Allah menyelamatkannya.' },
  { nama: 'Nabi Musa AS', kisah: 'Nabi Musa AS diutus kepada Firaun. Allah memberikan mukjizat berupa tongkat yang bisa berubah menjadi ular dan membelah Laut Merah untuk menyelamatkan Bani Israel.' },
  { nama: 'Nabi Muhammad SAW', kisah: 'Nabi Muhammad SAW adalah nabi dan rasul terakhir. Beliau lahir di Mekah tahun 570 M. Beliau menerima wahyu pertama di Gua Hira dan menyebarkan Islam ke seluruh dunia.' },
  { nama: 'Nabi Yusuf AS', kisah: 'Nabi Yusuf AS dikenal sebagai nabi yang sangat tampan. Beliau dibuang ke sumur oleh saudara-saudaranya karena iri, namun akhirnya menjadi bendahara Mesir.' },
  { nama: 'Nabi Sulaiman AS', kisah: 'Nabi Sulaiman AS diberi kemampuan berbicara dengan hewan dan jin. Beliau memiliki kerajaan yang sangat besar dan megah.' },
  { nama: 'Nabi Isa AS', kisah: 'Nabi Isa AS lahir tanpa ayah dari Maryam. Beliau diberi mukjizat menyembuhkan orang buta, orang sakit kusta, dan menghidupkan orang mati dengan izin Allah.' },
];

const islamicQuotes = [
  'Sesungguhnya sesudah kesulitan itu ada kemudahan. (QS. Al-Insyirah: 6)',
  'Dan mohonlah pertolongan dengan sabar dan sholat. (QS. Al-Baqarah: 45)',
  'Barangsiapa bertakwa kepada Allah, niscaya Dia akan membukakan jalan keluar baginya. (QS. At-Talaq: 2)',
  'Cukuplah Allah sebagai Penolong kami dan Dia sebaik-baik Pelindung. (QS. Ali Imran: 173)',
  'Maka ingatlah kepada-Ku, niscaya Aku akan mengingat kamu. (QS. Al-Baqarah: 152)',
  'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya. (HR. Ahmad)',
  'Kebersihan adalah sebagian dari iman. (HR. Muslim)',
  'Tidak beriman salah seorang di antara kamu sehingga ia mencintai saudaranya sebagaimana ia mencintai dirinya sendiri. (HR. Bukhari)',
  'Senyummu di hadapan saudaramu adalah sedekah. (HR. Tirmidzi)',
  'Ridha Allah terletak pada ridha kedua orang tua. (HR. Tirmidzi)',
];

module.exports = [
  {
    name: 'alquran',
    aliases: ['quran', 'ayat'],
    category: 'islamic',
    description: 'Baca ayat Al-Quran',
    usage: 'alquran <surah>:<ayat>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}alquran <surah>:<ayat>\n\nContoh: ${config.prefix}alquran 1:1`);
      }
      const parts = ctx.text.split(':');
      const surah = parts[0];
      const ayat = parts[1] || '1';
      try {
        const data = await fetchJson(`https://api.alquran.cloud/v1/ayah/${surah}:${ayat}/editions/quran-uthmani,id.indonesian`);
        if (data.code === 200) {
          const arab = data.data[0];
          const indo = data.data[1];
          await ctx.reply(
            `📖 *Al-Quran*\n\n📌 Surah ${arab.surah.englishName} (${arab.surah.name}) Ayat ${arab.numberInSurah}\n\n${arab.text}\n\n📝 Terjemahan:\n${indo.text}`
          );
        } else {
          await ctx.reply('❌ Ayat tidak ditemukan!');
        }
      } catch {
        await ctx.reply('❌ Gagal mengambil ayat!');
      }
    },
  },
  {
    name: 'tafsir',
    category: 'islamic',
    description: 'Tafsir ayat Al-Quran',
    usage: 'tafsir <surah>:<ayat>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}tafsir <surah>:<ayat>\n\nContoh: ${config.prefix}tafsir 1:1`);
      }
      const parts = ctx.text.split(':');
      const surah = parts[0];
      const ayat = parts[1] || '1';
      try {
        const data = await fetchJson(`https://api.alquran.cloud/v1/ayah/${surah}:${ayat}/editions/quran-uthmani,id.indonesian`);
        if (data.code === 200) {
          const arab = data.data[0];
          const indo = data.data[1];
          await ctx.reply(`📖 *Tafsir*\n\n📌 ${arab.surah.englishName} Ayat ${arab.numberInSurah}\n\n${arab.text}\n\n📝 Arti:\n${indo.text}`);
        } else {
          await ctx.reply('❌ Ayat tidak ditemukan!');
        }
      } catch {
        await ctx.reply('❌ Gagal mengambil tafsir!');
      }
    },
  },
  {
    name: 'quransurah',
    aliases: ['surah', 'infosurah'],
    category: 'islamic',
    description: 'Info surah Al-Quran',
    usage: 'quransurah <nomor>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}quransurah <nomor>\n\nContoh: ${config.prefix}quransurah 1`);
      }
      try {
        const data = await fetchJson(`https://api.alquran.cloud/v1/surah/${ctx.text}`);
        if (data.code === 200) {
          const s = data.data;
          await ctx.reply(`📖 *Info Surah*\n\n📌 Nama: ${s.englishName} (${s.name})\n📝 Arti: ${s.englishNameTranslation}\n📊 Jumlah Ayat: ${s.numberOfAyahs}\n📍 Turun di: ${s.revelationType === 'Meccan' ? 'Mekah' : 'Madinah'}`);
        } else {
          await ctx.reply('❌ Surah tidak ditemukan!');
        }
      } catch {
        await ctx.reply('❌ Gagal mengambil info surah!');
      }
    },
  },
  {
    name: 'jadwalsholat',
    aliases: ['sholat', 'prayer'],
    category: 'islamic',
    description: 'Jadwal sholat',
    usage: 'jadwalsholat <kota>',
    handler: async (ctx) => {
      if (!ctx.text) {
        return ctx.reply(`Gunakan: ${config.prefix}jadwalsholat <kota>\n\nContoh: ${config.prefix}jadwalsholat Jakarta`);
      }
      try {
        const today = new Date();
        const dateStr = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
        const data = await fetchJson(`https://api.aladhan.com/v1/timingsByCity/${dateStr}?city=${encodeURIComponent(ctx.text)}&country=Indonesia&method=20`);
        if (data.code === 200) {
          const t = data.data.timings;
          await ctx.reply(`🕌 *Jadwal Sholat - ${ctx.text}*\n📅 ${data.data.date.readable}\n\n🌅 Imsak: ${t.Imsak}\n🌅 Subuh: ${t.Fajr}\n☀️ Terbit: ${t.Sunrise}\n🌞 Dzuhur: ${t.Dhuhr}\n🌤️ Ashar: ${t.Asr}\n🌅 Maghrib: ${t.Maghrib}\n🌙 Isya: ${t.Isha}`);
        } else {
          await ctx.reply('❌ Kota tidak ditemukan!');
        }
      } catch {
        await ctx.reply('❌ Gagal mengambil jadwal sholat!');
      }
    },
  },
  {
    name: 'asmaulhusna',
    aliases: ['99nama', 'asmaul'],
    category: 'islamic',
    description: '99 Asmaul Husna',
    handler: async (ctx) => {
      let text = '📿 *Asmaul Husna (99 Nama Allah)*\n\n';
      asmaulHusna.forEach((name, i) => {
        text += `${i + 1}. ${name}\n`;
      });
      text += '\n... dan masih banyak lagi (21 dari 99 ditampilkan)';
      await ctx.reply(text);
    },
  },
  {
    name: 'doaharian',
    aliases: ['doa'],
    category: 'islamic',
    description: 'Doa harian random',
    handler: async (ctx) => {
      const doa = doaHarian[Math.floor(Math.random() * doaHarian.length)];
      await ctx.reply(`🤲 *${doa.nama}*\n\n${doa.arab}\n\n📖 Latin: ${doa.latin}\n\n📝 Artinya: ${doa.arti}`);
    },
  },
  {
    name: 'kisahnabi',
    aliases: ['nabi'],
    category: 'islamic',
    description: 'Kisah nabi random',
    handler: async (ctx) => {
      const kisah = kisahNabi[Math.floor(Math.random() * kisahNabi.length)];
      await ctx.reply(`📖 *${kisah.nama}*\n\n${kisah.kisah}`);
    },
  },
  {
    name: 'ayatkursi',
    category: 'islamic',
    description: 'Ayat Kursi (Al-Baqarah:255)',
    handler: async (ctx) => {
      await ctx.reply('📖 *Ayat Kursi (Al-Baqarah: 255)*\n\nاللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ\n\n📝 Artinya: Allah, tidak ada tuhan selain Dia, Yang Maha Hidup, Yang terus menerus mengurus (makhluk-Nya)...');
    },
  },
  {
    name: 'islamicquote',
    aliases: ['quoteislam', 'quoteislami'],
    category: 'islamic',
    description: 'Quote islami',
    handler: async (ctx) => {
      const q = islamicQuotes[Math.floor(Math.random() * islamicQuotes.length)];
      await ctx.reply(`🕌 *Quote Islami*\n\n"${q}"`);
    },
  },
  {
    name: 'istighfar',
    category: 'islamic',
    description: 'Bacaan istighfar',
    handler: async (ctx) => {
      await ctx.reply('🤲 *Istighfar*\n\nأَسْتَغْفِرُ اللَّهَ الْعَظِيمَ\n\n📖 Latin: Astaghfirullahal \'adziim\n\n📝 Artinya: Aku memohon ampun kepada Allah Yang Maha Agung.');
    },
  },
  {
    name: 'dzikir',
    aliases: ['zikir'],
    category: 'islamic',
    description: 'Dzikir harian',
    handler: async (ctx) => {
      await ctx.reply('📿 *Dzikir Harian*\n\n1. سُبْحَانَ اللَّهِ (Subhanallah) - 33x\n   Maha Suci Allah\n\n2. اَلْحَمْدُ لِلَّهِ (Alhamdulillah) - 33x\n   Segala puji bagi Allah\n\n3. اللَّهُ أَكْبَرُ (Allahu Akbar) - 33x\n   Allah Maha Besar\n\n4. لَا إِلَهَ إِلَّا اللَّهُ (Laa ilaaha illallah) - 1x\n   Tiada tuhan selain Allah');
    },
  },
  {
    name: 'niatsolat',
    aliases: ['niatsholat'],
    category: 'islamic',
    description: 'Niat sholat 5 waktu',
    usage: 'niatsolat <subuh/dzuhur/ashar/maghrib/isya>',
    handler: async (ctx) => {
      const niat = {
        subuh: { waktu: 'Subuh', rakaat: '2', arab: 'أُصَلِّيْ فَرْضَ الصُّبْحِ رَكْعَتَيْنِ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى' },
        dzuhur: { waktu: 'Dzuhur', rakaat: '4', arab: 'أُصَلِّيْ فَرْضَ الظُّهْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى' },
        ashar: { waktu: 'Ashar', rakaat: '4', arab: 'أُصَلِّيْ فَرْضَ الْعَصْرِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى' },
        maghrib: { waktu: 'Maghrib', rakaat: '3', arab: 'أُصَلِّيْ فَرْضَ الْمَغْرِبِ ثَلاَثَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى' },
        isya: { waktu: 'Isya', rakaat: '4', arab: 'أُصَلِّيْ فَرْضَ الْعِشَاءِ أَرْبَعَ رَكَعَاتٍ مُسْتَقْبِلَ الْقِبْلَةِ أَدَاءً لِلَّهِ تَعَالَى' },
      };
      const key = ctx.text ? ctx.text.toLowerCase() : '';
      if (!niat[key]) {
        return ctx.reply(`Gunakan: ${config.prefix}niatsolat <subuh/dzuhur/ashar/maghrib/isya>`);
      }
      const n = niat[key];
      await ctx.reply(`🕌 *Niat Sholat ${n.waktu} (${n.rakaat} rakaat)*\n\n${n.arab}\n\n📝 Artinya: Aku berniat sholat fardhu ${n.waktu} ${n.rakaat} rakaat menghadap kiblat karena Allah Ta'ala.`);
    },
  },
  {
    name: 'hijriah',
    aliases: ['hijri', 'kalenderhijriah'],
    category: 'islamic',
    description: 'Tanggal hijriah hari ini',
    handler: async (ctx) => {
      try {
        const today = new Date();
        const dateStr = `${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`;
        const data = await fetchJson(`https://api.aladhan.com/v1/gpiToH/${dateStr}`);
        if (data.code === 200) {
          const h = data.data.hijri;
          const g = data.data.gregorian;
          await ctx.reply(`📅 *Kalender Hijriah*\n\n🌙 Hijriah: ${h.day} ${h.month.en} ${h.year} H\n📅 Masehi: ${g.day} ${g.month.en} ${g.year}\n📌 Hari: ${h.weekday.en}`);
        } else {
          await ctx.reply('❌ Gagal mengambil tanggal hijriah!');
        }
      } catch {
        await ctx.reply('❌ Gagal mengambil tanggal hijriah!');
      }
    },
  },
  {
    name: 'hadist',
    aliases: ['hadits'],
    category: 'islamic',
    description: 'Hadist random',
    handler: async (ctx) => {
      const hadistList = [
        { perawi: 'HR. Bukhari', text: 'Sebaik-baik kamu adalah yang mempelajari Al-Quran dan mengajarkannya.' },
        { perawi: 'HR. Muslim', text: 'Kebersihan adalah sebagian dari iman.' },
        { perawi: 'HR. Bukhari', text: 'Tidak beriman salah seorang di antara kamu sehingga ia mencintai saudaranya sebagaimana ia mencintai dirinya sendiri.' },
        { perawi: 'HR. Ahmad', text: 'Sebaik-baik manusia adalah yang paling bermanfaat bagi manusia lainnya.' },
        { perawi: 'HR. Tirmidzi', text: 'Senyummu di hadapan saudaramu adalah sedekah.' },
        { perawi: 'HR. Bukhari Muslim', text: 'Barangsiapa beriman kepada Allah dan hari akhir, hendaklah ia berkata baik atau diam.' },
        { perawi: 'HR. Muslim', text: 'Malu itu adalah sebagian dari iman.' },
        { perawi: 'HR. Bukhari', text: 'Orang yang paling dicintai Allah adalah yang paling bermanfaat bagi orang lain.' },
      ];
      const h = hadistList[Math.floor(Math.random() * hadistList.length)];
      await ctx.reply(`📖 *Hadist*\n\n"${h.text}"\n\n— ${h.perawi}`);
    },
  },
];
