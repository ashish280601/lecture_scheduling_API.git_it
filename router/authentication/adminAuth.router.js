const router = require('express').Router();
const authController = require('../../controllers/authentication/auth.controller');

router.post("/admin/login",authController.adminLogin);

module.exports = router;
