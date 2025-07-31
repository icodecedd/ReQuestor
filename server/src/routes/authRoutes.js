import express from "express";
import {forgotPassword, login, logout, register, resetPassword, verifyEmail} from "../controllers/authController.js";

const router = express.Router();

router.get("/verify-email/:token", verifyEmail)
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:resetToken", resetPassword);

export default router;