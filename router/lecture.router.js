const router = require("express").Router();
const lectureController = require('../controllers/lectureController');

router.get('/lecture', lectureController.getAllLectures);
router.post('/lecture', lectureController.addLecture);
router.put('/lecture/:id', lectureController.updateLecture); // Add route for updating lecture
router.delete('/lecture/:id', lectureController.deleteLecture); // Add route for deleting lecture

module.exports = router;