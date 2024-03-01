// creating a server using express
const express = require("express");
const connectDB = require("./config/dbConfig");
require("dotenv").config();
const app = express();

// Importing Routes
const instructorRoutes = require("./router/instructor.router");

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("port", process.env.port || 3000);

app.use("/api", instructorRoutes);

(async () => {
  try {
    await connectDB();
    app.listen(app.get("port"), () => {
      console.log(`Server is Listening on port ${app.get("port")}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
