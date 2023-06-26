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

router.get(
  "/all/matches",
  passport.authenticate("jwt", { session: false }),
  jobController.getMatchesJob
); //Get All Jobs according to skills

router.delete(
  "/:jobId",
  passport.authenticate("jwt", { session: false }),
  jobController.deleteJob
); //Delete job by id

router.post(
  "/:jobId/apply",
  passport.authenticate("jwt", { session: false }),
  jobController.applyForJob
); //Apply Job

module.exports = router;
