const express = require("express");
const { getUser } = require("../controller/userController");
const router = express.Router();

router.route("/").get(getUser);

module.exports = router;
