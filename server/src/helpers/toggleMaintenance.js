import pool from "../config/dbConfig.js";

export const enableMaintenance = async () => {
  const result = await pool.query(
    "UPDATE settings SET maintenance = true WHERE id = 1 RETURNING *"
  );
  return {
    success: true,
    message: "Maintenance mode enabled",
    data: result.rows[0],
  };
};

export const disableMaintenance = async () => {
  const result = await pool.query(
    "UPDATE settings SET maintenance = false, maintenance_message = NULL, grace_period = NULL WHERE id = 1 RETURNING *"
  );
  return {
    success: true,
    message: "Maintenance mode disabled",
    data: result.rows[0],
  };
};
