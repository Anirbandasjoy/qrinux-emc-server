import mongoose from "mongoose";
import { dbURL, p_dbURL } from "../helper/secret";

if (!dbURL) {
  throw new Error(
    "Database URL (dbURL) is not defined in the environment variables."
  );
}

const dbConnection = async () => {
  try {
    await mongoose.connect(dbURL as string);
    console.log("Database is connected successfully");

    mongoose.connection.on("error", (error: any) => {
      console.error("Database connection error", error.message);
    });
  } catch (error: any) {
    console.error("Initial database connection error", error.message);
  }
};

export default dbConnection;
