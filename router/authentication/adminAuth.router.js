const router = require('express').Router();
const authController = require('../../controllers/authentication/auth.controller');
const authenticateAdmin = require('../../middleware/auth')('admin');

router.post("/admin/login",authenticateAdmin, authController.adminLogin);

module.exports = router;
