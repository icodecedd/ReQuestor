import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  logout,
  refreshToken,
  register,
  resendVerification,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/me", verifyToken, checkAuth);
router.get("/verify-email/:token", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/refresh-token", refreshToken);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

export default router;
