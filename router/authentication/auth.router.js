// routes/authRouter.js

const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authentication/auth.controller');

router.post('/login', authController.login);

module.exports = router;
