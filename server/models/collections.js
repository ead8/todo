import mongoose from "mongoose";
const Schema = mongoose.Schema;

const collectionSchema = new Schema(
  {
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User model
    name: { type: String, required: true }, // Name of the collection (e.g., "Work", "Personal")
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }], // Array of task references
    isFavorite: { type: Boolean, default: false },
    icon: { type: String, default: "📋" }, // Emoji icon for the collection
  },
  {
    timestamps: true, // Created at and updated at timestamps
  }
);

const Collection = mongoose.model("Collection", collectionSchema);
export default Collection;