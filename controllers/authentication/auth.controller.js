const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { log } = require('console');

// Load environment variables
require('dotenv').config();

// Hardcoded admin credentials
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin@12345';

// Hardcoded instructor credentials
const INSTRUCTOR_USERNAME = 'ashish';
const INSTRUCTOR_PASSWORD = 'mehra@1234';

// Get JWT secret key from environment variables
const JWT_SECRET = process.env.JWT_SECRET;

// Generate a random secret key
const SECRET_KEY = crypto.randomBytes(64).toString('hex');

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    log(req.body)

    // Check if user is admin
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ username: ADMIN_USERNAME, isAdmin: true }, JWT_SECRET);
      return res.status(200).json({ token });
    }

    // Check if user is instructor
    if (username === INSTRUCTOR_USERNAME && password === INSTRUCTOR_PASSWORD) {
      const token = jwt.sign({ username: INSTRUCTOR_USERNAME, isAdmin: false }, JWT_SECRET);
      return res.status(200).json({ token });
    }

    if (!isAdmin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  login,
};
