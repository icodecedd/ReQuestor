import pool from "../config/db.js";

export const getDashbordStatistics = async (req, res) => {
  try {
    const [
      totalRequests,
      availableEquipment,
      approvedRequests,
      pendingApprovals,
    ] = await Promise.all([
      pool.query("SELECT COUNT(*) FROM requests"),
      pool.query("SELECT COUNT(*) FROM equipments WHERE status = 'Available'"),
      pool.query("SELECT COUNT(*) FROM requests WHERE status = 'Approved'"),
      pool.query("SELECT COUNT(*) FROM requests WHERE status = 'Pending'"),
    ]);

    const barGraphStats = await pool.query(`
      SELECT 
      TO_CHAR(requested_at, 'Mon') AS month,
      COUNT(*) FILTER (WHERE status = 'Approved') AS approved,
      COUNT(*) FILTER (WHERE status = 'Pending') AS pending
      FROM requests
      GROUP BY month, DATE_TRUNC('month', requested_at)
      ORDER BY DATE_TRUNC('month', requested_at) DESC
    `);

    const pieGraphStats = await pool.query(`
      SELECT 
      type,
      COUNT(*) AS count
      FROM equipments
      GROUP BY type
      ORDER BY type;
    `);

    const barGraph = barGraphStats.rows.map((row) => ({
      month: row.month.trim(),
      approved: parseInt(row.approved),
      pending: parseInt(row.pending),
    }));

    const pieGraph = pieGraphStats.rows.map((row) => ({
      name: row.type,
      value: row.count,
    }));

    res.status(200).json({
      success: true,
      totalRequests: parseInt(totalRequests.rows[0].count),
      availableEquipment: parseInt(availableEquipment.rows[0].count),
      approvedRequests: parseInt(approvedRequests.rows[0].count),
      pendingApprovals: parseInt(pendingApprovals.rows[0].count),
      barGraph,
      pieGraph,
    });
  } catch (error) {
    console.log("Error in getDashbordStatistics Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
