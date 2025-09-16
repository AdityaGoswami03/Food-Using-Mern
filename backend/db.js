import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.db_url;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB Atlas connected");

    // Access the correct DB and collection
    const db = mongoose.connection.useDb("foodDB");
    const collection = db.collection("item"); // 👈 make sure it's "items"

    // Fetch data
    const data = await collection.find({}).toArray();
    console.log("📦 Data fetched from Atlas:", data);

  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

export default connectDB;
