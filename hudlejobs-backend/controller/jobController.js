const Job = require("../models/job");

exports.createJob = async (req, res) => {
  console.log(">>>>>>", req.user);
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
