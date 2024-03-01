const Course = require("../model/course.model");

// get course
exports.getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// add course
exports.addCourse = async (req, res) => {
  try {
    const { name, level, description, image } = req.body;
    // Create a new course instance
    const course = new Course({
      name,
      level,
      description,
      image,
    });
    // Save the course to the database
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    console.error("Error creating course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// update course
exports.updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, level, description, image } = req.body;
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      { name, level, description, image },
      { new: true }
    );
    res.json(updatedCourse);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// delete course
exports.delCourse = async (req, res) => {
  try {
    const { id } = req.params;
    await Course.findByIdAndDelete(id);
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
