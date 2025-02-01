import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Ensure this is set in your .env

    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined");
    }

    // Connect to MongoDB without deprecated options
    await mongoose.connect(mongoURI);

    console.log("MongoDB connected successfully!");
  } catch (error : any) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
