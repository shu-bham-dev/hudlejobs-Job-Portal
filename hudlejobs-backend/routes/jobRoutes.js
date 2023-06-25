const express = require("express");
const router = express.Router();
const jobController = require("../controller/jobController");
const { isAuthenticated } = require("../config/passport");

router.post("/", isAuthenticated, jobController.createJob); //ADMIN CREATE JOB
router.get("/", isAuthenticated, jobController.getJobsByRecruiter); //ADMIN POSTED JOBS
router.get("/all", isAuthenticated, jobController.getAllJobs); //Get All Jobs
router.delete("/:jobId", isAuthenticated, jobController.deleteJob); //Delete job by id

module.exports = router;
