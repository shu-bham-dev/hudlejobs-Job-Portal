const express = require("express");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = 4000;

db.connect((err) => {
  if (err) throw new Error(err);
  console.log("connected");
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});

app.use(express.json());
app.use("/user", require("./routes/userRoutes"));
app.use("/api/auth", authRoutes);
