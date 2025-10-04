import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { SunIcon, MoonIcon, Search } from "lucide-react";

const Navbar = ({ onSearch }) => {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`flex flex-col md:flex-row md:items-center md:justify-between px-6 py-3 shadow-md transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="flex items-center gap-4 mb-2 md:mb-0">
        <Link to="/" className="font-bold text-xl">
          ⚡ TaskApp
        </Link>
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-blue-500">
              Dashboard
            </Link>
            <Link to="/profile" className="hover:text-blue-500">
              Profile
            </Link>
            {user.role === "admin" && (
              <Link to="/admin" className="hover:text-blue-500">
                Admin
              </Link>
            )}
          </>
        )}
      </div>

      {user && (
        <div className="relative mb-2 md:mb-0">
          <input
            type="text"
            placeholder="Search tasks..."
            onChange={(e) => onSearch(e.target.value)}
            className={`px-4 py-1 rounded-full border outline-none transition-colors duration-300 w-full md:w-64 ${
              darkMode
                ? "bg-gray-800 border-gray-600 text-white"
                : "bg-gray-100 border-gray-300 text-gray-800"
            }`}
          />
          <Search className="absolute right-3 top-2 w-4 h-4 text-gray-400" />
        </div>
      )}

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-colors duration-300 ${
            darkMode ? "hover:bg-gray-700" : "hover:bg-gray-200"
          }`}
        >
          {darkMode ? (
            <SunIcon className="w-5 h-5" />
          ) : (
            <MoonIcon className="w-5 h-5" />
          )}
        </button>

        {user ? (
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
