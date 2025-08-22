import express from "express";
import {
  addUser,
  changeUserInfo,
  changeUserPassword,
  deleteUser,
  getAllUsers,
  resetUserPassword,
  toggleUserStatus,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * Important: Order matters
 * - Specific routes (like /check-username) must come before dynamic routes (/:id)
 */

// Get all users
router.get("/", getAllUsers);

// Create a new user
router.post("/", addUser);

// Update user by ID
router.put("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

// Toggle user status (activate/deactivate)
router.patch("/:id/set-status", toggleUserStatus);

// Reset user password manually
router.patch("/:id/set-password", resetUserPassword);

// Change user info (only name and bio)
router.patch("/:id/change-info", changeUserInfo);

// Change user password
router.patch("/:id/change-password", changeUserPassword);

export default router;
