// creating a server using express
import express from "express";

const app = express();
const port = 5000;

// middleware
app.use(express.urlencoded( { extended: true }));
app.use(express.json());



app.get("/", (req, res) => {
  return res.send("This is my first express server");
})(async () => {
  try {
    await app.listen(port, () => {
      console.log(`Server is listening on Port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
});
