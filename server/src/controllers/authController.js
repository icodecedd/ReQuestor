import pool from "../config/db.js";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../helpers/password.js";
import {
  generateResetToken,
  generateTokenAndCookie,
  generateVerificationToken,
} from "../helpers/tokenAndCookie.js";
import {
  sendPasswordResetFromResend,
  sendResetSuccessFromResend,
  sendVerificationFromResend,
} from "../mailtrap/emailsResend.js";

export const checkAuth = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, student_number, email, role, status, is_verified FROM users where id = $1",
      [req.userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error in checkAuth:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const register = async (req, res) => {
  const { name, student_number, email, password } = req.body;

  if (!name || !student_number || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Name, student number, email, and password are required.",
    });
  }

  if (email.indexOf("@") === -1) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1 or student_number = $2",
      [email, student_number]
    );
    if (existingUser.rowCount > 0) {
      const user = existingUser.rows[0];

      if (!user.is_verified) {
        // Optionally generate a new token
        const newToken = generateTokenAndCookie(res, user.id);

        await sendVerificationFromResend(user.email, newToken);

        return res.status(400).json({
          success: false,
          message:
            "Email already registered but not verified. A new verification email has been sent.",
        });
      }

      return res.status(409).json({
        success: false,
        message: "User already in use.",
      });
    }

    // Hash the password
    const password_hash = await hashPassword(password);

    // Insert the new user into the database
    const result = await pool.query(
      `
            INSERT INTO users (name, student_number, email, password_hash) VALUES ($1, $2, $3, $4)
            RETURNING id, name, student_number, email, role, status, is_verified, created_at, last_login`,
      [name, student_number, email, password_hash]
    );

    const newUser = result.rows[0];

    // Generate a JWT token for the new user session
    const token = generateTokenAndCookie(res, newUser.id);

    // Send verification email
    await sendVerificationFromResend(email, token);

    return res.status(201).json({
      success: true,
      message: "Registration successful.",
      data: newUser,
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const resendVerification = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified.",
      });
    }

    // Generate new verification token (do not reuse session token)
    const verificationToken = generateVerificationToken(user.id);

    await sendVerificationFromResend(email, verificationToken);

    return res.status(200).json({
      success: true,
      message: "Verification email resent successfully.",
    });
  } catch (error) {
    console.error("Error in resendVerification:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const verifyEmail = async (req, res) => {
  const { token } = req.params;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Token is required.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decoded;

    const result = await pool.query(
      `
        UPDATE users
        SET status = 'Active'
        WHERE id = $1 RETURNING id, name, student_number, email, role, status, is_verified, created_at, last_login`,
      [userId]
    );

    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified.",
      });
    }

    await pool.query("UPDATE users SET is_verified = true WHERE id = $1", [
      userId,
    ]);

    return res.redirect(
      `${process.env.CLIENT_URL}/verification-success?email=${user.email}&verified=true`
    );
  } catch (error) {
    console.error("Error in verifyEmail:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        success: false,
        message: "Verification link expired. Please request a new one.",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  try {
    // Check if the user exists
    const result = await pool.query(
      `
            SELECT id, name, student_number, password_hash, email, role, status, is_verified, created_at, last_login
            FROM users WHERE email = $1`,
      [email]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = result.rows[0];

    // Check if the password is correct
    const match = await comparePassword(password, user.password_hash);
    if (!match) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    if (!user.is_verified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email before logging in.",
      });
    }

    // Generate a JWT token for the user session
    generateTokenAndCookie(res, user.id);

    await pool.query("UPDATE users SET last_login = NOW() WHERE id = $1", [
      user.id,
    ]);

    return res.status(200).json({
      success: true,
      message: "Login successfully.",
      data: {
        ...user,
        password_hash: undefined,
      },
    });
  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Email is required.",
    });
  }

  try {
    // Check if the user exists
    const result = await pool.query(
      `
            SELECT id, name, student_number, email, role, status, is_verified, created_at, last_login
            FROM users WHERE email = $1`,
      [email]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const user = result.rows[0];

    // Generate a JWT token for the user session
    const resetToken = generateResetToken(user.id);

    await sendPasswordResetFromResend(email, resetToken);

    return res.status(200).json({
      success: true,
      message: "Password reset link sent successfully.",
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const cleanToken = req.params.resetToken.trim(); // removes any trailing newline or space

  if (!cleanToken || !password) {
    return res.status(400).json({
      success: false,
      message: "Reset token and password are required.",
    });
  }

  try {
    const decodedToken = jwt.verify(
      cleanToken,
      process.env.RESET_PASSWORD_TOKEN_SECRET
    );
    const userId = decodedToken.userId;

    // Check if the user exists
    const existingUser = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (existingUser.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Hash password
    const password_hash = await hashPassword(password);

    const result = await pool.query(
      `UPDATE public.users
             SET password_hash = $1
             WHERE id = $2 RETURNING id, name, student_number, email, role, status, is_verified;`,
      [password_hash, userId]
    );

    const enrichedUser = result.rows[0];

    await sendResetSuccessFromResend(enrichedUser.email);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully.",
      data: enrichedUser,
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
