const {Schema, model} = require("mongoose");

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    lectures: [
        {
            type: Schema.Types.ObjectId,
            ref: "Lecture"
        }
    ]
});

module.exports = model("Course", courseSchema);