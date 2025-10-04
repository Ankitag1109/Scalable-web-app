// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// // Middleware to protect routes (only logged-in users)
// export const protect = async (req, res, next) => {
//   let token;

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       // Attach user to request, excluding password
//       // Adjusted to match JWT payload
//       req.user = await User.findById(decoded.id).select("-password");

//       next();
//     } catch (error) {
//       console.error(error);
//       return res.status(401).json({ message: "Not authorized, token failed" });
//     }
//   } else {
//     return res.status(401).json({ message: "No token provided" });
//   }
// };

// // Middleware to allow only admin users
// export const admin = (req, res, next) => {
//   if (req.user && req.user.role === "admin") {
//     next();
//   } else {
//     res.status(403).json({ message: "Admin only" });
//   }
// };
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect routes
export const protect = async (req, res, next) => {
  let token;

  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1].trim();

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findById(decoded.id).select("-password");

      if (!user) return res.status(401).json({ message: "User not found" });

      req.user = user;
      next();
    } else {
      return res.status(401).json({ message: "No token provided" });
    }
  } catch (error) {
    console.error("Auth middleware error:", error);
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Token expired, please login again" });
    }
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Admin middleware
export const admin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: "Not authorized" });
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin access only" });
  next();
};
