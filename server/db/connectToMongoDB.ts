import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors/safe";

dotenv.config();

const mongoDbUri: string = process.env.MONGO_DB_URI || "";

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(mongoDbUri);
    console.log(colors.bgGreen(" Conected to MONGODB "));
  } catch (error) {
    console.log(colors.red("Error connecting to MongoDB"));
  }
};

export default connectToMongoDB;
