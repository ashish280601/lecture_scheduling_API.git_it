const bcrypt = require("bcrypt");
const Instructor = require("../../model/authentication/user.model");

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new instructor
    const instructor = new Instructor({ username, password: hashedPassword });
    await instructor.save();
    res.status(201).json({ message: "Instructor registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    // Find the instructor by username
    const instructor = await Instructor.findOne({ username });
    if (!instructor) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, instructor.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }
    res.json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
