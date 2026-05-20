const config = require('../config');

const styleMap = {
  bold: { name: 'Bold', transform: (t) => t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D400 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D41A + code - 97); return c; }).join('') },
  italic: { name: 'Italic', transform: (t) => t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D434 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D44E + code - 97); return c; }).join('') },
  monospace: { name: 'Monospace', transform: (t) => t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D670 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D68A + code - 97); return c; }).join('') },
  bubble: { name: 'Bubble', transform: (t) => t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x24B6 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x24D0 + code - 97); return c; }).join('') },
  square: { name: 'Square', transform: (t) => t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1F130 + code - 65); return c; }).join('') },
  smallcaps: { name: 'Small Caps', transform: (t) => { const map = 'ᴀʙᴄᴅᴇꜰɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ'; return t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 97 && code <= 122) return map[code - 97]; return c; }).join(''); } },
  cursive: { name: 'Cursive', transform: (t) => t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D49C + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D4B6 + code - 97); return c; }).join('') },
  fraktur: { name: 'Fraktur/Medieval', transform: (t) => t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D504 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D51E + code - 97); return c; }).join('') },
  double: { name: 'Double Struck', transform: (t) => t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D538 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D552 + code - 97); return c; }).join('') },
  sans: { name: 'Sans Serif', transform: (t) => t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D5A0 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D5BA + code - 97); return c; }).join('') },
  sansbold: { name: 'Sans Bold', transform: (t) => t.split('').map((c) => { const code = c.charCodeAt(0); if (code >= 65 && code <= 90) return String.fromCodePoint(0x1D5D4 + code - 65); if (code >= 97 && code <= 122) return String.fromCodePoint(0x1D5EE + code - 97); return c; }).join('') },
};

function textStyleCommand(name, aliases, styleName) {
  return {
    name,
    aliases,
    category: 'textstyle',
    description: `Teks ${styleMap[styleName].name}`,
    usage: `${name} <teks>`,
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}${name} <teks>`);
      await ctx.reply(styleMap[styleName].transform(ctx.text));
    },
  };
}

module.exports = [
  textStyleCommand('bold', ['tebal'], 'bold'),
  textStyleCommand('italic', ['miring'], 'italic'),
  textStyleCommand('monospace', ['mono'], 'monospace'),
  textStyleCommand('bubble', ['bubbletext'], 'bubble'),
  textStyleCommand('square', ['squaretext', 'kotak'], 'square'),
  textStyleCommand('smallcaps', ['kecil'], 'smallcaps'),
  textStyleCommand('cursive', ['kursif'], 'cursive'),
  textStyleCommand('medieval', ['fraktur', 'gothic'], 'fraktur'),
  textStyleCommand('doublestruck', ['double'], 'double'),
  textStyleCommand('sans', ['sansserif'], 'sans'),
  textStyleCommand('sansbold', ['sanstebal'], 'sansbold'),
  {
    name: 'strikethrough',
    aliases: ['coret'],
    category: 'textstyle',
    description: 'Teks dicoret',
    usage: 'strikethrough <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}strikethrough <teks>`);
      await ctx.reply(ctx.text.split('').join('\u0336') + '\u0336');
    },
  },
  {
    name: 'upsidedown',
    aliases: ['terbalik'],
    category: 'textstyle',
    description: 'Teks terbalik',
    usage: 'upsidedown <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}upsidedown <teks>`);
      const flipTable = { a: 'ɐ', b: 'q', c: 'ɔ', d: 'p', e: 'ǝ', f: 'ɟ', g: 'ƃ', h: 'ɥ', i: 'ᴉ', j: 'ɾ', k: 'ʞ', l: 'l', m: 'ɯ', n: 'u', o: 'o', p: 'd', q: 'b', r: 'ɹ', s: 's', t: 'ʇ', u: 'n', v: 'ʌ', w: 'ʍ', x: 'x', y: 'ʎ', z: 'z', '!': '¡', '?': '¿', '.': '˙', ',': '\'', '(': ')', ')': '(' };
      const flipped = ctx.text.toLowerCase().split('').map((c) => flipTable[c] || c).reverse().join('');
      await ctx.reply(flipped);
    },
  },
  {
    name: 'vaporwave',
    aliases: ['vapor', 'aesthetic'],
    category: 'textstyle',
    description: 'Teks vaporwave/aesthetic',
    usage: 'vaporwave <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}vaporwave <teks>`);
      await ctx.reply(ctx.text.split('').map((c) => {
        const code = c.charCodeAt(0);
        if (code >= 33 && code <= 126) return String.fromCharCode(code + 0xFEE0);
        if (c === ' ') return '  ';
        return c;
      }).join(''));
    },
  },
  {
    name: 'mirror',
    aliases: ['cermin'],
    category: 'textstyle',
    description: 'Teks mirror/cermin',
    usage: 'mirror <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}mirror <teks>`);
      await ctx.reply(ctx.text + ' | ' + ctx.text.split('').reverse().join(''));
    },
  },
  {
    name: 'emojitext',
    aliases: ['emojify'],
    category: 'textstyle',
    description: 'Konversi teks ke emoji',
    usage: 'emojitext <teks>',
    handler: async (ctx) => {
      if (!ctx.text) return ctx.reply(`Gunakan: ${config.prefix}emojitext <teks>`);
      const emojiMap = { a: '🅰️', b: '🅱️', c: '©️', d: '🇩', e: '📧', f: '🎏', g: '🇬', h: '♓', i: 'ℹ️', j: '🎷', k: '🇰', l: '🇱', m: 'Ⓜ️', n: '🇳', o: '⭕', p: '🅿️', q: '🇶', r: '®️', s: '💲', t: '✝️', u: '🇺', v: '🇻', w: '🇼', x: '❌', y: '🇾', z: '🇿', ' ': '  ' };
      await ctx.reply(ctx.text.toLowerCase().split('').map((c) => emojiMap[c] || c).join(' '));
    },
  },
  {
    name: 'readmore',
    category: 'textstyle',
    description: 'Buat readmore text',
    usage: 'readmore <teks atas>|<teks bawah>',
    handler: async (ctx) => {
      if (!ctx.text || !ctx.text.includes('|')) {
        return ctx.reply(`Gunakan: ${config.prefix}readmore <teks atas>|<teks bawah>`);
      }
      const [top, bottom] = ctx.text.split('|');
      const readmore = String.fromCharCode(8206).repeat(4001);
      await ctx.reply(`${top.trim()}\n${readmore}\n${bottom.trim()}`);
    },
  },
];
