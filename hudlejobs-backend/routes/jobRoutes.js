const express = require("express");
const router = express.Router();
const passport = require("passport");
const jobController = require("../controller/jobController");

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  jobController.createJob
); //ADMIN CREATE JOB

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  jobController.getJobsByRecruiter
); //ADMIN POSTED JOBS

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  jobController.getAllJobs
); //Get All Jobs

router.delete(
  "/:jobId",
  passport.authenticate("jwt", { session: false }),
  jobController.deleteJob
); //Delete job by id

module.exports = router;
