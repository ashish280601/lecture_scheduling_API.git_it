const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../../model/authentication/user.model");

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the admin user in the database by username
    const adminUser = await User.findOne({ username, password, role: "admin" });

    if (!adminUser) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid Credentials!!" });
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
    const instructorUser = await User.findOne({
      username,
      password,
      role: "instructor",
    });

    // If instructor user not found, return error
    if (!instructorUser) {
      console.error("Instructor user not found.");
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
  instructorLogin,
};