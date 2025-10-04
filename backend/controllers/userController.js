// // backend/controllers/userController.js
// import User from "../models/User.js";
// import bcrypt from "bcryptjs";

// // Get logged-in user profile
// export const getProfile = async (req, res) => {
//   res.json(req.user);
// };

// // Update profile
// export const updateProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);
//     if (user) {
//       user.name = req.body.name || user.name;
//       user.email = req.body.email || user.email;

//       // Hash password if updating
//       if (req.body.password) {
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(req.body.password, salt);
//       }

//       const updatedUser = await user.save();
//       res.json(updatedUser);
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🟢 Admin: fetch all users
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({});
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // 🟢 Admin: delete user
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (user) {
//       await user.deleteOne();
//       res.json({ message: "User deleted" });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
// backend/controllers/userController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";

// Get logged-in user profile
export const getProfile = async (req, res) => {
  res.json(req.user);
};

// Update profile
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      // Hash password if updating
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Change Password
export const changePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { oldPassword, newPassword } = req.body;

    // Validate old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    await user.save();
    res.json({ message: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Admin: fetch all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🟢 Admin: delete user
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json({ message: "User deleted" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
