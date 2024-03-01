const router =  require('express').Router();
const { instructorPanel } = require('../../controllers/authentication/instructor.controller');
const { authenticateToken, authorize } = require('../../middleware/auth');

router.get('/', authenticateToken, authorize(['instructor']), instructorPanel);

module.exports = router;