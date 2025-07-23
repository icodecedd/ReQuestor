import pool from "../config/db.js";

// GET all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await pool.query(
      "SELECT * FROM requests ORDER BY created_at DESC"
    );
    res.status(200).json({ success: true, data: requests.rows });
  } catch (error) {
    console.log("Error in getAllRequests Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET recent 5 requests (for dashboard)
export const getRecentRequests = async (req, res) => {
  try {
    const request = await pool.query(
      "SELECT * FROM requests ORDER BY created_at DESC LIMIT 5"
    );
    res.status(200).json({ success: true, data: request.rows });
  } catch (error) {
    console.log("Error in getRecentRequests Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
