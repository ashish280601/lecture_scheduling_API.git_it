// creating a server using express
const express = require("express");
const connectDB = require("./config/dbConfig");
const cors = require("cors")
;require("dotenv").config();
const app = express();

// Importing Routes lecture scheduling routes
const instructorRoutes = require("./router/instructor.router");
const courseRoutes = require("./router/course.router")
const lectureRoutes = require("./router/lecture.router");

// importing authentication routes
// const adminAuthRoutes = require("./router/authentication/adminAuth.router");
// const instructorAuthRoutes = require("./router/authentication/instructorAuth.router");
// const protectedAdminRoutes = require("./router/authentication/protectedAdmin.router");
const authRoutes = require('./router/authentication/auth.router');

// middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.set("port", process.env.port || 3000);

// app.use("/api/admin", adminAuthRoutes);
// app.use("/api/instructor", instructorAuthRoutes);
// app.use("/api/admin/protected", protectedAdminRoutes);
app.use("/api", authRoutes);
app.use("/api", instructorRoutes);
app.use("/api", courseRoutes);
app.use("/api", lectureRoutes);

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
