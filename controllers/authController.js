// backend/controllers/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/userRepository");
const Students = require("../models/student");
const Tutors = require("../models/tutor");
const Admins = require("../models/adminModel");
const Parents = require("../models/parentModel");
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await userRepository.findUserByEmail(email);
   
    if (!user) {
      return res
        .status(401)
        .json({ message: "Invalid credentials (user not found)" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid credentials (wrong password)" });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    res.json({ token, role: user.role, name: user.name });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userRepository.findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await userRepository.createUser({
      name,
      email,
      password: hashedPassword,
      role,
    });

    switch (role) {
      case "student":
        await Students.create({
          id: newUser.id,
          name,
          email,
          password: hashedPassword,
        });
        break;
      case "tutor":
        await Tutors.createTutor({
          id: newUser.id,
          name,
          email,
          password: hashedPassword,
        });
        break;
      case "admin":
        await Admins.create({
          id: newUser.id,
          name,
          email,
          password: hashedPassword,
        });
        break;
      case "parent":
        await Parents.createParent({
          id: newUser.id,
          name,
          email,
          password: hashedPassword,
        });
        break;
      default:
        return res.status(400).json({ message: "Invalid role" });
    }

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

module.exports = {
  login,
  register,
};
