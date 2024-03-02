const router = require('express').Router();
const authController = require('../../controllers/authentication/auth.controller');
const authenticateInstructor = require('../../middleware/auth')('instructor');

// Instructor login route
router.post("instructor/login",authenticateInstructor, authController.instructorLogin);

module.exports = router;
