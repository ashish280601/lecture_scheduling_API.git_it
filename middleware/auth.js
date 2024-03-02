const jwt = require("jsonwebtoken");
const User = require("../model/authentication/user.model");

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId });
  
    if (!user) return res.status(403).json({ message: 'Access denied. User not found.' });
  
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = authenticateAdmin;
