// backend/controllers/taskController.js
import Task from "../models/Task.js"; // ✅ .js extension for ES Modules

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = new Task({
      user: req.user.id,
      title,
      description,
      status,
      dueDate,
    });
    await task.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get all tasks for the user
export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Update a task by ID
export const updateTask = async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: { title, description, status, dueDate } },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Delete a task by ID
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
