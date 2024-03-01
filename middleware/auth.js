const jwt = require("jsonwebtoken");
const User = require("../model/authentication/user.model");

const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const admin = await User.findOne({ _id: decoded._id, isAdmin: true });
    
        if (!admin) return res.status(403).json({ message: 'Access denied. Not an admin.' });
    
        req.user = admin;
        next();
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
      }
}

module.exports = authenticateAdmin;
