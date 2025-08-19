import pool from "../config/dbConfig.js";

export const checkAuth = async (req, res, next) => {
  // Add 'next' parameter
  try {
    const result = await pool.query(
      "SELECT id, name, email, role, status, is_verified FROM users where id = $1",
      [req.userId]
    );

    const user = result.rows[0];

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    // Set user data on request object for use in routes
    req.user = user;

    // Continue to next middleware/route
    next(); // This was missing!
  } catch (error) {
    console.error("Error in checkAuth:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
