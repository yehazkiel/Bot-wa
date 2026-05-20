require('dotenv').config();

module.exports = {
  // Bot owner number (with country code, without + or spaces)
  ownerNumber: process.env.OWNER_NUMBER || '6281234567890',
  ownerName: process.env.OWNER_NAME || 'Owner',

  // Bot settings
  botName: process.env.BOT_NAME || 'Bot-WA',
  prefix: process.env.PREFIX || '!',

  // Limits
  maxFileSize: 100 * 1024 * 1024, // 100MB

  // Session
  sessionName: 'bot-session',

  // Database
  dbPath: './database',
};
