const mongoose = require("mongoose");

const uri =
  "mongodb+srv://AdityaGoswami03:Aditya%4003@cluster0.3qndeud.mongodb.net/mydb?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Atlas connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
