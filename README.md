# Bot-WA

WhatsApp Bot multi-fitur (228+ perintah) menggunakan [@whiskeysockets/baileys](https://github.com/WhiskeySockets/Baileys).

**Semua fitur GRATIS tanpa API key!**

## Fitur (228+ Perintah)

### Info (6)
`!menu` `!info` `!ping` `!runtime` `!owner` `!script`

### AI (8)
`!ai` `!gemini` `!mistral` `!deepseek` `!simi` `!fakta` `!pantun` `!ceritahorror`

### Anime (26)
`!waifu` `!neko` `!shinobu` `!megumin` `!cuddle` `!animehug` `!pat` `!animeslap` `!wink` `!poke` `!smile` `!wave` `!bite` `!animekill` `!animekick` `!cringe` `!cry` `!dance` `!blush` `!bully` `!bonk` `!yeet` `!handhold` `!nom` `!happy` `!animequote`

### Economy (20)
`!daily` `!weekly` `!balance` `!transfer` `!deposit` `!withdraw` `!work` `!hunt` `!fish` `!mine` `!rob` `!crime` `!shop` `!buy` `!sell` `!inventory` `!richest` `!bet` `!lottery` `!gift`

### Education (15)
`!peribahasa` `!unsur` `!planet` `!negara` `!bahasa` `!binary` `!frombinary` `!hex` `!fromhex` `!roman` `!suhu` `!berat` `!panjang` `!rumusmatika` `!katamutiara`

### Downloader (7)
`!ytmp3` `!ytmp4` `!tiktok` `!instagram` `!twitter` `!facebook` `!mediafire`

### Fun (23)
`!pickup` `!pantunlucu` `!jokes` `!darkjoke` `!puisi` `!cerpen` `!bucin` `!galau` `!8ball` `!hack` `!afk` `!horoscope` `!couplepp` `!truth` `!dare` `!ship` `!siapakah` `!choose` `!rate` `!flip` `!dice` `!rng` `!reverse`

### Game (15)
`!tebakkata` `!suit` `!slot` `!mathquiz` `!riddle` `!trivia` `!scramble` `!quizcapital` `!emojiquiz` `!quiziq` `!tebakangka` `!tebakbendera` `!tebakkota` `!tebaklirik` `!wouldyourather`

### Group (16)
`!kick` `!add` `!promote` `!demote` `!tagall` `!hidetag` `!groupinfo` `!setname` `!setdesc` `!linkgroup` `!revoke` `!mute` `!unmute` `!antilink` `!welcome` `!listadmin`

### Islamic (14)
`!alquran` `!tafsir` `!quransurah` `!jadwalsholat` `!asmaulhusna` `!doaharian` `!kisahnabi` `!ayatkursi` `!islamicquote` `!istighfar` `!dzikir` `!niatsolat` `!hijriah` `!hadist`

### Owner (10)
`!broadcast` `!ban` `!unban` `!banlist` `!setprefix` `!setbotname` `!join` `!leave` `!eval` `!cleartmp`

### Search (7)
`!wikipedia` `!wikien` `!github` `!npm` `!ipinfo` `!quoteen` `!meme`

### Sticker (4)
`!sticker` `!toimg` `!circle` `!resize`

### Text Style (17)
`!bold` `!italic` `!monospace` `!bubble` `!square` `!smallcaps` `!cursive` `!medieval` `!doublestruck` `!sans` `!sansbold` `!strikethrough` `!upsidedown` `!vaporwave` `!mirror` `!emojitext` `!readmore`

### Tools (12)
`!calc` `!translate` `!cuaca` `!qr` `!shorturl` `!waktu` `!reminder` `!base64encode` `!base64decode` `!randomcolor` `!count` `!password`

### Extra Tools (22)
`!uuid` `!timestamp` `!epochconvert` `!jsonformat` `!urlencode` `!urldecode` `!htmlencode` `!htmldecode` `!md5` `!sha256` `!sha1` `!fakedata` `!lorem` `!hashtag` `!ssweb` `!whois` `!dns` `!statuscode` `!useragent` `!urlcheck` `!tempmail` `!ipinfo`

### User System (6)
`!register` `!profile` `!level` `!leaderboard` `!setpremium` `!delpremium`

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
│   ├── database.js       # JSON database manager (in-memory cache)
│   └── utils.js          # Utility functions
├── plugins/
│   ├── menu.js           # Menu & info commands
│   ├── owner.js          # Owner-only commands
│   ├── group.js          # Group management
│   ├── sticker.js        # Sticker & converter
│   ├── tools.js          # Various tools
│   ├── extratools.js     # Extra tools (hash, encode, etc.)
│   ├── extrafun.js       # Fun commands (truth/dare, jokes, etc.)
│   ├── search.js         # Search commands
│   ├── downloader.js     # Media downloader
│   ├── ai.js             # AI integration (siputzx)
│   ├── anime.js          # Anime images & reactions
│   ├── game.js           # Games & quizzes
│   ├── economy.js        # Economy system
│   ├── education.js      # Education & conversion
│   ├── islamic.js        # Islamic features
│   ├── textstyle.js      # Text styling
│   └── user.js           # User system
└── database/             # JSON database storage
```

## Lisensi

MIT License
