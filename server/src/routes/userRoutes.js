import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUserById,
  resetUserPasswordManual,
  toggleUserStatus,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.patch("/:id/status", toggleUserStatus);
router.patch("/:id/set-password", resetUserPasswordManual);

export default router;
