import pool from "../config/dbConfig.js";

export const checkMaintenance = async (req, res, next) => {
  try {
    // get only what we need from the settings table
    const result = await pool.query(
      `SELECT maintenance, grace_start_at, grace_period FROM settings WHERE id = 1`
    );

    const settings = result.rows[0];

    // If maintenance is OFF → allow request
    if (!settings.maintenance) {
      return next();
    }

    // If user IS admin → allow request even if maintenance is active
    if (req.user && req.user.is_admin) {
      return next();
    }

    // ********** Grace Period Enforcement with UTC+8 offset **********

    // If either field is missing, treat it as "grace already expired"
    if (!settings.grace_start_at || !settings.grace_period) {
      return res.status(403).json({ message: "Maintenance in progress" });
    }

    // Database timestamps (like grace_start_at) are in UTC.
    // We convert to milliseconds and apply +8 hours for PH timezone.
    const startUtcMs = new Date(settings.grace_start_at).getTime();
    const startLocalMs = startUtcMs + 8 * 60 * 60 * 1000; // +8 hrs
    const deadline = startLocalMs + settings.grace_period * 60 * 1000;

    const nowLocalMs = Date.now(); // this is already in local time

    if (nowLocalMs > deadline) {
      // Grace period expired → block user
      return res.status(403).json({ message: "Maintenance in progress" });
    }

    // Grace period still active → allow temporarily
    return next();
  } catch (error) {
    console.error("Error in checkMaintenance middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
