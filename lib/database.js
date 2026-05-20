const fs = require('fs');
const path = require('path');
const config = require('../config');

const DB_DIR = config.dbPath;

if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// In-memory cache to avoid excessive file I/O
const cache = {};

function loadDB(name) {
  if (cache[name]) return cache[name];
  const filePath = path.join(DB_DIR, `${name}.json`);
  if (!fs.existsSync(filePath)) {
    cache[name] = {};
    return cache[name];
  }
  try {
    cache[name] = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return cache[name];
  } catch {
    cache[name] = {};
    return cache[name];
  }
}

function saveDB(name, data) {
  cache[name] = data;
  const filePath = path.join(DB_DIR, `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// User database
function getUser(jid) {
  const users = loadDB('users');
  if (!users[jid]) {
    users[jid] = {
      name: '',
      level: 1,
      xp: 0,
      limit: 30,
      premium: false,
      banned: false,
      registered: false,
      regTime: 0,
    };
    saveDB('users', users);
  }
  return users[jid];
}

function updateUser(jid, data) {
  const users = loadDB('users');
  users[jid] = { ...getUser(jid), ...data };
  saveDB('users', users);
}

function getAllUsers() {
  return loadDB('users');
}

// Group settings database
function getGroupSetting(groupJid) {
  const groups = loadDB('groups');
  if (!groups[groupJid]) {
    groups[groupJid] = {
      welcome: true,
      antilink: false,
      antitoxic: false,
      mute: false,
      simi: false,
    };
    saveDB('groups', groups);
  }
  return groups[groupJid];
}

function updateGroupSetting(groupJid, data) {
  const groups = loadDB('groups');
  groups[groupJid] = { ...getGroupSetting(groupJid), ...data };
  saveDB('groups', groups);
}

// Banned users
function isBanned(jid) {
  const user = getUser(jid);
  return user.banned;
}

function banUser(jid) {
  updateUser(jid, { banned: true });
}

function unbanUser(jid) {
  updateUser(jid, { banned: false });
}

// Level & XP
function addXP(jid, amount) {
  const user = getUser(jid);
  user.xp += amount;
  const nextLevelXP = user.level * 100;
  if (user.xp >= nextLevelXP) {
    user.level += 1;
    user.xp -= nextLevelXP;
  }
  updateUser(jid, user);
  return user;
}

module.exports = {
  loadDB,
  saveDB,
  getUser,
  updateUser,
  getAllUsers,
  getGroupSetting,
  updateGroupSetting,
  isBanned,
  banUser,
  unbanUser,
  addXP,
};
