import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  resetUserPasswordManual,
  toggleUserStatus,
  updateUser,
  checkUsernameAvailability,
} from "../controllers/userController.js";

const router = express.Router();

/**
 * Important: Order matters
 * - Specific routes (like /check-username) must come before dynamic routes (/:id)
 */

// Username availability check (specific route first)
router.get("/check-username", checkUsernameAvailability);

// Get all users
router.get("/", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Create a new user
router.post("/", addUser);

// Update user by ID
router.put("/:id", updateUser);

// Delete user by ID
router.delete("/:id", deleteUser);

// Toggle user status (activate/deactivate)
router.patch("/:id/set-status", toggleUserStatus);

// Reset user password manually
router.patch("/:id/set-password", resetUserPasswordManual);

export default router;
