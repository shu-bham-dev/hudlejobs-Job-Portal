const db = require("../config/db");
const Job = require("../models/job");
const User = require("../models/user");

exports.createJob = async (req, res) => {
  const { role } = req.user;

  if (role !== "ADMIN") {
    res.status(403).json({ error: "Unauthorised" });
    return;
  }
  const { positionName, description, experience, companyName, ctc, skills } =
    req.body;
  const createdDate = new Date();
  const recruiterId = req.user.id;

  try {
    const jobId = await Job.create(
      positionName,
      description,
      experience,
      createdDate,
      companyName,
      ctc,
      skills,
      recruiterId
    );
    res.json({ jobId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Job creation failed" });
  }
};

exports.getJobsByRecruiter = async (req, res) => {
  const recruiterId = req.user.id;

  try {
    const jobs = await Job.findByRecruiterId(recruiterId);
    res.json({ jobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

exports.getAllJobs = async (req, res) => {
  const searchQuery = req.query.search;
  const experienceQuery = req.query.exp;

  try {
    let jobs;
    const userId = req.user.id;
    if (searchQuery && experienceQuery) {
      const searchPattern = `%${searchQuery}%`;
      const minExperience = parseInt(experienceQuery);
      const maxExperience = minExperience + 1;
      jobs = await Job.findByPositionNameAndExperience(
        searchPattern,
        minExperience,
        maxExperience
      );
    } else if (experienceQuery) {
      const minExperience = parseInt(experienceQuery);
      const maxExperience = minExperience + 1;
      jobs = await Job.findByExperience(minExperience, maxExperience);
    } else if (searchQuery) {
      const searchPattern = `%${searchQuery}%`;
      jobs = await Job.findByPositionName(searchPattern);
    } else {
      jobs = await Job.find();
    }

    const userSkills = await User.getSkills(userId);
    const matchedJobs = jobs.map((job) => {
      const matchScore = calculateMatchScore(userSkills, job.skills);
      return { ...job, matchScore };
    });
    const sortedJobs = matchedJobs.sort((a, b) => b.matchScore - a.matchScore);
    res.json({ jobs: sortedJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

const calculateMatchScore = (userSkills, jobSkills) => {
  let matchScore = 0;
  const userArray = JSON.parse(userSkills);
  const jobArray = JSON.parse(jobSkills);
  for (const userSkill of userArray) {
    if (jobArray.includes(userSkill)) {
      matchScore++;
    }
  }
  return matchScore;
};

exports.deleteJob = async (req, res) => {
  try {
    const { role } = req.user;
    if (role !== "ADMIN") {
      res.status(403).json({ error: "Unauthorized" });
      return;
    }
    const { jobId } = req.params;
    const deleteJob = await Job.deleteById(jobId);
    res.json({ message: "Deleted Succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
};

exports.applyForJob = async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.user.id;

  try {
    const checkRepeat = await Job.checkDuplicate(jobId, userId);
    if (checkRepeat?.count > 0) {
      return res.json({ message: "Not allowed" });
    }

    const jobQuery = "SELECT * FROM jobs WHERE id = ?";
    const jobRows = await db.query(jobQuery, [jobId]);

    if (jobRows.length === 0) {
      res.status(404);
      throw new Error("Job not found");
    }

    const applyQuery =
      "INSERT INTO job_applications (user_id, job_id) VALUES (?, ?)";
    await db.query(applyQuery, [userId, jobId]);

    res.json({ message: "Job application successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobById = async (req, res) => {
  const jobId = req.params.jobId;
  try {
    const job = await Job.findJobById(jobId);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(500).json({ message: "No job found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
};
