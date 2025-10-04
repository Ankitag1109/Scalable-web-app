import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext); // ✅ use ThemeContext
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  // Fetch all tasks
  const fetchTasks = async () => {
    try {
      if (!user?.token) return;
      const res = await axios.get("/tasks", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to load tasks.");
    }
  };

  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  // Add Task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      if (!user?.token) return;
      const res = await axios.post(
        "/tasks",
        { title, description },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks((prev) => [...prev, res.data]);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to add task.");
    }
  };

  // Delete Task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setTasks((prev) => prev.filter((task) => task._id !== id));
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to delete task.");
    }
  };

  // Edit Task
  const handleEdit = async (task) => {
    const newTitle = prompt("Edit Title", task.title);
    const newDescription = prompt("Edit Description", task.description);
    if (!newTitle || !newDescription) return;

    try {
      const res = await axios.put(
        `/tasks/${task._id}`,
        { title: newTitle, description: newDescription },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to edit task.");
    }
  };

  // Toggle Status
  const handleToggleStatus = async (task) => {
    const newStatus = task.status === "completed" ? "pending" : "completed";
    try {
      const res = await axios.put(
        `/tasks/${task._id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setTasks((prev) => prev.map((t) => (t._id === task._id ? res.data : t)));
    } catch (err) {
      console.error(err);
      setError("⚠️ Failed to update status.");
    }
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold mb-2">📋 Dashboard</h1>
        <p
          className={`transition-colors duration-500 ${
            darkMode ? "text-gray-300" : "text-gray-600"
          }`}
        >
          Manage your tasks efficiently with TaskApp.
        </p>
      </div>

      {/* Add Task Form */}
      <form
        onSubmit={handleAddTask}
        className={`flex flex-col md:flex-row gap-4 items-center justify-center shadow-lg p-6 rounded-xl mb-10 max-w-4xl mx-auto transition-colors duration-500 ${
          darkMode
            ? "bg-gray-800/80 backdrop-blur-md"
            : "bg-white/70 backdrop-blur-md"
        }`}
      >
        <input
          type="text"
          placeholder="Task Title"
          className={`border rounded-lg px-4 py-2 flex-1 outline-none focus:ring-2 transition-colors duration-500 ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-yellow-400"
              : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-400"
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Task Description"
          className={`border rounded-lg px-4 py-2 flex-1 outline-none focus:ring-2 transition-colors duration-500 ${
            darkMode
              ? "border-gray-600 bg-gray-700 text-gray-100 focus:ring-yellow-400"
              : "border-gray-300 bg-white text-gray-900 focus:ring-indigo-400"
          }`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button
          className={`font-semibold px-6 py-2 rounded-lg shadow-md transition-colors duration-500 ${
            darkMode
              ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          ➕ Add Task
        </button>
      </form>

      {/* Error Message */}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      {/* Task List */}
      <div className="max-w-5xl mx-auto space-y-4">
        {tasks.length === 0 ? (
          <p
            className={`text-center italic ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            No tasks available. Start by adding one!
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onToggleStatus={handleToggleStatus}
              darkMode={darkMode} // Pass darkMode to TaskCard
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
