const db = require("../config/db");

const Job = {
  create: (
    positionName,
    description,
    experience,
    createdDate,
    companyName,
    ctc,
    skills,
    recruiterId
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "INSERT INTO jobs (positionName, description, experience, createdDate, companyName, ctc, skills, recruiterId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          positionName,
          description,
          experience,
          createdDate,
          companyName,
          ctc,
          JSON.stringify(skills),
          recruiterId,
        ],
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
  findByRecruiterId: (recruiterId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM jobs WHERE recruiterId = ?",
        [recruiterId],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  find: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM jobs", (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  deleteById: (jobId) => {
    return new Promise((resolve, reject) => {
      db.query("DELETE FROM jobs WHERE id = ?", [jobId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.affectedRows);
        }
      });
    });
  },
  findByMatches: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT j.id, j.positionName, j.createdDate,
        (
          SELECT COUNT(*) 
          FROM JSON_TABLE(u.skills, "$[*]" COLUMNS(skill VARCHAR(255) PATH "$")) AS user_skills
          WHERE JSON_CONTAINS(j.skills, JSON_ARRAY(user_skills.skill))
        ) AS matching_skills_count
        FROM jobs j
        INNER JOIN users u ON u.id = ?
        ORDER BY matching_skills_count DESC, j.createdDate DESC;
      `;

      db.query(query, [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  },
  findByPositionName: (positionName) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM jobs WHERE positionName LIKE ?",
        [positionName],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  findByExperience: (minExperience, maxExperience) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM jobs WHERE experience >= ? AND experience < ?",
        [minExperience, maxExperience],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
  findByPositionNameAndExperience: (
    positionName,
    minExperience,
    maxExperience
  ) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM jobs WHERE positionName LIKE ? AND experience >= ? AND experience < ?",
        [positionName, minExperience, maxExperience],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        }
      );
    });
  },
};

module.exports = Job;