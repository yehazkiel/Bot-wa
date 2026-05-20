const config = require('../config');
const db = require('../lib/database');

function getEconomy(jid) {
  const econ = db.loadDB('economy');
  if (!econ[jid]) {
    econ[jid] = {
      wallet: 0,
      bank: 0,
      lastDaily: 0,
      lastWeekly: 0,
      lastWork: 0,
      lastCrime: 0,
      lastHunt: 0,
      lastFish: 0,
      lastMine: 0,
      lastRob: 0,
      inventory: [],
    };
    db.saveDB('economy', econ);
  }
  return econ[jid];
}

function updateEconomy(jid, data) {
  const econ = db.loadDB('economy');
  econ[jid] = { ...getEconomy(jid), ...data };
  db.saveDB('economy', econ);
}

function formatMoney(n) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

const DAY = 86400000;
const HOUR = 3600000;

const shopItems = [
  { id: 'pickaxe', name: '⛏️ Pickaxe', price: 5000, desc: 'Untuk menambang' },
  { id: 'rod', name: '🎣 Fishing Rod', price: 3000, desc: 'Untuk memancing' },
  { id: 'sword', name: '⚔️ Sword', price: 8000, desc: 'Untuk berburu' },
  { id: 'shield', name: '🛡️ Shield', price: 6000, desc: 'Perlindungan dari perampok' },
  { id: 'potion', name: '🧪 Potion', price: 2000, desc: 'Bonus HP' },
  { id: 'ring', name: '💍 Ring', price: 15000, desc: 'Item langka' },
  { id: 'crown', name: '👑 Crown', price: 50000, desc: 'Item legendaris' },
  { id: 'gem', name: '💎 Gem', price: 25000, desc: 'Permata berharga' },
];

