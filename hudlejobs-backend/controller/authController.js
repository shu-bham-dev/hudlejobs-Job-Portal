const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.register = async (req, res) => {
  const { name, email, phone, password, skills, role } = req.body;
  if (!name || !email || !password || !phone) {
    res.status(404);
    throw new Error("All fields are mandatory");
  }
  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      res.status(404);
      throw new Error("User already exist");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || "CANDIDATE";
    const userId = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      skills,
      role: userRole,
    });
    res.json({ userId });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("email and password are required");
  }
  try {
    const user = await User.findByEmail(email);
    if (user) {
      const passwordMatch = bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign(
          {
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            },
          },
          "SECRETJWT",
          { expiresIn: "1d" }
        );
        res.status(200).json({ user, accessToken: token });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCurrentUser = (req, res) => {
  const { user } = req;
  res.json({ user });
};

exports.getAppliedJobs = async (req, res) => {
  const userId = req.user.id;

  try {
    const jobs = await User.findAppliedJobById(userId);
    res.json({ jobs });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
