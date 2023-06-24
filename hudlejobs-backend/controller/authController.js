const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, phone, password, skills } = req.body;
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
    const userId = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      skills,
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
              name: user.name,
              email: user.email,
              id: user.id,
            },
          },
          "SECRETJWT",
          { expiresIn: "10m" }
        );
        res.status(200).json({ accessToken: token });
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
