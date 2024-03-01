const router = require("express").Router();
const courseController = require("../controllers/course.controller");

router.get("/course", courseController.getAllCourse);
router.post("/course", courseController.addCourse);
router.put("/course/:id", courseController.updateCourse);
router.delete("/course/:id", courseController.delCourse);

module.exports = router