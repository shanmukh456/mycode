
const jwt = require('jsonwebtoken');
const db = require('./db');

class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  static register(username, password) {
    return new Promise((resolve, reject) => {
   
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
          reject(err.message);
          return;
        }

       
        if (row) {
          reject('Username is already taken');
          return;
        }

      
        const stmt = db.prepare('INSERT INTO users (username, password) VALUES (?, ?)');
        stmt.run(username, password, function (err) {
          if (err) {
            reject(err.message);
          } else {
            const newUser = new User(username, password);
            resolve(newUser);
          }

          stmt.finalize();
        });
      });
    });
  }

  static login(username, password) {
    return new Promise((resolve, reject) => {
    
      db.get('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, row) => {
        if (err) {
          reject(err.message);
          return;
        }

     
        if (!row) {
          reject('Invalid username or password');
          return;
        }

        const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });

        resolve({ token, user: new User(username, password) });
      });
    });
  }

  static getProfile(username) {
    return new Promise((resolve, reject) => {
    
      db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
        if (err) {
          reject(err.message);
        } else {
          const userProfile = row ? new User(row.username, row.password) : null;
          resolve(userProfile);
        }
      });
    });
  }
}

module.exports = User;
