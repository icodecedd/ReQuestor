import express from "express";
import {
  getCurrentUser,
  forgotPassword,
  login,
  logout,
  refreshToken,
  register,
  resendVerification,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { checkMaintenance } from "../middleware/checkMaintenance.js";

const router = express.Router();

router.get("/me", verifyToken, checkMaintenance, getCurrentUser);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/refresh-token", refreshToken);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

export default router;
