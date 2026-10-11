import mongoose from "mongoose";

let connectionPromise;

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not configured.");
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (!connectionPromise || mongoose.connection.readyState === 0) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 10000 })
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  await connectionPromise;
  console.log("✅ MongoDB Connected Successfully");
  return mongoose.connection;
};

export default connectDB;