import pool from "../config/dbConfig.js";

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
      pool.query("SELECT COUNT(*) FROM requests WHERE status = 'Reserved'"),
      pool.query("SELECT COUNT(*) FROM requests WHERE status = 'Pending'"),
    ]);

    const lineGraphStats = await pool.query(`
      SELECT
      TO_CHAR(DATE_TRUNC('month', created_at), 'Mon') AS month,
      COUNT(*) FILTER (WHERE status = 'Reserved') AS approved,
      COUNT(*) FILTER (WHERE status = 'Rejected') AS rejected,
      COUNT(*) FILTER (WHERE status = 'Cancelled') AS cancelled
      FROM requests
      WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
      GROUP BY DATE_TRUNC('month', created_at)
      ORDER BY DATE_TRUNC('month', created_at) ASC;

    `);

    const pieGraphStats = await pool.query(`
      SELECT
      type,
      COUNT(*) AS count
      FROM equipments
      GROUP BY type
      ORDER BY type;
    `);

    const lineGraph = lineGraphStats.rows.map((row) => ({
      month: row.month.trim(),
      approved: parseInt(row.approved),
      rejected: parseInt(row.rejected),
      cancelled: parseInt(row.cancelled),
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
      lineGraph,
      pieGraph,
    });
  } catch (error) {
    console.log("Error in getDashbordStatistics Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
