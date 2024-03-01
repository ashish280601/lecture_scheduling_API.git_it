const router = require('express').Router();
const adminAuthController = require("../../controllers/authentication/adminAuth.controller");

router.post('register', adminAuthController.registerAdmin);
router.post('/login', adminAuthController.loginAdmin);

module.exports = router;