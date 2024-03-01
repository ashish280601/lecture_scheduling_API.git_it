const router = require('express').Router();
const instructorAuthController = require("../../controllers/authentication/instructorAuth.controller");

router.post('register', instructorAuthController.registerInstructor);
router.post('/login', instructorAuthController.loginInstructor);

module.exports = router;