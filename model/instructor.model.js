const { Schema, model } = require("mongoose");

const InstructorSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
    } 
})

module.exports = model("Instructor", InstructorSchema);