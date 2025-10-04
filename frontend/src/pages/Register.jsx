import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { setToken } from "../utils/auth";
import { useThemeContext } from "../context/ThemeContext"; // use inside component

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useThemeContext(); // ✅ inside component

  useEffect(() => {
    document.body.className = darkMode
      ? "bg-gray-900 text-gray-100"
      : "bg-gray-100 text-gray-900";
  }, [darkMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        username: name,
        email,
        password,
      });
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen transition-colors duration-500">
      {/* Dark/Light Mode Toggle */}
      <div className="absolute top-4 right-4"></div>

      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded shadow w-96 transition-colors duration-500 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Register</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Name"
          className={`border p-2 w-full mb-2 rounded transition-colors duration-500 ${
            darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
          }`}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className={`border p-2 w-full mb-2 rounded transition-colors duration-500 ${
            darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
          }`}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className={`border p-2 w-full mb-4 rounded transition-colors duration-500 ${
            darkMode ? "bg-gray-700 border-gray-600 text-gray-100" : ""
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          className={`w-full py-2 rounded font-semibold transition-colors duration-500 ${
            darkMode
              ? "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          Register
        </button>
        <p className="mt-2 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className={`font-semibold transition-colors duration-500 ${
              darkMode
                ? "text-yellow-300 hover:text-yellow-400"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
