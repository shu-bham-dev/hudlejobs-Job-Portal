const asyncHandler = require("express-async-handler");

const getUser = asyncHandler(async (req, res) => {
  res.status(200).json({ msg: "Get" });
});

module.exports = { getUser };
