import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log(' MongoDB Connected');
  } catch (error) {
    console.log(' MongoDB Connection Error:', error);
      
  }
};

export default connectDB;
