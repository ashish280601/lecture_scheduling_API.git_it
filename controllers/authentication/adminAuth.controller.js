const User = require("../../model/authentication/user.model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const adminExists = await User.findOne({ email, isAdmin: true });
      if (adminExists) return res.status(400).json({ message: 'Admin already exists.' });
      const admin = new User({ email, password, isAdmin: true });
      await admin.save();
      res.status(201).json({ message: 'Admin registered successfully.' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
  exports.loginAdmin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await User.findOne({ email, isAdmin: true });
      if (!admin) return res.status(400).json({ message: 'Invalid email or password.' });
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ message: 'Invalid email or password.' });
      const token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);
      res.json({ token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };