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
    console.log("get", userId);
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
  findAppliedJobById: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM job_applications WHERE user_id = ?",
        [userId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const jobIds = results.map((job) => job.job_id);
            db.query(
              "SELECT * FROM jobs WHERE id IN (?)",
              [jobIds],
              (error, results) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(results);
                }
              }
            );
          }
        }
      );
    });
  },
  getSkills: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT skills FROM users WHERE id = ?",
        [userId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const userSkills = results[0]?.skills || [];
            resolve(userSkills);
          }
        }
      );
    });
  },
};

module.exports = User;
