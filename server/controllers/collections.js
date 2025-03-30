
import Collection from "../models/collections.js";
import Task from "../models/task.js";

// Get all collections for the authenticated user
export const getCollections = async (req, res) => {
  try {
    const collections = await Collection.find({ user_id: req.user.id })
      .populate(
        "tasks",
        "title completed date parent_id user_id subTasks createdAt updatedAt"
      )
      .sort({ createdAt: -1 });
      

    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new collection
export const createCollection = async (req, res) => {
  const { name, isFavorite, icon } = req.body;

  try {
    const collection = new Collection({
      user_id: req.user.id,
      name,
      tasks: [],
      isFavorite,
      icon,
    });

    await collection.save();
    res.status(201).json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single collection by ID
export const getSingleCollection = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id) return res.status(400).json({ error: "Collection id is required" });
    const collection = await Collection.findOne({
      _id: id,
      user_id: req.user.id,
    }).populate("tasks")

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    res.status(200).json(collection);

}
catch (error) {
    console.error("Error fetching collection:", error);
    res.status(500).json({ message: "Error fetching collection", error });
}
}
// Update a collection (e.g., rename it)
export const updateCollection = async (req, res) => {
  const { name, isFavorite } = req.body;

  try {
    const collection = await Collection.findOneAndUpdate(
      { _id: req.params.id, user_id: req.user.id },
      { name, isFavorite, updatedAt: Date.now() },
      { new: true }
    ).populate("tasks");

    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a collection and optionally its tasks
export const deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!collection) {
      return res.status(404).json({ error: "Collection not found" });
    }

    // Optionally delete all tasks in the collection
    await Task.deleteMany({ collection_id: collection._id });

    // Delete the collection
    await Collection.deleteOne({ _id: req.params.id, user_id: req.user.id });

    res.status(200).json({ message: "Collection and its tasks deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a new task to a collection
export const createTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, parentId,date } = req.body;

    if (!title.trim())
      return res.status(400).json({ error: "Title is required" });
    const collection = await Collection.findOne({
      _id: id,
      user_id: req.user.id,
      
    });
    if (!collection) {
      return res
        .status(404)
        .json({ error: "Collection not found or not authorized" });
    }

    // Create the new task
    const newTask = new Task({
      title,
      user_id: req.user.id,
      parent_id: parentId || null,
      subTasks: [],
      completed: false,
      date: date || Date.now(),
    });
    await newTask.save();

    collection.tasks.push(newTask._id);
    await collection.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.log("adding tasks to collection", error);
    res.status(500).json({ error: "Error adding task" });
  }
};
// Update a task
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, completed } = req.body;
    console.log("title", title);
    console.log("completed", completed);
    // Validate input

    if (!taskId) return res.status(400).json({ error: "Task id is required" });
    if (!title) return res.status(400).json({ error: "Title is required" });
    // Check if the task exists and belongs to the user

    const task = await Task.findOneAndUpdate(
      { _id: taskId, user_id: req.user.id },
      { title, completed },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
console.log("task", task);
    res.status(200).json(task);
  } catch (error) {
    console.log("updating task", error);
    res.status(500).json({ error: "Error updating task" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { taskId, collectionId } = req.params;
    if (!taskId || !collectionId)
      return res.status(400).json({ error: "Task id is required" });
    // Check if the task exists and belongs to the user
    const task = await Task.findOneAndDelete({
      _id: taskId,
      user_id: req.user.id,
    });
    const collection = await Collection.findOne({
      _id: collectionId,
      user_id: req.user.id,
    });
    if (!task || !collection) {
      return res.status(404).json({ error: "Task or Collection not found" });
    }

    // Remove subtasks that are children of the deleted task
    // Find all subtasks of the task to be deleted
    const subtasks = await Task.find({ parent_id: taskId });

    if (subtasks.length > 0) {
      // Delete all subtasks
      await Task.deleteMany({ parent_id: taskId });
    }
    // Remove the task from the collection
    await Collection.findByIdAndUpdate(collectionId, {
      $pull: { tasks: task._id },
    });
    // Delete the main task
    await Task.findByIdAndDelete(taskId);

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.log("deleting task", error);
    res.status(500).json({ error: "Error deleting task" });
  }
};
