const config = require('../config');
const crypto = require('crypto');

module.exports = [
  {
    name: 'uuid',
    aliases: ['genuuid'],
    category: 'tools',
    description: 'Generate UUID',
    handler: async (ctx) => {
      const uuid = crypto.randomUUID();
      await ctx.reply(`🔑 *UUID*\n\n${uuid}`);
    },
  },
  {
    name: 'timestamp',
    aliases: ['unixtime', 'epoch'],
    category: 'tools',
    description: 'Unix timestamp sekarang',
    handler: async (ctx) => {
      const ts = Math.floor(Date.now() / 1000);
      const date = new Date();
      await ctx.reply(`⏰ *Timestamp*\n\n🔢 Unix: ${ts}\n📅 ISO: ${date.toISOString()}\n🕐 UTC: ${date.toUTCString()}`);
    },
  },
  {
    name: 'epochconvert',
    aliases: ['fromepoch', 'fromtimestamp'],
    category: 'tools',
    description: 'Konversi epoch ke tanggal',
    usage: 'epochconvert <epoch>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}epochconvert <epoch>`);
      const ts = parseInt(ctx.text);
      if (isNaN(ts)) return ctx.reply('❌ Epoch tidak valid!');
      const date = new Date(ts * (ts.toString().length <= 10 ? 1000 : 1));
      await ctx.reply(`📅 *Epoch to Date*\n\n🔢 Epoch: ${ts}\n📅 Tanggal: ${date.toISOString()}\n🕐 UTC: ${date.toUTCString()}`);
    },
  },
  {
    name: 'jsonformat',
    aliases: ['prettyjson', 'formatjson'],
    category: 'tools',
    description: 'Format/beautify JSON',
    usage: 'jsonformat <json>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}jsonformat <json>`);
      try {
        const parsed = JSON.parse(ctx.text);
        await ctx.reply(`📋 *JSON Formatted*\n\n\`\`\`\n${JSON.stringify(parsed, null, 2)}\n\`\`\``);
      } catch {
        await ctx.reply('❌ JSON tidak valid!');
      }
    },
  },
  {
    name: 'urlencode',
    aliases: ['encodeurl'],
    category: 'tools',
    description: 'URL encode teks',
    usage: 'urlencode <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}urlencode <teks>`);
      await ctx.reply(`🔗 *URL Encoded*\n\n${encodeURIComponent(ctx.text)}`);
    },
  },
  {
    name: 'urldecode',
    aliases: ['decodeurl'],
    category: 'tools',
    description: 'URL decode teks',
    usage: 'urldecode <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}urldecode <teks>`);
      try {
        await ctx.reply(`🔗 *URL Decoded*\n\n${decodeURIComponent(ctx.text)}`);
      } catch {
        await ctx.reply('❌ Teks tidak valid!');
      }
    },
  },
  {
    name: 'htmlencode',
    aliases: ['encodehtml'],
    category: 'tools',
    description: 'HTML encode teks',
    usage: 'htmlencode <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}htmlencode <teks>`);
      const encoded = ctx.text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
      await ctx.reply(`📄 *HTML Encoded*\n\n${encoded}`);
    },
  },
  {
    name: 'htmldecode',
    aliases: ['decodehtml'],
    category: 'tools',
    description: 'HTML decode teks',
    usage: 'htmldecode <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}htmldecode <teks>`);
      const decoded = ctx.text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, '\'');
      await ctx.reply(`📄 *HTML Decoded*\n\n${decoded}`);
    },
  },
  {
    name: 'md5',
    aliases: ['hashmd5'],
    category: 'tools',
    description: 'Hash MD5',
    usage: 'md5 <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}md5 <teks>`);
      const hash = crypto.createHash('md5').update(ctx.text).digest('hex');
      await ctx.reply(`🔐 *MD5 Hash*\n\n${hash}`);
    },
  },
  {
    name: 'sha256',
    aliases: ['hashsha256'],
    category: 'tools',
    description: 'Hash SHA256',
    usage: 'sha256 <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}sha256 <teks>`);
      const hash = crypto.createHash('sha256').update(ctx.text).digest('hex');
      await ctx.reply(`🔐 *SHA256 Hash*\n\n${hash}`);
    },
  },
  {
    name: 'sha1',
    aliases: ['hashsha1'],
    category: 'tools',
    description: 'Hash SHA1',
    usage: 'sha1 <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}sha1 <teks>`);
      const hash = crypto.createHash('sha1').update(ctx.text).digest('hex');
      await ctx.reply(`🔐 *SHA1 Hash*\n\n${hash}`);
    },
  },
  {
    name: 'fakedata',
    aliases: ['randomdata', 'fakeperson'],
    category: 'tools',
    description: 'Generate data palsu/random',
    handler: async (ctx) => {
      const firstNames = ['Budi', 'Andi', 'Siti', 'Dewi', 'Ahmad', 'Rina', 'Putri', 'Raka', 'Maya', 'Doni', 'Lina', 'Fajar'];
      const lastNames = ['Santoso', 'Wijaya', 'Pratama', 'Sari', 'Hidayat', 'Rahayu', 'Kusuma', 'Perdana', 'Utami', 'Setiawan'];
      const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta', 'Semarang', 'Malang', 'Medan', 'Makassar', 'Denpasar', 'Solo'];
      const jobs = ['Programmer', 'Guru', 'Dokter', 'Desainer', 'Marketing', 'Akuntan', 'Pengusaha', 'Chef', 'Arsitek', 'Wartawan'];
      const fn = firstNames[Math.floor(Math.random() * firstNames.length)];
      const ln = lastNames[Math.floor(Math.random() * lastNames.length)];
      const age = Math.floor(Math.random() * 40) + 18;
      const city = cities[Math.floor(Math.random() * cities.length)];
      const job = jobs[Math.floor(Math.random() * jobs.length)];
      const phone = `08${Math.floor(Math.random() * 9) + 1}${Array.from({ length: 9 }, () => Math.floor(Math.random() * 10)).join('')}`;
      const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${Math.floor(Math.random() * 99)}@gmail.com`;
      await ctx.reply(`🎭 *Data Random*\n\n👤 Nama: ${fn} ${ln}\n📅 Umur: ${age} tahun\n🏙️ Kota: ${city}\n💼 Pekerjaan: ${job}\n📱 Telepon: ${phone}\n📧 Email: ${email}`);
    },
  },
  {
    name: 'lorem',
    aliases: ['loremipsum'],
    category: 'tools',
    description: 'Lorem ipsum generator',
    usage: 'lorem <jumlah paragraf>',
    handler: async (ctx) => {
      const count = Math.min(parseInt(ctx.text) || 1, 5);
      const paragraphs = [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.',
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.',
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
        'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias.',
      ];
      const result = paragraphs.slice(0, count).join('\n\n');
      await ctx.reply(`📝 *Lorem Ipsum*\n\n${result}`);
    },
  },
  {
    name: 'hashtag',
    aliases: ['generatehashtag'],
    category: 'tools',
    description: 'Generate hashtag dari teks',
    usage: 'hashtag <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}hashtag <teks>`);
      const words = ctx.text.split(/\s+/);
      const hashtags = words.map((w) => `#${w.replace(/[^a-zA-Z0-9]/g, '')}`).filter((h) => h.length > 1);
      const bonus = ['#viral', '#fyp', '#trending', '#explore', '#instagood', '#photooftheday'];
      const selected = bonus.sort(() => Math.random() - 0.5).slice(0, 5);
      await ctx.reply(`#️⃣ *Hashtags*\n\n${[...hashtags, ...selected].join(' ')}`);
    },
  },
  {
    name: 'ssweb',
    aliases: ['screenshot', 'ss'],
    category: 'tools',
    description: 'Screenshot website',
    usage: 'ssweb <url>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}ssweb <url>`);
      let url = ctx.text;
      if (!url.startsWith('http')) url = 'https://' + url;
      try {
        const ssUrl = `https://image.thum.io/get/width/1280/crop/720/fullpage/noanimate/${url}`;
        const { fetchBuffer } = require('../lib/utils');
        const buffer = await fetchBuffer(ssUrl);
        await ctx.sock.sendMessage(ctx.chatJid, { image: buffer, caption: `📸 Screenshot: ${url}` }, { quoted: ctx.msg });
      } catch {
        await ctx.reply('❌ Gagal mengambil screenshot!');
      }
    },
  },
  {
    name: 'whois',
    aliases: ['whoisdomain'],
    category: 'tools',
    description: 'Whois domain lookup',
    usage: 'whois <domain>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}whois <domain>`);
      try {
        const { fetchJson } = require('../lib/utils');
        const data = await fetchJson(`https://api.siputzx.my.id/api/tools/whois?domain=${encodeURIComponent(ctx.text)}`);
        if (data && data.data) {
          const d = data.data;
          await ctx.reply(`🌐 *Whois: ${ctx.text}*\n\n📛 Domain: ${d.domainName || ctx.text}\n📅 Created: ${d.creationDate || '-'}\n📅 Expires: ${d.expirationDate || '-'}\n🏢 Registrar: ${d.registrar || '-'}\n📊 Status: ${d.status || '-'}`);
        } else {
          await ctx.reply('❌ Domain tidak ditemukan!');
        }
      } catch {
        await ctx.reply('❌ Gagal lookup domain!');
      }
    },
  },
  {
    name: 'dns',
    aliases: ['dnslookup'],
    category: 'tools',
    description: 'DNS lookup',
    usage: 'dns <domain>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}dns <domain>`);
      try {
        const dns = require('dns').promises;
        const results = await dns.resolve(ctx.text);
        await ctx.reply(`🌐 *DNS Lookup: ${ctx.text}*\n\n📍 IP Addresses:\n${results.map((ip) => `• ${ip}`).join('\n')}`);
      } catch {
        await ctx.reply('❌ Gagal lookup DNS!');
      }
    },
  },
  {
    name: 'statuscode',
    aliases: ['httpstatus'],
    category: 'tools',
    description: 'Info HTTP status code',
    usage: 'statuscode <code>',
    handler: async (ctx) => {
      const codes = {
        '200': 'OK - Request berhasil', '201': 'Created - Resource dibuat', '204': 'No Content',
        '301': 'Moved Permanently', '302': 'Found - Redirect sementara', '304': 'Not Modified',
        '400': 'Bad Request', '401': 'Unauthorized', '403': 'Forbidden',
        '404': 'Not Found', '405': 'Method Not Allowed', '408': 'Request Timeout',
        '429': 'Too Many Requests', '500': 'Internal Server Error',
        '502': 'Bad Gateway', '503': 'Service Unavailable', '504': 'Gateway Timeout',
      };
      if (!ctx.text || !codes[ctx.text]) {
        let text = '📊 *HTTP Status Codes*\n\n';
        Object.entries(codes).forEach(([code, desc]) => { text += `${code} - ${desc}\n`; });
        return ctx.reply(text);
      }
      await ctx.reply(`📊 *HTTP ${ctx.text}*\n\n${codes[ctx.text]}`);
    },
  },
  {
    name: 'useragent',
    aliases: ['ua', 'randomua'],
    category: 'tools',
    description: 'Random user agent',
    handler: async (ctx) => {
      const uas = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 14_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64; rv:120.0) Gecko/20100101 Firefox/120.0',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Mobile/15E148 Safari/604.1',
        'Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.6099.43 Mobile Safari/537.36',
      ];
      const ua = uas[Math.floor(Math.random() * uas.length)];
      await ctx.reply(`🌐 *Random User Agent*\n\n${ua}`);
    },
  },
  {
    name: 'urlcheck',
    aliases: ['checkurl', 'safeurl'],
    category: 'tools',
    description: 'Cek keamanan URL',
    usage: 'urlcheck <url>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}urlcheck <url>`);
      let url = ctx.text;
      if (!url.startsWith('http')) url = 'https://' + url;
      try {
        const { default: axios } = require('axios');
        const res = await axios.head(url, { timeout: 10000, maxRedirects: 5 });
        await ctx.reply(`🔍 *URL Check: ${url}*\n\n✅ Status: ${res.status} ${res.statusText}\n📡 Server: ${res.headers.server || '-'}\n📝 Content-Type: ${res.headers['content-type'] || '-'}\n🔒 HTTPS: ${url.startsWith('https') ? 'Ya' : 'Tidak'}`);
      } catch (err) {
        await ctx.reply(`❌ URL tidak bisa diakses!\n\nError: ${err.message}`);
      }
    },
  },
  {
    name: 'tempmail',
    aliases: ['disposablemail'],
    category: 'tools',
    description: 'Generate email temporary',
    handler: async (ctx) => {
      const domains = ['tempmail.com', 'throwaway.email', 'temp-mail.org', 'guerrillamail.com', 'mailinator.com'];
      const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
      const name = Array.from({ length: 10 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
      const domain = domains[Math.floor(Math.random() * domains.length)];
      await ctx.reply(`📧 *Temporary Email*\n\n📬 ${name}@${domain}\n\n⚠️ Email ini fiktif untuk referensi saja.`);
    },
  },
  {
    name: 'ipinfo',
    aliases: ['ip', 'iplookup'],
    category: 'tools',
    description: 'IP address lookup',
    usage: 'ipinfo <ip>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}ipinfo <ip>`);
      try {
        const { fetchJson } = require('../lib/utils');
        const data = await fetchJson(`http://ip-api.com/json/${ctx.text}`);
        if (data.status === 'success') {
          await ctx.reply(`🌐 *IP Info: ${ctx.text}*\n\n🏙️ Kota: ${data.city}\n🏷️ Region: ${data.regionName}\n🌍 Negara: ${data.country}\n📍 Lat/Long: ${data.lat}, ${data.lon}\n🏢 ISP: ${data.isp}\n🏛️ Org: ${data.org}\n⏰ Timezone: ${data.timezone}`);
        } else {
          await ctx.reply('❌ IP tidak ditemukan!');
        }
      } catch {
        await ctx.reply('❌ Gagal lookup IP!');
      }
    },
  },
];
