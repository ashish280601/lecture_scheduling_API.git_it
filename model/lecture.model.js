const { Schema, model } = require("mongoose");

const lectureSchema = new Schema({
    date: {
        type: Date,
        required: true
    },
    instructor: {
        type: Schema.Types.ObjectId,
        ref: "Instructor",
        required: true
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true
    }
});

// Preventing lecture should not clahes
lectureSchema.index({date:1 , instructor: 1}, { unique: true });

module.exports = model("Lecture", lectureSchema);