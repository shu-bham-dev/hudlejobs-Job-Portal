const express = require("express");
const session = require("express-session");
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const passport = require("passport");
const cors = require("cors");
const { initializePassport } = require("./config/passport");

const app = express();
const port = 4000;

db.connect((err) => {
  if (err) throw new Error(err);
  console.log("connected");
});

app.listen(port, () => {
  console.log(`Running on ${port}`);
});

const corsOpts = {
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};

initializePassport(passport);

app.use(
  session({
    secret: "SECRETJWT",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(cors(corsOpts));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes);
