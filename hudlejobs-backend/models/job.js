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
  findByExperience: (minExperience) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM jobs WHERE experience >= ?",
        [minExperience],
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
  findByPositionNameAndExperience: (positionName, minExperience) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM jobs WHERE positionName LIKE ? AND experience >= ?",
        [positionName, minExperience],
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
  findJobById: (userId) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM jobs WHERE id=?", [userId], (error, result) => {
        if (error) {
          reject(error);
        } else {
          console.log(result);
          resolve(result[0]);
        }
      });
    });
  },
  checkDuplicate: (jobId, userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT user_id, job_id, COUNT(*) AS count FROM job_applications WHERE user_id = ? AND job_id = ? GROUP BY user_id, job_id HAVING count > 0",
        [userId, jobId],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result[0]);
          }
        }
      );
    });
  },
  getJobApplications: (jobId) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT ja.*, u.* FROM job_applications ja INNER JOIN users u ON ja.user_id = u.id WHERE ja.job_id = ?",
        [jobId],
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
  updateApplicationStatus: (jobId, userId, status) => {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE job_applications SET status = ? WHERE job_id = ? AND user_id = ?",
        [status, jobId, userId],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.affectedRows);
          }
        }
      );
    });
  },
};

module.exports = Job;
