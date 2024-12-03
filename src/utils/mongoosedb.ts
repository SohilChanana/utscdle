import mongoose from "mongoose";
const uri = process.env.MONGODB_URI;
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(uri as string);
    if (connection.readyState === 1) {
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};
