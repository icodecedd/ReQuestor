import pool from "../config/dbConfig.js";
import bcrypt from "bcrypt";
import { generateTempPassword, hashPassword } from "../helpers/password.js";
import { sendAdminResetPasswordEmail } from "../emailservices/emailsGmail.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query(
      `SELECT id, name, email, role, status, created_at, is_verified, last_login
       FROM users
       ORDER BY created_at DESC;`
    );

    return res.status(200).json({ success: true, data: users.rows });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { name, email, password_hash, role, status, user_id } = req.body;

    if (!name || !email || !password_hash || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    if (password_hash.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const password_hashed = await hashPassword(password_hash);

    const query = `
      INSERT INTO users (name, email, password_hash, role, status, is_verified, must_change_password)
      VALUES ($1, $2, $3, $4, $5, TRUE, TRUE)
      RETURNING id, name, email, role, status, created_at, is_verified, last_login;
      `;

    const createdUser = await pool.query(query, [
      name,
      email,
      password_hashed,
      role,
      status,
    ]);

    await pool.query(
      `INSERT INTO activity_logs (user_id, action, target_id, category, timestamp)
       VALUES ($1, 'CREATED', $2, 'USERS', NOW())
       RETURNING id, user_id, action, target_id, category, timestamp;`,
      [user_id, createdUser.rows[0].id]
    );

    res.status(200).json({
      success: true,
      message: "New user account has been created successfully.",
      data: createdUser.rows[0],
    });
  } catch (error) {
    console.error("Error in addUser Function", error);

    // Postgres unique violation
    if (error.code === "23505") {
      // Unique violation
      if (error.constraint === "users_email_key") {
        return res.status(409).json({
          success: false,
          errorCode: "EMAIL_EXISTS",
          message: "Email already exists. Please use a different email.",
        });
      }
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, role, status, user_id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Build dynamic SQL to update only provided fields
    const updates = [];
    const values = [];
    let index = 1;

    if (name) {
      updates.push(`name = $${index++}`);
      values.push(name.trim());
    }
    if (email) {
      updates.push(`email = $${index++}`);
      values.push(email.trim());
    }
    if (role) {
      updates.push(`role = $${index++}`);
      values.push(role.trim());
    }
    if (typeof status !== "undefined") {
      updates.push(`status = $${index++}`);
      values.push(status.trim());
    }

    values.push(id);

    const query = `
      UPDATE users
      SET ${updates.join(", ")}
      WHERE id = $${index}
      RETURNING id, name, email, role, status, created_at, is_verified, last_login;
    `;

    const updatedUser = await pool.query(query, values);

    if (updatedUser.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    await pool.query(
      `INSERT INTO activity_logs (user_id, action, target_id, category, timestamp)
       VALUES ($1, 'UPDATED', $2, 'USERS', NOW())
       RETURNING id, user_id, action, target_id, category, timestamp;`,
      [user_id, id]
    );

    res.status(200).json({
      success: true,
      message: "User details have been updated successfully.",
      data: updatedUser.rows[0],
    });
  } catch (error) {
    console.error("Error in updateUser:", error);

    // Postgres unique violation
    if (error.code === "23505") {
      // Unique violation
      if (error.constraint === "users_email_key") {
        return res.status(409).json({
          success: false,
          errorCode: "EMAIL_EXISTS",
          message: "Email already exists. Please use a different email.",
        });
      }
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user_id = req.body.user_id;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const query = `
      DELETE FROM users
      WHERE id = $1
      RETURNING id, name, email, role, status, created_at, is_verified, last_login;`;

    const deletedUser = await pool.query(query, [id]);

    if (deletedUser.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    await pool.query(
      `INSERT INTO activity_logs (user_id, action, target_id, category, timestamp)
       VALUES ($1, 'DELETED', $2, 'USERS', NOW())
       RETURNING id, user_id, action, target_id, category, timestamp;`,
      [user_id, id]
    );

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
      data: deletedUser.rows[0],
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;

    // Get current status
    const current = await pool.query(
      `SELECT status FROM public.users WHERE id = $1`,
      [id]
    );
    if (current.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const currentStatus = current.rows[0].status;
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";

    const result = await pool.query(
      `UPDATE public.users
       SET status = $1
       WHERE id = $2
       RETURNING id, name, email, role, status, created_at, is_verified, last_login;`,
      [newStatus, id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const finalStatus = newStatus === "Active" ? "REACTIVATED" : "DEACTIVATED";

    await pool.query(
      `INSERT INTO activity_logs (user_id, action, target_id, category, timestamp)
       VALUES ($1, $2, $3, 'USERS', NOW())
       RETURNING id, user_id, action, target_id, category, timestamp;`,
      [user_id, finalStatus, id]
    );

    return res.status(200).json({
      success: true,
      message: `User ${
        newStatus === "Active" ? "reactivated" : "deactivated"
      } successfully.`,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error in toggleUserStatus:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const resetUserPassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, user_id } = req.body;

    // Validate
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required." });
    }

    //Generate random a password
    const password = generateTempPassword();

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `UPDATE public.users
       SET password_hash = $1, must_change_password = TRUE
       WHERE id = $2
       RETURNING id, name, email, role, status, created_at, is_verified, last_login;`,
      [password_hash, id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const user = result.rows[0];

    await sendAdminResetPasswordEmail(user.email, password);

    await pool.query(
      `INSERT INTO activity_logs (user_id, action, target_id, category, timestamp)
       VALUES ($1, 'PASSWORD_RESET', $2, 'USERS', NOW())
       RETURNING id, user_id, action, target_id, category, timestamp;`,
      [user_id, id]
    );

    return res.status(200).json({
      success: true,
      message:
        "Temporary password sent to user. They must change it on next login.",
      data: user,
    });
  } catch (error) {
    console.error("Error in resetUserPassword:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
