const asyncHandler = require("express-async-handler");
// const userSchema = require("../models/userModel");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const getUser = asyncHandler(async (req, res) => {
  //   const allUser = await userSchema.find();
  //   if (!allUser) {
  //     res.status(404);
  //     throw new Error("No user is found");
  //   }
  //   res.status(200).json(allUser);
  res.status(200).json({ msg: "Get" });
});

// const registerUser = asyncHandler(async (req, res) => {
//     const { username, email, password } = req.body
//     if (!username || !email || !password) {
//         res.status(404)
//         throw new Error('All fields are mandatory')
//     }
//     const existingUser = await userSchema.findOne({ email })
//     if (existingUser) {
//         res.status(404)
//         throw new Error('User already exist')
//     }
//     const hashedPassword = await bcrypt.hash(password, 10)
//     const user = await userSchema.create({
//         username,
//         email,
//         password: hashedPassword,
//     })
//     res.status(200).json(user)
// })

// const loginUser = asyncHandler(async (req, res) => {
//     const { email, password } = req.body
//     if (!email || !password) {
//         res.status(400)
//         throw new Error('email and password are required')
//     }
//     const existUser = await userSchema.findOne({ email })
//     if (existUser && (await bcrypt.compare(password, existUser.password))) {
//         const token = jwt.sign(
//             {
//                 user: {
//                     username: existUser.username,
//                     email: existUser.email,
//                     id: existUser.id,
//                 },
//             },
//             'SECRETJWT',
//             { expiresIn: '10m' }
//         )
//         res.status(200).json({ accessToken: token })
//     } else {
//         res.status(400)
//         throw new Error('email and password do not match!')
//     }
// })

// const getCurrentUser = asyncHandler(async (req, res) => {
//     res.json(req.user)
// })

module.exports = { getUser };
