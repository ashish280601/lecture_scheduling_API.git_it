const Lecture = require("../model/lecture.model");

// get course
exports.getAllLecture = async (req, res) => {
  try {
    const lectures = await Lecture.find()
      .populate("instructor")
      .populate("course");
    res.json(lectures);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// add lecture
exports.addLecture = async (req, res) => {
  try {
    const { date, instructor, course } = req.body;

    // Checking is instructoir already assigned to a lecture on given date
    const existingLecture = await Lecture.findOne({ date, instructor });
    if (existingLecture) {
      return res
        .status(400)
        .json({
          message: "Instructor is already assigned to a lecture on this date",
        });
    }

    // Create and save the new lecture
    const newLecture = new Lecture({ date, instructor, course });
    await newLecture.save();
    res.status(201).json(newLecture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// update lecture
exports.updateLecture = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, instructor, course } = req.body;
    const updatedLecture = await Lecture.findByIdAndUpdate(
      id,
      { date, instructor, course },
      { new: true }
    )
      .populate("instructor")
      .populate("course");
    res.json(updatedLecture);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// delete lecture
exports.delLecture = async (req, res) => {
  try {
    const { id } = req.params;
    await Lecture.findByIdAndDelete(id);
    res.json({ message: "Lecture deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
