import mongoose from "mongoose";

export const connectToDatabase = async (dbUri: string): Promise<void> => {
  try {
    await mongoose.connect(dbUri);
    console.log("Connected to MongoDB");
  } catch (error: any) {
    console.error("Error connecting to MongoDB", error.message);
  }
};
