const express = require("express");
const passport = require("passport");
const authMiddleware = require("../middleware/authMiddleware");
const authController = require("../controller/authController");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", passport.authenticate("local"), authController.login);

module.exports = router;
