import mongoose from "mongoose";
import config from "./config.js";

export const connectDB = async () => {
  try {
    const dbUri = `mongodb+srv://${config.dbUsername}:${config.dbPassword}@cluster00.7ud3nyu.mongodb.net/?appName=Cluster00`;
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
