const express = require("express");
const { getUser } = require("../controller/user");
const router = express.Router();
// const verifyToken = require("../middleware/tokenValidator");

router.route("/").get(getUser);
// router.route("/me").get(verifyToken, getCurrentUser);
// router.route("/login").post(loginUser);

module.exports = router;
