const { fetchJson, fetchBuffer } = require('../lib/utils');

function animeCommand(name, aliases, description, endpoint) {
  return {
    name,
    aliases,
    category: 'anime',
    description,
    handler: async (ctx) => {
      try {
        const data = await fetchJson(`https://api.waifu.pics/sfw/${endpoint}`);
        if (data && data.url) {
          const buffer = await fetchBuffer(data.url);
          await ctx.sock.sendMessage(
            ctx.chatJid,
            { image: buffer, mimetype: 'image/jpeg', caption: `🎌 *${description}*` },
            { quoted: ctx.msg }
          );
        } else {
          await ctx.reply('❌ Gagal mendapatkan gambar!');
        }
      } catch {
        await ctx.reply('❌ Gagal mendapatkan gambar!');
      }
    },
  };
}

module.exports = [
  animeCommand('waifu', [], 'Gambar waifu random', 'waifu'),
  animeCommand('neko', [], 'Gambar neko random', 'neko'),
  animeCommand('shinobu', [], 'Gambar shinobu', 'shinobu'),
  animeCommand('megumin', [], 'Gambar megumin', 'megumin'),
  animeCommand('cuddle', [], 'Anime cuddle', 'cuddle'),
  animeCommand('animehug', ['hug_anime'], 'Anime hug', 'hug'),
  animeCommand('pat', [], 'Anime pat', 'pat'),
  animeCommand('animeslap', ['slap_anime'], 'Anime slap', 'slap'),
  animeCommand('wink', [], 'Anime wink', 'wink'),
  animeCommand('poke', [], 'Anime poke', 'poke'),
  animeCommand('smile', [], 'Anime smile', 'smile'),
  animeCommand('wave', [], 'Anime wave', 'wave'),
  animeCommand('bite', [], 'Anime bite', 'bite'),
  animeCommand('animekill', ['kill_anime'], 'Anime kill', 'kill'),
  animeCommand('animekick', ['kick_anime'], 'Anime kick', 'kick'),
  animeCommand('cringe', [], 'Anime cringe', 'cringe'),
  animeCommand('cry', ['animecry'], 'Anime cry', 'cry'),
  animeCommand('dance', ['animedance'], 'Anime dance', 'dance'),
  animeCommand('blush', [], 'Anime blush', 'blush'),
  animeCommand('bully', [], 'Anime bully', 'bully'),
  animeCommand('bonk', [], 'Anime bonk', 'bonk'),
  animeCommand('yeet', [], 'Anime yeet', 'yeet'),
  animeCommand('handhold', [], 'Anime handhold', 'handhold'),
  animeCommand('nom', [], 'Anime nom', 'nom'),
  animeCommand('happy', ['animehappy'], 'Anime happy', 'happy'),
  {
    name: 'animequote',
    aliases: ['animequotes'],
    category: 'anime',
    description: 'Quote anime random',
    handler: async (ctx) => {
      try {
        const data = await fetchJson('https://animechan.io/api/v1/quotes/random');
        if (data && data.data) {
          const q = data.data;
          await ctx.reply(`🎌 *Anime Quote*\n\n"${q.content}"\n\n— *${q.character.name}*\n📺 ${q.anime.name}`);
        } else {
          await ctx.reply('❌ Gagal mendapatkan quote!');
        }
      } catch {
        await ctx.reply('❌ Gagal mendapatkan quote!');
      }
    },
  },
];
