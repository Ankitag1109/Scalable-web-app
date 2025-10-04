import { useContext } from "react";
import { Link } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { ThemeContext } from "../context/ThemeContext";

export default function Home() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <div
      className={`flex flex-col min-h-screen transition-colors duration-500 ${
        darkMode
          ? "bg-gray-900 text-gray-100"
          : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
      }`}
    >
      {/* Dark/Light Mode Toggle */}
      <div className="flex justify-end p-4"></div>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center px-4 text-center py-12 h-[90vh]">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-bounce">
          ⚡ TaskApp - Boost Your Productivity
        </h1>
        <p
          className={`text-lg md:text-xl mb-10 max-w-xl transition-colors duration-500 ${
            darkMode ? "text-gray-300" : ""
          }`}
        >
          Organize, track, and accomplish your tasks seamlessly. Manage personal
          and team tasks efficiently with TaskApp — your ultimate task
          companion.
        </p>
        <div className="flex flex-col sm:flex-row gap-6">
          <Link
            to="/register"
            className={`px-8 py-4 rounded-lg font-semibold shadow-lg transform transition duration-300 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-white text-indigo-600 hover:scale-105"
            }`}
          >
            Get Started
          </Link>
          <Link
            to="/learn-more"
            className={`px-8 py-4 rounded-lg font-semibold transform transition duration-300 border ${
              darkMode
                ? "border-gray-500 text-gray-100 hover:bg-gray-700"
                : "border-white text-white hover:bg-white hover:text-indigo-600"
            }`}
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section
        className={`py-20 transition-colors duration-500 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div
            className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <CheckCircleIcon className="w-16 h-16 mx-auto text-indigo-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Task Management</h3>
            <p>
              Easily create, update, and delete tasks. Track your progress
              efficiently.
            </p>
          </div>
          <div
            className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <CheckCircleIcon className="w-16 h-16 mx-auto text-purple-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Real-time Dashboard</h3>
            <p>
              Visualize your tasks and progress with an intuitive, real-time
              dashboard.
            </p>
          </div>
          <div
            className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <CheckCircleIcon className="w-16 h-16 mx-auto text-pink-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Secure Authentication</h3>
            <p>
              Sign up and log in safely. Keep your data private and secure at
              all times.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        className={`py-20 px-6 text-center transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-gray-100" : "text-white"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-16">
          How TaskApp Works
        </h2>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
          <div
            className={`p-10 rounded-lg shadow-lg hover:scale-105 transition transform duration-300 ${
              darkMode ? "bg-gray-800" : "bg-black/30"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">1. Register</h3>
            <p>
              Create an account quickly and securely to start managing tasks.
            </p>
          </div>
          <div
            className={`p-10 rounded-lg shadow-lg hover:scale-105 transition transform duration-300 ${
              darkMode ? "bg-gray-800" : "bg-black/30"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">2. Add Tasks</h3>
            <p>Create tasks, set deadlines, and prioritize your workflow.</p>
          </div>
          <div
            className={`p-10 rounded-lg shadow-lg hover:scale-105 transition transform duration-300 ${
              darkMode ? "bg-gray-800" : "bg-black/30"
            }`}
          >
            <h3 className="text-2xl font-bold mb-4">3. Track Progress</h3>
            <p>
              Monitor completed tasks, due dates, and stay on top of your goals.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className={`py-20 transition-colors duration-500 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-800"
        }`}
      >
        <h2 className="text-4xl md:text-5xl text-center font-bold mb-16">
          What Users Say
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 px-6">
          <div
            className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <p className="mb-4">
              "TaskApp transformed the way I manage my day-to-day tasks. Highly
              recommended!"
            </p>
            <h4 className="font-bold">- Priya S.</h4>
          </div>
          <div
            className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <p className="mb-4">
              "Intuitive, fast, and secure. Perfect for team task management."
            </p>
            <h4 className="font-bold">- Rahul K.</h4>
          </div>
          <div
            className={`p-8 rounded-lg shadow-lg hover:shadow-xl transition ${
              darkMode ? "bg-gray-700" : "bg-white"
            }`}
          >
            <p className="mb-4">
              "I love the dashboard and how easy it is to track progress."
            </p>
            <h4 className="font-bold">- Anjali M.</h4>
          </div>
        </div>
      </section>

      <section
        className={`flex items-center justify-center py-16 px-6 transition-colors duration-500 ${
          darkMode
            ? "bg-gray-900"
            : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
        }`}
      >
        <div
          className={`w-full max-w-md p-8 rounded-2xl shadow-2xl text-center transition-all duration-500 ${
            darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
          }`}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Organize Your Tasks?
          </h2>
          <p className="mb-6 text-base text-gray-600 dark:text-black-300">
            Join TaskApp today and start achieving your goals effortlessly!
          </p>
          <Link
            to="/register"
            className={`px-6 py-2.5 rounded-lg font-semibold shadow-md transition-transform duration-300 ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105"
            }`}
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`p-6 text-center transition-colors duration-500 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-black/30 text-white"
        }`}
      >
        © {new Date().getFullYear()} TaskApp. All rights reserved.
      </footer>
    </div>
  );
}
