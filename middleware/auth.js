const jwt = require("jsonwebtoken");
const User = require("../model/authentication/user.model");

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers('Authorization');
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("payload", decoded);
    const user = await User.findOne({ username: decoded.username });
  
    if (!user) return res.status(403).json({ message: `Access denied. User is not a ${role}.` });

    if (user.role !== req.role) return res.status(403).json({ message: 'Access denied. User is not an admin.' })
  
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
}

module.exports = authenticateAdmin;
