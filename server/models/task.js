import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the task schema
const taskSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    title: { type: String, required: true },
    completed: { type: Boolean, default: false },
    parent_id: { type: Schema.Types.ObjectId, ref: "Task", default: null }, // Reference to parent task (null for top-level tasks)
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true, // Created at and updated at timestamps
  }
);

// Check if the model already exists before defining it
const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default Task;