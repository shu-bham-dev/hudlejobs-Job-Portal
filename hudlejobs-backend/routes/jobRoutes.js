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

router.post(
  "/:jobId/apply",
  passport.authenticate("jwt", { session: false }),
  jobController.applyForJob
); //Apply Job

router.post(
  "/:jobId",
  passport.authenticate("jwt", { session: false }),
  jobController.getJobById
);

router.get(
  "/:jobId/applications",
  passport.authenticate("jwt", { session: false }),
  jobController.getJobApplications
);

router.put(
  "/applications/status",
  passport.authenticate("jwt", { session: false }),
  jobController.updateApplicationStatus
);

module.exports = router;
