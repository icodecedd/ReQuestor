import jwt from "jsonwebtoken";
import pool from "../config/dbConfig.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    console.log("No access token provided.");
    return res
      .status(401)
      .json({ success: false, message: "Not authenticated." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Access token expired" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    console.error("Error in verifyToken: ", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const handleFailedLogin = async (email) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Get current attempt count
    const {
      rows: [user],
    } = await client.query(
      `UPDATE users
       SET login_attempts = login_attempts + 1,
           last_failed_attempt = NOW()
       WHERE email = $1
       RETURNING login_attempts, account_locked`,
      [email]
    );

    // Lock account if exceeds max attempts
    const {
      rows: [settings],
    } = await client.query("SELECT max_login FROM settings WHERE id = 1");

    if (user.login_attempts >= settings.max_login && !user.account_locked) {
      await client.query(
        "UPDATE users SET account_locked = true WHERE email = $1",
        [email]
      );
    }

    await client.query("COMMIT");
    const remainingAttempts = settings.max_login - user.login_attempts;
    return { attempts: remainingAttempts };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const resetLoginAttempts = async (userId) => {
  await pool.query(
    "UPDATE users SET login_attempts = 0, account_locked = false WHERE id = $1",
    [userId]
  );
};
