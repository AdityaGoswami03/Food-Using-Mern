import express from "express";
import connectDB from "./db.js";   // 👈 note the .js extension when using ES modules

const app = express();
const port = 9090;

// connect to MongoDB
connectDB();

app.get("/", (req, res) => {
  res.send("this is response");
});

app.listen(port, () => {
  console.log(`✅ Example app listening on port ${port}`);
});
