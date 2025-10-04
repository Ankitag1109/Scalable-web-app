// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // ESM import
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import taskRoutes from "./routes/tasks.js";
import errorHandler from "./middleware/errorHandler.js";

dotenv.config();

// Connect to MongoDB
connectDB(process.env.MONGO_URI);

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Error handling middleware (must come after routes)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
