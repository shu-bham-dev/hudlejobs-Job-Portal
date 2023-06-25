const express = require("express");
const router = express.Router();
const jobController = require("../controller/jobController");
const passport = require("passport");
const { isAuthenticated } = require("../config/passport");

// Create a job
router.post("/", jobController.createJob);

// Get jobs by recruiter
router.get("/", isAuthenticated, jobController.getJobsByRecruiter);

module.exports = router;
