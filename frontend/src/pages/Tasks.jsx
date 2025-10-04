import { useEffect, useState } from "react";
import axios from "../api/axios";
import TaskCard from "../components/TaskCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    };
    fetchTasks();
  }, []);

  // Filtering
  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="p-6 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">📝 Manage Tasks</h1>

      {/* Search */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Task List */}
      <div className="grid gap-4">
        {currentTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
