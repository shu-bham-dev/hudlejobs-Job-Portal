const express = require("express");
const passport = require("passport");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  authController.getCurrentUser
);

router.get(
  "/me/applied-jobs",
  passport.authenticate("jwt", { session: false }),
  authController.getAppliedJobs
);

module.exports = router;
