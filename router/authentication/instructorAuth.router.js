const router = require('express').Router();
const authController = require('../../controllers/authentication/auth.controller');

// Instructor login route
router.post("/instructor/login", authController.instructorLogin);

module.exports = router;
