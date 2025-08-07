import jwt from "jsonwebtoken";

export const generateTokenAndCookie = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, {
    httpOnly: true, // only accessible from the server
    secure: process.env.NODE_ENV === "production", // only sent over https
    sameSite: "strict", // only sent over https
    maxAge: 1000 * 60 * 60 * 2, // 2 hours
  });

  return token;
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
