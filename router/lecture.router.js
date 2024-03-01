const router = require("express").Router();
const lectureController = require('../controllers/lectures.controller');

router.get('/lecture', lectureController.getAllLecture);
router.post('/lecture', lectureController.addLecture);
router.put('/lecture/:id', lectureController.updateLecture); 
router.delete('/lecture/:id', lectureController.delLecture); 

module.exports = router;