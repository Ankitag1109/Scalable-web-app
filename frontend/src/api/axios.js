import axios from "axios";

// Use Vite environment variable
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:6500/api";

const instance = axios.create({
  baseURL: BASE_URL,
});

// Automatically add token if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
