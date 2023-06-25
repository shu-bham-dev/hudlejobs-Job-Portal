const express = require("express");
const passport = require("passport");
const authController = require("../controller/authController");
const { isAuthenticated } = require("../config/passport");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  authController.getCurrentUser
);

module.exports = router;
