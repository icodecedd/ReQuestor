import jwt from "jsonwebtoken";
import pool from "../config/dbConfig.js";

// Access token expiry in seconds
let ACCESS_TOKEN_EXPIRY = 15; // 15 minutes

export const generateTokensAndCookies = async (res, userId) => {
  if (!userId) throw new Error("User ID is required");

  // Get settings from DB (using your existing query)
  const settings = await pool.query(
    "SELECT session_timeout FROM settings WHERE id = 1"
  );
  const sessionTimeoutMinutes = settings.rows[0]?.session_timeout || 120; // Default 2hrs
  const accessTokenExpiry = Math.floor(sessionTimeoutMinutes / 4);
  ACCESS_TOKEN_EXPIRY = accessTokenExpiry; // Update global constant

  // Generate tokens
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: `${accessTokenExpiry}m` } // Short-lived (matches your interceptor logic)
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: `${sessionTimeoutMinutes}m` } // Matches configured session timeout
  );

  // Set cookies
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: accessTokenExpiry * 60 * 1000, // Matches access token
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: sessionTimeoutMinutes * 60 * 1000, // Matches refresh token
  });

  return { accessToken, refreshToken };
};

export const generateAccessTokenOnly = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: `${ACCESS_TOKEN_EXPIRY}m`,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: ACCESS_TOKEN_EXPIRY * 60 * 1000,
  });

  return accessToken;
};

export const generateVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_VERIFICATION_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

export const generateResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.RESET_PASSWORD_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
