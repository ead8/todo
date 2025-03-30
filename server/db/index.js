import  mongoose from'mongoose';
const uri = 'mongodb://localhost:27017/todo_app'; // Replace with your MongoDB URI (e.g., MongoDB Atlas URI)


export const connectToMongoDb=()=> {
    mongoose.connect(uri).then(() => console.log("Connected to MongoDB"));
  }
  