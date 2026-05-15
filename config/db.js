import mongoose from "mongoose";
import { config } from "./config.js";

export const connectDB = async () => {
  try {
    const dbUri = config.dbUri || undefined;
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
