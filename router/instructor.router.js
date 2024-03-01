const router = require("express").Router();
const InstructorController = require("../controllers/instructor.controller");

router.get("/instructor", InstructorController.getAllInstructors);
router.post("/instructor", InstructorController.addInstructor);
router.put("/instructor/:id", InstructorController.updateInstructor);
router.delete("/instructor/:id", InstructorController.delInstructor);

module.exports = router