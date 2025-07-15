import pool from "../config/db.js";

// GET all activities
export const getAllActivities = async (req, res) => {
  try {
    const activities = await pool.query(
      "SELECT * FROM activity_logs ORDER BY timestamp DESC"
    );
    res.status(200).json({ success: true, data: activities });
  } catch (error) {
    console.log("Error in getAllActivities Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET recent 5 activities (for dashboard)
export const getRecentActivities = async (req, res) => {
  try {
    const activity = await pool.query(
      "SELECT * FROM activity_logs ORDER BY timestamp DESC LIMIT 5"
    );
    res.status(200).json({ success: true, data: activity });
  } catch (error) {
    console.log("Error in getRecentActivities Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
