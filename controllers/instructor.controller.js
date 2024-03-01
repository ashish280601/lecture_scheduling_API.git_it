const Instructor = require("../model/instructor.model");

// get instructor
exports.getAllInstructors = async (req, res) => {
  try {
    const instructors = await Instructor.find();
    res.json(instructors);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// adding instructor controller
exports.addInstructor = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newInstructor = new Instructor({ name, email, password });
    await newInstructor.save();
    res.status(201).json(newInstructor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// updating instructor controller
exports.updateInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const updatedInstructor = await Instructor.findByIdAndUpdate(
      id,
      { name, email, password },
      { new: true }
    );
    res.json({message: "Instructor Update successfully", updatedInstructor});
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// delete isntructor controller
exports.delInstructor = async (req, res) => {
  try {
    const { id } = req.params;
    await Instructor.findByIdAndDelete(id);
    res.json({ message: "Instructor deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
