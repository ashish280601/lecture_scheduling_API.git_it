// const jwt = require("jsonwebtoken");
// const User = require("../model/authentication/user.model");

// const authenticateAdmin = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization');
//         if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const admin = await User.findOne({ _id: decoded._id, isAdmin: true });

//         if (!admin) return res.status(403).json({ message: 'Access denied. Not an admin.' });

//         req.user = admin;
//         next();
//       } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//       }
// }

// module.exports = authenticateAdmin;7
const jwt = require("jsonwebtoken");
const User = require("../model/authentication/user.model");

const authenticate = async (req, res, next) => {
  try {
    // Get token from request header
    const token = req.header("Authorization");
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID in the token payload
    const user = await User.findById(decoded._id);

    // Check if user exists
    if (!user)
      return res
        .status(403)
        .json({ message: "Access denied. User not found." });

    // Check if user role is admin or instructor
    if (user.role !== "admin" && user.role !== "instructor") {
      return res.status(403).json({ message: "Access denied. Invalid role." });
    }

    // Set user object in request
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = authenticate;
