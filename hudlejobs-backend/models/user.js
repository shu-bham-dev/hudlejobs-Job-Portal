const db = require("../config/db");

const User = {
  create: ({ name, email, phone, password, skills, role }) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO users (name, email, phone, password, skills, role) VALUES (?, ?, ?, ?, ?, ?)",
        [name, email, phone, password, JSON.stringify(skills), role],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.insertId);
          }
        }
      );
    });
  },
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  },
  findById: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM users WHERE id = ?",
        [userId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results[0]);
          }
        }
      );
    });
  },
  comparePassword: (password, hashedPassword) => {
    // Implement your password comparison logic here
    // Return true if the passwords match, false otherwise
    // You can use libraries like bcrypt for secure password hashing and comparison
  },
};

module.exports = User;
