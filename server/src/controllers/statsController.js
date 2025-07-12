import pool from "../config/db.js";

export const getStatistics = async (req, res) => {
  try {
    const totalRequests = await pool.query("SELECT COUNT(*) FROM requests");
    const availableEquipment = await pool.query(
      "SELECT COUNT(*) FROM equipments WHERE status = 'available'"
    );
    const approvedRequests = await pool.query(
      "SELECT COUNT(*) FROM requests WHERE status='approved'"
    );
    const pendingApprovals = await pool.query(
      "SELECT COUNT(*) FROM requests WHERE status='pending'"
    );

    res.status(200).json({
      success: true,
      totalRequests: parseInt(totalRequests.rows[0].count),
      availableEquipment: parseInt(availableEquipment.rows[0].count),
      approvedRequests: parseInt(approvedRequests.rows[0].count),
      pendingApprovals: parseInt(pendingApprovals.rows[0].count),
    });
  } catch (error) {
    console.log("Error in getAllEquipment Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
