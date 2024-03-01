const Instructor = require("../models/Instructor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.loginInstructor = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the instructor by email
    const instructor = await Instructor.findOne({ email });
    if (!instructor) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, instructor.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    // Generate JWT token
    const token = jwt.sign(
      { _id: instructor._id, role: "instructor" },
      process.env.JWT_SECRET
    );
    res.json({ token });
  } catch (error) {
    console.error("Login failed", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.registerInstructor = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if instructor with the email already exists
    const instructorExists = await Instructor.findOne({ email });
    if (instructorExists) {
      return res.status(400).json({ message: "Instructor already exists." });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new instructor
    const newInstructor = new Instructor({ email, password: hashedPassword });
    await newInstructor.save();
    res.status(201).json({ message: "Instructor registered successfully." });
  } catch (error) {
    console.error("Registration failed", error);
    res.status(500).json({ message: "Server Error" });
  }
};
