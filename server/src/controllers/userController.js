import pool from "../config/db.js";
import { hashPassword } from "../helpers/password.js";

export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, username, email, role, status, must_change_password, last_login, created_at
       FROM users
       ORDER BY created_at DESC;`
    );

    return res.status(200).json({ success: true, data: result.rows });
  } catch (error) {
    console.error("Error in getAllUsers:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT id, username, email, role, status, must_change_password, last_login, created_at
       FROM users
       WHERE id = $1;`,
      [id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error in getUserById:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const addUser = async (req, res) => {
  try {
    const { username, email, password_hash, role, status } = req.body;

    if (!username || !email || !password_hash || !role) {
      return res.status(400).json({
        success: false,
        message: "Username, email, and password, role are required",
      });
    }

    const password_hashed = await hashPassword(password_hash);

    const result = await pool.query(
      `
      INSERT INTO users (username, email, password_hash, role, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, username, email, role, status, must_change_password, last_login, created_at;
      `,
      [username, email, password_hashed, role, status || "Active"]
    );

    const createdUser = result.rows[0];

    res.status(200).json({ success: true, data: createdUser });
  } catch (error) {
    console.error("Error in addUser Function", error);

    // Postgres unique violation
    if (error.code === "23505") {
      // Unique violation
      if (error.constraint === "users_email_key") {
        return res.status(409).json({
          success: false,
          errorCode: "EMAIL_EXISTS",
          message: "Email already exists.",
        });
      }
      if (error.constraint === "users_username_key") {
        return res.status(409).json({
          success: false,
          errorCode: "USERNAME_EXISTS",
          message: "Username already exists.",
        });
      }
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role, status } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    // Validate input (basic)
    if (!username && !email && !role && typeof status === "undefined") {
      return res
        .status(400)
        .json({ success: false, message: "Nothing to update." });
    }

    // Build dynamic SQL to update only provided fields
    const updates = [];
    const values = [];
    let index = 1;

    if (username) {
      updates.push(`username = $${index++}`);
      values.push(username);
    }
    if (email) {
      updates.push(`email = $${index++}`);
      values.push(email);
    }
    if (role) {
      updates.push(`role = $${index++}`);
      values.push(role);
    }
    if (typeof status !== "undefined") {
      updates.push(`status = $${index++}`);
      values.push(status);
    }

    // Finalize query
    const query = `
      UPDATE users
      SET ${updates.join(", ")}
      WHERE id = $${index}
      RETURNING id, username, email, role, status, must_change_password, last_login, created_at;
    `;
    values.push(id);

    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error in updateUser:", error);

    // Postgres unique violation
    if (error.code === "23505") {
      // Unique violation
      if (error.constraint === "users_email_key") {
        return res.status(409).json({
          success: false,
          errorCode: "EMAIL_EXISTS",
          message: "Email already exists.",
        });
      }
      if (error.constraint === "users_username_key") {
        return res.status(409).json({
          success: false,
          errorCode: "USERNAME_EXISTS",
          message: "Username already exists.",
        });
      }
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required." });
    }

    const { rows } = await pool.query(
      `DELETE FROM users
       WHERE id = $1
       RETURNING id, username, email, role, status;`,
      [id]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({ success: true, data: rows[0] });
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
       RETURNING id, username, email, role, status;`,
      [newStatus, id]
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

import bcrypt from "bcrypt";

export const resetUserPasswordManual = async (req, res) => {
  try {
    const { id } = req.params;
    const { password, confirmPassword } = req.body;

    // Validate
    if (!password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        errorCode: "REQUIRED_PASSWORD",
        message: "Both password fields are required.",
      });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({
          success: false,
          errorCode: "DO_NOT_MATCH",
          message: "Passwords do not match.",
        });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, 12);

    const result = await pool.query(
      `UPDATE public.users
       SET password_hash = $1, must_change_password = true
       WHERE id = $2
       RETURNING id, username, email, role, status, must_change_password;`,
      [password_hash, id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      message:
        "Password updated successfully. User must change it on next login.",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error in resetUserPasswordManual:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};

export const checkUsernameAvailability = async (req, res) => {
  const { username } = req.query;

  if (!username) {
    return res
      .status(400)
      .json({ success: false, message: "Username is required" });
  }

  try {
    const result = await pool.query(
      "SELECT username FROM users WHERE username = $1",
      [username]
    );

    if (result.rowCount !== 0) {
      return res.status(200).json({
        success: true,
        available: false,
        message: "Username already exists.",
      });
    }

    return res.status(200).json({
      success: true,
      available: true,
      message: "Username is available.",
    });
  } catch (error) {
    console.error("Error in checkUsernameAvailability:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
