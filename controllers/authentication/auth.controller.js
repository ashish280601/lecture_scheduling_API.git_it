// controllers/authentication/auth.controller.js

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../model/authentication/user.model");

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin user in the database by username
    const adminUser = await User.findOne({ username, role: "admin" });

    // If admin user not found or password does not match, return error
    if (!adminUser || !(await bcrypt.compare(password, adminUser.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with user data
    const token = jwt.sign(
      { username: adminUser.username, role: adminUser.role },
      process.env.JWT_SECRET
    );

    // Return the token and isAdmin flag in the response
    res.json({ token, role: adminUser.role });
  } catch (error) {
    console.error("Admin Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const instructorLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the instructor user in the database by username
    const instructorUser = await User.findOne({ username, role: "instructor" });

    // If instructor user not found, return error
    if (!instructorUser) {
      console.error("Instructor user not found.");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, instructorUser.password);
    if (!passwordMatch) {
      console.error("Password does not match.");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token with user data
    const token = jwt.sign(
      { username: instructorUser.username, role: instructorUser.role },
      process.env.JWT_SECRET
    );

    // Return the token and role in the response
    res.json({ token, role: instructorUser.role });
  } catch (error) {
    console.error("Instructor Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  adminLogin,
  instructorLogin
};
