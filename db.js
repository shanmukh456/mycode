
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); 


db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      ingredients TEXT,
      instructions TEXT,
      image TEXT
    )
  `);
});

module.exports = db;
