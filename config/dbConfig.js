const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async(mongoURI = process.env.MongoDB_URI) => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Failed to connect to the database:", error);
        throw error;
    }
}

module.exports = connectDB;