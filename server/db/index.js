import  mongoose from'mongoose';
import dotenv from 'dotenv';
dotenv.config();
const uri = process.env.MONGODB_URI; // Replace with your MongoDB URI (e.g., MongoDB Atlas URI)


export const connectToMongoDb=()=> {
    mongoose.connect(uri).then(() => console.log("Connected to MongoDB"));
  }
  