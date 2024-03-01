const router = require('express').Router();
const adminAuthController = require("../../controllers/authentication/adminAuth.controller");


router.post('/login', adminAuthController.login);

module.exports = router;