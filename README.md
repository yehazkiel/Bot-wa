# Bot-WA

WhatsApp Bot multi-fitur menggunakan [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys).

## Fitur

### Info
- `!menu` - Menampilkan daftar perintah
- `!ping` - Cek kecepatan respon bot
- `!runtime` - Waktu aktif bot
- `!owner` - Info owner bot
- `!script` - Source code bot

### Group Management
- `!kick` - Keluarkan member
- `!add` - Tambahkan member
- `!promote` / `!demote` - Atur admin
- `!tagall` / `!hidetag` - Tag semua member
- `!groupinfo` - Informasi grup
- `!setname` / `!setdesc` - Ubah nama/deskripsi grup
- `!linkgroup` / `!revoke` - Link grup
- `!mute` / `!unmute` - Mute/unmute bot di grup
- `!antilink on/off` - Anti-link
- `!welcome on/off` - Welcome/goodbye message
- `!listadmin` - Daftar admin

### Downloader
- `!ytmp3` - Download audio YouTube
- `!ytmp4` - Download video YouTube
- `!tiktok` - Download video TikTok
- `!instagram` - Download post/reel Instagram
- `!twitter` - Download video Twitter/X
- `!facebook` - Download video Facebook
- `!mediafire` - Download file MediaFire

### Sticker & Converter
- `!sticker` - Buat sticker dari gambar/video
- `!toimg` - Ubah sticker ke gambar
- `!circle` - Sticker bulat
- `!resize` - Resize gambar

### Tools
- `!calc` - Kalkulator matematika
- `!translate` - Terjemahkan teks (gratis)
- `!cuaca` - Cek cuaca (gratis, tanpa API key)
- `!qr` - Buat QR code
- `!shorturl` - Perpendek URL
- `!waktu` - Jam dunia
- `!reminder` - Set pengingat
- `!base64encode` / `!base64decode` - Encode/decode Base64
- `!randomcolor` - Generate warna random
- `!count` - Hitung karakter & kata
- `!password` - Generate password random

### Search
- `!wikipedia` / `!wikien` - Cari di Wikipedia (ID/EN)
- `!github` - Cari profil GitHub
- `!npm` - Cari package NPM
- `!ip` - IP lookup
- `!quote` - Quote random dari internet
- `!meme` - Meme random

### AI
- `!ai` - Chat dengan AI (gratis, tanpa API key)
- `!simi` - Chat dengan SimSimi
- `!fakta` - Fakta menarik random
- `!pantun` - Pantun random
- `!ceritahorror` - Cerita horror pendek

### Fun
- `!quote` - Quote motivasi
- `!truth` / `!dare` - Truth or Dare
- `!flip` / `!dice` - Lempar koin/dadu
- `!rng` - Random number
- `!rate` - Rate sesuatu
- `!ship` - Love calculator
- `!siapakah` - Pilih random member
- `!choose` - Pilih opsi
- `!zodiac` - Cek zodiak
- `!tebakangka` - Tebak angka
- `!aesthetic` - Teks aesthetic
- `!reverse` - Balikkan teks

### User System
- `!register` - Daftar ke bot
- `!profile` - Lihat profil
- `!level` - Cek level
- `!leaderboard` - Peringkat user

### Owner
- `!broadcast` - Broadcast pesan
- `!ban` / `!unban` - Ban/unban user
- `!banlist` - Daftar ban
- `!setprefix` - Ubah prefix
- `!setbotname` - Ubah nama bot
- `!join` / `!leave` - Join/leave grup
- `!eval` - Evaluate JS code
- `!cleartmp` - Bersihkan file temporary
- `!setpremium` / `!delpremium` - Atur premium user

## Instalasi

### Prasyarat
- [Node.js](https://nodejs.org/) v18 atau lebih baru
- [FFmpeg](https://ffmpeg.org/) (untuk konversi media)

### Langkah-langkah

1. Clone repository:
```bash
git clone https://github.com/yehazkiel/Bot-wa.git
cd Bot-wa
```

2. Install dependencies:
```bash
npm install
```

3. Salin file konfigurasi:
```bash
cp .env.example .env
```

4. Edit `.env` dan sesuaikan konfigurasi:
```
OWNER_NUMBER=628xxxxxxxxxx
OWNER_NAME=NamaKamu
BOT_NAME=BotKu
PREFIX=!
```

5. Jalankan bot:
```bash
npm start
```

6. Scan QR code yang muncul di terminal menggunakan WhatsApp.

**Semua fitur gratis tanpa API key!**

## Struktur Proyek

```
Bot-wa/
├── index.js              # Entry point utama
├── config.js             # Konfigurasi bot
├── package.json          # Dependencies
├── .env.example          # Template environment variables
├── .eslintrc.json        # ESLint config
├── lib/
│   ├── handler.js        # Command handler & plugin loader
│   ├── database.js       # JSON database manager
│   └── utils.js          # Utility functions
├── plugins/
│   ├── menu.js           # Menu & info commands
│   ├── owner.js          # Owner-only commands
│   ├── group.js          # Group management
│   ├── sticker.js        # Sticker & converter
│   ├── tools.js          # Various tools
│   ├── fun.js            # Fun commands
│   ├── search.js         # Search commands
│   ├── downloader.js     # Media downloader
│   ├── ai.js             # AI integration
│   └── user.js           # User system
└── database/             # JSON database storage
```

## Lisensi

MIT License
