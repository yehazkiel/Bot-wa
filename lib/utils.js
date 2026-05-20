const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function downloadMedia(msg, pathFile) {
  const buffer = await downloadMediaMessage(msg, 'buffer', {});
  if (pathFile) {
    fs.writeFileSync(pathFile, buffer);
  }
  return buffer;
}

function formatNumber(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatDuration(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const parts = [];
  if (days > 0) parts.push(`${days} hari`);
  if (hours > 0) parts.push(`${hours} jam`);
  if (minutes > 0) parts.push(`${minutes} menit`);
  if (seconds > 0) parts.push(`${seconds} detik`);
  return parts.join(' ') || '0 detik';
}

function getRandom(ext) {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}${ext}`;
}

function isUrl(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  return urlRegex.test(text);
}

function extractUrls(text) {
  const urlRegex = /(https?:\/\/[^\s]+)/gi;
  return text.match(urlRegex) || [];
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(url, options = {}) {
  const res = await axios.get(url, {
    ...options,
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ...options.headers,
    },
  });
  return res.data;
}

async function fetchBuffer(url, options = {}) {
  const res = await axios.get(url, {
    ...options,
    responseType: 'arraybuffer',
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ...options.headers,
    },
  });
  return Buffer.from(res.data);
}

function getTempPath(ext) {
  const dir = path.join(__dirname, '..', 'temp');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return path.join(dir, getRandom(ext));
}

function cleanTemp() {
  const dir = path.join(__dirname, '..', 'temp');
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      try {
        fs.unlinkSync(path.join(dir, file));
      } catch {
        // ignore
      }
    }
  }
}

function parseJid(text) {
  return text
    .replace(/[^0-9]/g, '')
    .replace(/^(\d+)$/, '$1@s.whatsapp.net');
}

function parseMentions(text) {
  const matches = text.match(/@(\d+)/g) || [];
  return matches.map((m) => m.replace('@', '') + '@s.whatsapp.net');
}

module.exports = {
  downloadMedia,
  formatNumber,
  formatDuration,
  getRandom,
  isUrl,
  extractUrls,
  sleep,
  fetchJson,
  fetchBuffer,
  getTempPath,
  cleanTemp,
  parseJid,
  parseMentions,
};
