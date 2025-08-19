import pool from "../config/dbConfig.js";
import { disableMaintenance } from "../helpers/toggleMaintenance.js";

export const checkMaintenanceMode = async () => {
  try {
    const result = await pool.query("SELECT * FROM settings WHERE id = 1");
    const settings = result.rows[0];
    return {
      maintenance: settings.maintenance,
      message: settings.maintenance_message,
    };
  } catch (error) {
    console.error("Error in checkMaintenanceMode Function:", error);
    return false;
  }
};

export const getSettings = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM settings WHERE id = 1");
    const settings = result.rows[0];
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error("Error in fetchSettings Function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateSettings = async (req, res) => {
  const {
    email_notif,
    auto_approve,
    maintenance,
    maintenance_message,
    grace_period,
    session_timeout,
    max_login,
    user_id,
  } = req.body;

  // build the SET clause dynamically
  const fields = [];
  const values = [];
  let idx = 1;

  if (typeof email_notif !== "undefined") {
    fields.push(`email_notif = $${idx++}`);
    values.push(email_notif);
  }
  if (typeof auto_approve !== "undefined") {
    fields.push(`auto_approve = $${idx++}`);
    values.push(auto_approve);
  }
  if (typeof maintenance !== "undefined") {
    fields.push(`maintenance = $${idx++}`);
    values.push(maintenance);
  }
  if (typeof maintenance_message !== "undefined") {
    fields.push(`maintenance_message = $${idx++}`);
    values.push(maintenance_message);
  }
  if (typeof session_timeout !== "undefined") {
    fields.push(`session_timeout = $${idx++}`);
    values.push(session_timeout);
  }
  if (typeof max_login !== "undefined") {
    fields.push(`max_login = $${idx++}`);
    values.push(max_login);
  }
  if (typeof grace_period !== "undefined") {
    fields.push(`grace_period = $${idx++}`);
    values.push(grace_period);
    fields.push(`grace_start_at = NOW()`);
  }
  fields.push(`updated_at = NOW()`);

  // if no settings fields were passed
  if (fields.length === 0) {
    return res.status(400).json({
      success: false,
      message: "No settings to update.",
    });
  }

  try {
    // update query
    const updateQuery = `
      UPDATE settings
      SET ${fields.join(", ")}
      WHERE id = 1
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, values);
    const settings = result.rows[0];

    // log to activity_logs
    await pool.query(
      `INSERT INTO activity_logs (user_id, action, target_id, category, timestamp)
       VALUES ($1, 'UPDATED', $2, 'SETTINGS', NOW())`,
      [user_id, settings.id]
    );

    if (!settings.maintenance) {
      const result = await disableMaintenance(); // Disable maintenance mode if it's not enabled manually
      return res.status(200).json({
        // Added return here to prevent double response
        success: result.success,
        data: result.data,
      });
    }

    return res.status(200).json({ success: true, data: settings });
  } catch (error) {
    console.error("Error in updateSettings:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message, // Include error message for debugging
    });
  }
};
