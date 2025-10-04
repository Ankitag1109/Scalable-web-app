import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { setToken } from "../utils/auth";
import { ThemeContext } from "../context/ThemeContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", { email, password });
      setUser(res.data);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div
      className={`flex flex-col justify-center items-center min-h-screen transition-colors duration-500 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded shadow w-96 transition-colors duration-500 ${
          darkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-2xl mb-4 font-bold text-center">Login</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
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
          Login
        </button>
        <p className="mt-2 text-center">
          Don't have an account?{" "}
          <Link
            to="/register"
            className={`font-semibold transition-colors duration-500 ${
              darkMode
                ? "text-yellow-300 hover:text-yellow-400"
                : "text-blue-600 hover:text-blue-700"
            }`}
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
