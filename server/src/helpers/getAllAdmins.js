import pool from "../config/dbConfig.js";

export const getAllAdmins = async () => {
  try {
    const query = `
      SELECT u.id, u.name, u.email, u.role
      FROM users u
      WHERE u.role = 'Admin'
    `;
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Error in getAllAdmins Function:", error);
    return [];
  }
};