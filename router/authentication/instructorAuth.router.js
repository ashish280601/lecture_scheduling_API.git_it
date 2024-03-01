const router = require('express').Router();
const instructorAuthController = require("../../controllers/authentication/instructorAuth.controller");

router.post('register', instructorAuthController.register);
router.post('/login', instructorAuthController.login);

module.exports = router;