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
};

module.exports = Job;
