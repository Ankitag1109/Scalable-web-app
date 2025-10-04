import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  const { darkMode } = useContext(ThemeContext); // ✅ access global theme

  return (
    <div
      className={`border p-4 rounded shadow mb-3 flex justify-between items-center transition-colors duration-500 ${
        darkMode
          ? "bg-gray-800 border-gray-700 text-gray-100"
          : "bg-white border-gray-300 text-gray-900"
      }`}
    >
      <div>
        <h3
          className={`font-bold ${
            task.status === "completed" ? "line-through" : ""
          }`}
        >
          {task.title}
        </h3>
        <p>{task.description}</p>
        <p>Status: {task.status || "pending"}</p>
        <p>
          Due:{" "}
          {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
        </p>
      </div>

      <div className="flex flex-col space-y-2 ml-4">
        <button
          onClick={() => onToggleStatus(task)}
          className={`px-2 py-1 rounded transition-colors duration-300 ${
            task.status === "completed"
              ? darkMode
                ? "bg-gray-600 text-gray-200 hover:bg-gray-500"
                : "bg-gray-400 text-gray-900 hover:bg-gray-500"
              : darkMode
              ? "bg-blue-600 text-white hover:bg-blue-500"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {task.status === "completed" ? "Mark Pending" : "Mark Completed"}
        </button>

        <button
          onClick={() => onEdit(task)}
          className={`px-2 py-1 rounded transition-colors duration-300 ${
            darkMode
              ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
              : "bg-yellow-500 text-white hover:bg-yellow-400"
          }`}
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(task._id)}
          className={`px-2 py-1 rounded transition-colors duration-300 ${
            darkMode
              ? "bg-red-600 text-white hover:bg-red-500"
              : "bg-red-500 text-white hover:bg-red-600"
          }`}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