module.exports = [
  {
    name: 'daily',
    aliases: ['harian'],
    category: 'economy',
    description: 'Claim hadiah harian',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      const now = Date.now();
      if (now - econ.lastDaily < DAY) {
        const remaining = DAY - (now - econ.lastDaily);
        const hours = Math.floor(remaining / HOUR);
        const mins = Math.floor((remaining % HOUR) / 60000);
        return ctx.reply(`⏰ Kamu sudah claim daily! Tunggu ${hours}j ${mins}m lagi.`);
      }
      const amount = Math.floor(Math.random() * 5000) + 3000;
      updateEconomy(ctx.sender, { wallet: econ.wallet + amount, lastDaily: now });
      await ctx.reply(`🎁 *Daily Reward*\n\n💰 Kamu mendapat Rp${formatMoney(amount)}!\n💳 Saldo: Rp${formatMoney(econ.wallet + amount)}`);
    },
  },
  {
    name: 'weekly',
    aliases: ['mingguan'],
    category: 'economy',
    description: 'Claim hadiah mingguan',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      const now = Date.now();
      if (now - econ.lastWeekly < DAY * 7) {
        const remaining = DAY * 7 - (now - econ.lastWeekly);
        const days = Math.floor(remaining / DAY);
        const hours = Math.floor((remaining % DAY) / HOUR);
        return ctx.reply(`⏰ Kamu sudah claim weekly! Tunggu ${days}h ${hours}j lagi.`);
      }
      const amount = Math.floor(Math.random() * 20000) + 15000;
      updateEconomy(ctx.sender, { wallet: econ.wallet + amount, lastWeekly: now });
      await ctx.reply(`🎁 *Weekly Reward*\n\n💰 Kamu mendapat Rp${formatMoney(amount)}!\n💳 Saldo: Rp${formatMoney(econ.wallet + amount)}`);
    },
  },
  {
    name: 'balance',
    aliases: ['bal', 'saldo', 'money'],
    category: 'economy',
    description: 'Cek saldo',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      await ctx.reply(`💰 *Saldo Kamu*\n\n💳 Wallet: Rp${formatMoney(econ.wallet)}\n🏦 Bank: Rp${formatMoney(econ.bank)}\n📊 Total: Rp${formatMoney(econ.wallet + econ.bank)}`);
    },
  },
  {
    name: 'transfer',
    aliases: ['tf', 'pay'],
    category: 'economy',
    description: 'Transfer uang ke user lain',
    usage: 'transfer @user <jumlah>',
    handler: async (ctx) => {
      if (!ctx.mentions[0] || !ctx.args[1]) {
        return ctx.reply(`Gunakan: ${config.prefix}transfer @user <jumlah>`);
      }
      const target = ctx.mentions[0];
      const amount = parseInt(ctx.args[1]);
      if (isNaN(amount) || amount < 100) return ctx.reply('❌ Jumlah minimal Rp100!');
      const econ = getEconomy(ctx.sender);
      if (econ.wallet < amount) return ctx.reply('❌ Saldo tidak cukup!');
      const targetEcon = getEconomy(target);
      updateEconomy(ctx.sender, { wallet: econ.wallet - amount });
      updateEconomy(target, { wallet: targetEcon.wallet + amount });
      await ctx.reply(`💸 *Transfer Berhasil*\n\n📤 Rp${formatMoney(amount)} → @${target.split('@')[0]}\n💳 Sisa saldo: Rp${formatMoney(econ.wallet - amount)}`, { mentions: [target] });
    },
  },
  {
    name: 'deposit',
    aliases: ['dep'],
    category: 'economy',
    description: 'Deposit uang ke bank',
    usage: 'deposit <jumlah/all>',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      let amount;
      if (ctx.text === 'all') amount = econ.wallet;
      else amount = parseInt(ctx.text);
      if (!amount || isNaN(amount) || amount < 100) return ctx.reply(`Gunakan: ${config.prefix}deposit <jumlah/all>\nMinimal Rp100`);
      if (econ.wallet < amount) return ctx.reply('❌ Saldo wallet tidak cukup!');
      updateEconomy(ctx.sender, { wallet: econ.wallet - amount, bank: econ.bank + amount });
      await ctx.reply(`🏦 *Deposit Berhasil*\n\n💰 Rp${formatMoney(amount)} → Bank\n💳 Wallet: Rp${formatMoney(econ.wallet - amount)}\n🏦 Bank: Rp${formatMoney(econ.bank + amount)}`);
    },
  },
  {
    name: 'withdraw',
    aliases: ['wd', 'tarik'],
    category: 'economy',
    description: 'Tarik uang dari bank',
    usage: 'withdraw <jumlah/all>',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      let amount;
      if (ctx.text === 'all') amount = econ.bank;
      else amount = parseInt(ctx.text);
      if (!amount || isNaN(amount) || amount < 100) return ctx.reply(`Gunakan: ${config.prefix}withdraw <jumlah/all>\nMinimal Rp100`);
      if (econ.bank < amount) return ctx.reply('❌ Saldo bank tidak cukup!');
      updateEconomy(ctx.sender, { wallet: econ.wallet + amount, bank: econ.bank - amount });
      await ctx.reply(`🏦 *Withdraw Berhasil*\n\n💰 Rp${formatMoney(amount)} → Wallet\n💳 Wallet: Rp${formatMoney(econ.wallet + amount)}\n🏦 Bank: Rp${formatMoney(econ.bank - amount)}`);
    },
  },
  {
    name: 'work',
    aliases: ['kerja'],
    category: 'economy',
    description: 'Bekerja untuk mendapatkan uang',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      const now = Date.now();
      if (now - econ.lastWork < HOUR) {
        const remaining = HOUR - (now - econ.lastWork);
        const mins = Math.floor(remaining / 60000);
        return ctx.reply(`⏰ Kamu sudah bekerja! Tunggu ${mins} menit lagi.`);
      }
      const jobs = ['Programmer', 'Designer', 'Guru', 'Dokter', 'Pilot', 'Chef', 'Petani', 'Nelayan', 'Tukang Las', 'Ojol'];
      const job = jobs[Math.floor(Math.random() * jobs.length)];
      const amount = Math.floor(Math.random() * 3000) + 1000;
      updateEconomy(ctx.sender, { wallet: econ.wallet + amount, lastWork: now });
      await ctx.reply(`💼 *Bekerja*\n\n👷 Kamu bekerja sebagai ${job}\n💰 Pendapatan: Rp${formatMoney(amount)}\n💳 Saldo: Rp${formatMoney(econ.wallet + amount)}`);
    },
  },
  {
    name: 'hunt',
    aliases: ['berburu'],
    category: 'economy',
    description: 'Berburu hewan untuk uang',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      const now = Date.now();
      if (now - econ.lastHunt < HOUR) {
        const remaining = HOUR - (now - econ.lastHunt);
        return ctx.reply(`⏰ Tunggu ${Math.floor(remaining / 60000)} menit lagi.`);
      }
      const animals = [
        { name: '🐰 Kelinci', price: 500 }, { name: '🦌 Rusa', price: 2000 },
        { name: '🐗 Babi Hutan', price: 1500 }, { name: '🦅 Elang', price: 3000 },
        { name: '🐻 Beruang', price: 5000 }, { name: '🦁 Singa', price: 8000 },
      ];
      const caught = animals[Math.floor(Math.random() * animals.length)];
      updateEconomy(ctx.sender, { wallet: econ.wallet + caught.price, lastHunt: now });
      await ctx.reply(`🏹 *Berburu*\n\nKamu menangkap ${caught.name}!\n💰 Dijual: Rp${formatMoney(caught.price)}\n💳 Saldo: Rp${formatMoney(econ.wallet + caught.price)}`);
    },
  },
  {
    name: 'fish',
    aliases: ['mancing', 'fishing'],
    category: 'economy',
    description: 'Memancing ikan',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      const now = Date.now();
      if (now - econ.lastFish < HOUR) {
        const remaining = HOUR - (now - econ.lastFish);
        return ctx.reply(`⏰ Tunggu ${Math.floor(remaining / 60000)} menit lagi.`);
      }
      const fishes = [
        { name: '🐟 Ikan Kecil', price: 300 }, { name: '🐠 Ikan Nemo', price: 800 },
        { name: '🐡 Ikan Buntal', price: 1200 }, { name: '🦈 Hiu', price: 5000 },
        { name: '🐋 Paus', price: 8000 }, { name: '🦑 Cumi', price: 2000 },
        { name: '🦐 Udang', price: 1500 }, { name: '🦞 Lobster', price: 4000 },
      ];
      const caught = fishes[Math.floor(Math.random() * fishes.length)];
      updateEconomy(ctx.sender, { wallet: econ.wallet + caught.price, lastFish: now });
      await ctx.reply(`🎣 *Memancing*\n\nKamu mendapat ${caught.name}!\n💰 Dijual: Rp${formatMoney(caught.price)}\n💳 Saldo: Rp${formatMoney(econ.wallet + caught.price)}`);
    },
  },
  {
    name: 'mine',
    aliases: ['tambang', 'mining'],
    category: 'economy',
    description: 'Menambang mineral',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      const now = Date.now();
      if (now - econ.lastMine < HOUR) {
        const remaining = HOUR - (now - econ.lastMine);
        return ctx.reply(`⏰ Tunggu ${Math.floor(remaining / 60000)} menit lagi.`);
      }
      const minerals = [
        { name: '🪨 Batu', price: 200 }, { name: '�ite Besi', price: 1000 },
        { name: '🥈 Perak', price: 2500 }, { name: '🥇 Emas', price: 5000 },
        { name: '💎 Berlian', price: 10000 }, { name: '🟣 Amethyst', price: 3500 },
      ];
      const found = minerals[Math.floor(Math.random() * minerals.length)];
      updateEconomy(ctx.sender, { wallet: econ.wallet + found.price, lastMine: now });
      await ctx.reply(`⛏️ *Menambang*\n\nKamu menemukan ${found.name}!\n💰 Dijual: Rp${formatMoney(found.price)}\n💳 Saldo: Rp${formatMoney(econ.wallet + found.price)}`);
    },
  },
  {
    name: 'rob',
    aliases: ['rampok'],
    category: 'economy',
    description: 'Merampok user lain',
    usage: 'rob @user',
    handler: async (ctx) => {
      if (!ctx.mentions[0]) return ctx.reply(`Gunakan: ${config.prefix}rob @user`);
      const econ = getEconomy(ctx.sender);
      const now = Date.now();
      if (now - econ.lastRob < HOUR * 2) {
        const remaining = HOUR * 2 - (now - econ.lastRob);
        return ctx.reply(`⏰ Tunggu ${Math.floor(remaining / 60000)} menit lagi.`);
      }
      const target = ctx.mentions[0];
      if (target === ctx.sender) return ctx.reply('❌ Tidak bisa merampok diri sendiri!');
      const targetEcon = getEconomy(target);
      const success = Math.random() > 0.5;
      if (success && targetEcon.wallet > 0) {
        const amount = Math.floor(Math.random() * Math.min(targetEcon.wallet, 3000)) + 500;
        updateEconomy(ctx.sender, { wallet: econ.wallet + amount, lastRob: now });
        updateEconomy(target, { wallet: targetEcon.wallet - amount });
        await ctx.reply(`🦹 *Berhasil Merampok!*\n\n💰 Kamu mencuri Rp${formatMoney(amount)} dari @${target.split('@')[0]}`, { mentions: [target] });
      } else {
        const fine = Math.floor(Math.random() * 2000) + 500;
        const newWallet = Math.max(0, econ.wallet - fine);
        updateEconomy(ctx.sender, { wallet: newWallet, lastRob: now });
        await ctx.reply(`🚔 *Gagal Merampok!*\n\nKamu tertangkap! Denda: Rp${formatMoney(fine)}\n💳 Saldo: Rp${formatMoney(newWallet)}`);
      }
    },
  },
  {
    name: 'crime',
    aliases: ['kejahatan'],
    category: 'economy',
    description: 'Lakukan kejahatan untuk uang',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      const now = Date.now();
      if (now - econ.lastCrime < HOUR * 3) {
        const remaining = HOUR * 3 - (now - econ.lastCrime);
        return ctx.reply(`⏰ Tunggu ${Math.floor(remaining / 60000)} menit lagi.`);
      }
      const crimes = ['merampok bank', 'mencuri berlian', 'mencopet dompet', 'hacking ATM', 'menjual barang curian'];
      const crime = crimes[Math.floor(Math.random() * crimes.length)];
      const success = Math.random() > 0.4;
      if (success) {
        const amount = Math.floor(Math.random() * 8000) + 3000;
        updateEconomy(ctx.sender, { wallet: econ.wallet + amount, lastCrime: now });
        await ctx.reply(`🦹 *Crime Berhasil!*\n\n🔫 Aksi: ${crime}\n💰 Hasil: Rp${formatMoney(amount)}\n💳 Saldo: Rp${formatMoney(econ.wallet + amount)}`);
      } else {
        const fine = Math.floor(Math.random() * 5000) + 2000;
        const newWallet = Math.max(0, econ.wallet - fine);
        updateEconomy(ctx.sender, { wallet: newWallet, lastCrime: now });
        await ctx.reply(`🚔 *Tertangkap!*\n\n🔫 Aksi: ${crime}\n💸 Denda: Rp${formatMoney(fine)}\n💳 Saldo: Rp${formatMoney(newWallet)}`);
      }
    },
  },
  {
    name: 'shop',
    aliases: ['toko'],
    category: 'economy',
    description: 'Lihat toko item',
    handler: async (ctx) => {
      let text = '🛒 *TOKO*\n\n';
      shopItems.forEach((item, i) => {
        text += `${i + 1}. ${item.name}\n   💰 Rp${formatMoney(item.price)} - ${item.desc}\n\n`;
      });
      text += `Beli: ${config.prefix}buy <nama_item>`;
      await ctx.reply(text);
    },
  },
  {
    name: 'buy',
    aliases: ['beli'],
    category: 'economy',
    description: 'Beli item dari toko',
    usage: 'buy <nama_item>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}buy <nama_item>\nLihat toko: ${config.prefix}shop`);
      const item = shopItems.find((i) => i.id === ctx.text.toLowerCase());
      if (!item) return ctx.reply('❌ Item tidak ditemukan! Cek !shop');
      const econ = getEconomy(ctx.sender);
      if (econ.wallet < item.price) return ctx.reply('❌ Saldo tidak cukup!');
      const inv = econ.inventory || [];
      inv.push(item.id);
      updateEconomy(ctx.sender, { wallet: econ.wallet - item.price, inventory: inv });
      await ctx.reply(`✅ *Berhasil membeli ${item.name}!*\n💰 -Rp${formatMoney(item.price)}\n💳 Saldo: Rp${formatMoney(econ.wallet - item.price)}`);
    },
  },
  {
    name: 'sell',
    aliases: ['jual'],
    category: 'economy',
    description: 'Jual item',
    usage: 'sell <nama_item>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}sell <nama_item>`);
      const econ = getEconomy(ctx.sender);
      const inv = econ.inventory || [];
      const idx = inv.indexOf(ctx.text.toLowerCase());
      if (idx === -1) return ctx.reply('❌ Item tidak ada di inventory!');
      const item = shopItems.find((i) => i.id === ctx.text.toLowerCase());
      const sellPrice = Math.floor((item ? item.price : 500) * 0.7);
      inv.splice(idx, 1);
      updateEconomy(ctx.sender, { wallet: econ.wallet + sellPrice, inventory: inv });
      await ctx.reply(`✅ *Berhasil menjual ${ctx.text}!*\n💰 +Rp${formatMoney(sellPrice)}\n💳 Saldo: Rp${formatMoney(econ.wallet + sellPrice)}`);
    },
  },
  {
    name: 'inventory',
    aliases: ['inv', 'tas'],
    category: 'economy',
    description: 'Lihat inventory',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      const inv = econ.inventory || [];
      if (inv.length === 0) return ctx.reply('🎒 Inventory kosong!');
      const counted = {};
      inv.forEach((id) => { counted[id] = (counted[id] || 0) + 1; });
      let text = '🎒 *Inventory*\n\n';
      Object.entries(counted).forEach(([id, count]) => {
        const item = shopItems.find((i) => i.id === id);
        text += `${item ? item.name : id} x${count}\n`;
      });
      await ctx.reply(text);
    },
  },
  {
    name: 'richest',
    aliases: ['terkaya', 'toprich'],
    category: 'economy',
    description: 'Daftar orang terkaya',
    handler: async (ctx) => {
      const econ = db.loadDB('economy');
      const sorted = Object.entries(econ)
        .map(([jid, data]) => ({ jid, total: (data.wallet || 0) + (data.bank || 0) }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 10);
      if (sorted.length === 0) return ctx.reply('📊 Belum ada data!');
      let text = '💰 *Top 10 Terkaya*\n\n';
      sorted.forEach((user, i) => {
        const medals = ['🥇', '🥈', '🥉'];
        const medal = medals[i] || `${i + 1}.`;
        text += `${medal} @${user.jid.split('@')[0]} - Rp${formatMoney(user.total)}\n`;
      });
      await ctx.reply(text, { mentions: sorted.map((u) => u.jid) });
    },
  },
  {
    name: 'bet',
    aliases: ['taruhan', 'gamble'],
    category: 'economy',
    description: 'Taruhan coin flip',
    usage: 'bet <jumlah>',
    handler: async (ctx) => {
      const amount = parseInt(ctx.text);
      if (!amount || isNaN(amount) || amount < 100) return ctx.reply(`Gunakan: ${config.prefix}bet <jumlah>\nMinimal Rp100`);
      const econ = getEconomy(ctx.sender);
      if (econ.wallet < amount) return ctx.reply('❌ Saldo tidak cukup!');
      const win = Math.random() > 0.5;
      if (win) {
        updateEconomy(ctx.sender, { wallet: econ.wallet + amount });
        await ctx.reply(`🎰 *Menang!*\n\n💰 +Rp${formatMoney(amount)}\n💳 Saldo: Rp${formatMoney(econ.wallet + amount)}`);
      } else {
        updateEconomy(ctx.sender, { wallet: econ.wallet - amount });
        await ctx.reply(`🎰 *Kalah!*\n\n💸 -Rp${formatMoney(amount)}\n💳 Saldo: Rp${formatMoney(econ.wallet - amount)}`);
      }
    },
  },
  {
    name: 'lottery',
    aliases: ['lotere'],
    category: 'economy',
    description: 'Main lotere',
    handler: async (ctx) => {
      const econ = getEconomy(ctx.sender);
      const cost = 1000;
      if (econ.wallet < cost) return ctx.reply(`❌ Saldo tidak cukup! Butuh Rp${formatMoney(cost)}`);
      const numbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
      const userNums = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10));
      const matches = numbers.filter((n, i) => n === userNums[i]).length;
      let prize = 0;
      if (matches === 4) prize = 100000;
      else if (matches === 3) prize = 20000;
      else if (matches === 2) prize = 5000;
      updateEconomy(ctx.sender, { wallet: econ.wallet - cost + prize });
      await ctx.reply(`🎲 *Lottery*\n\n🎯 Nomor: [${numbers.join(', ')}]\n🎫 Kamu: [${userNums.join(', ')}]\n🎯 Cocok: ${matches}/4\n\n${prize > 0 ? `🎉 Menang Rp${formatMoney(prize)}!` : '😢 Tidak beruntung!'}\n💳 Saldo: Rp${formatMoney(econ.wallet - cost + prize)}`);
    },
  },
  {
    name: 'gift',
    aliases: ['kasih'],
    category: 'economy',
    description: 'Kasih item ke user lain',
    usage: 'gift @user <nama_item>',
    handler: async (ctx) => {
      if (!ctx.mentions[0] || !ctx.args[1]) {
        return ctx.reply(`Gunakan: ${config.prefix}gift @user <nama_item>`);
      }
      const target = ctx.mentions[0];
      const itemName = ctx.args[1].toLowerCase();
      const econ = getEconomy(ctx.sender);
      const inv = econ.inventory || [];
      const idx = inv.indexOf(itemName);
      if (idx === -1) return ctx.reply('❌ Item tidak ada di inventory!');
      inv.splice(idx, 1);
      const targetEcon = getEconomy(target);
      const targetInv = targetEcon.inventory || [];
      targetInv.push(itemName);
      updateEconomy(ctx.sender, { inventory: inv });
      updateEconomy(target, { inventory: targetInv });
      await ctx.reply(`🎁 *Gift Berhasil*\n\n${itemName} → @${target.split('@')[0]}`, { mentions: [target] });
    },
  },
];
