const express = require("express");
const app = express();
const port = 4000;

app.listen(port, () => {
  console.log(`Running on ${port}`);
});

app.get("/user", (req, res) => {
  res.status(200).json({ message: "Working fine get user" });
});
