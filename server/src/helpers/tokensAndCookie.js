import jwt from "jsonwebtoken";

// Access token expiry in seconds
const ACCESS_TOKEN_EXPIRY = 20; // 20 seconds for testing
// Refresh token expiry in days
const REFRESH_TOKEN_EXPIRY_DAYS = 1;

export const generateTokensAndCookies = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: `${ACCESS_TOKEN_EXPIRY}s`,
  });

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: `${REFRESH_TOKEN_EXPIRY_DAYS}d`,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ACCESS_TOKEN_EXPIRY * 1000, // match token life
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000, // in ms
  });

  return { accessToken, refreshToken };
};

export const generateAccessTokenOnly = (res, userId) => {
  const accessToken = jwt.sign({ userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: `${ACCESS_TOKEN_EXPIRY}s`,
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: ACCESS_TOKEN_EXPIRY * 1000,
  });

  return accessToken;
};

export const generateVerificationToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });
};

export const generateResetToken = (userId) => {
  return jwt.sign({ userId }, process.env.RESET_PASSWORD_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};
