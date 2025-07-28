import pool from "../config/db.js";

// GET all requests
export const getAllRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT req.*,
         json_agg(json_build_object(
           'request_item_id', ri.id,
           'equipment_id', eq.id,
           'equipment_name', eq.name,
           'equipment_type', eq.type
         )) AS equipment_list
       FROM requests req
       LEFT JOIN request_items ri ON req.id = ri.request_id
       LEFT JOIN equipments eq ON ri.equipment_id = eq.id
       GROUP BY req.id
       ORDER BY req.created_at DESC`
    );

    res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error in getAllRequests Function:", error);

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
    console.error("Error in getRecentRequests Function", error);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
