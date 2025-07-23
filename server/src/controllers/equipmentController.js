import pool from "../config/db.js";

export const getAllEquipment = async (req, res) => {
  try {
    const equipments = await pool.query(`
      SELECT * FROM equipments
      `);

    res.status(200).json({ sucess: true, data: equipments.rows });
  } catch (error) {
    console.log("Error in getAllEquipment Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createEquipment = async (req, res) => {
  const {
    name,
    type,
    status,
    location,
    serial_number,
    condition,
    description,
  } = req.body;

  if (!name || !type || !status || !location) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Name, type, status, and location are required",
      });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO equipments (name, type, status, location, serial_number, condition, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, type, status, location, serial_number, condition, description;
      `,
      [
        name,
        type,
        status || "Available",
        location,
        serial_number,
        condition,
        description,
      ]
    );

    const createdEquipment = result.rows[0];

    res.status(200).json({ sucess: true, data: createdEquipment });
  } catch (error) {
    console.log("Error in createEquipment Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const updateEquipment = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    type,
    status,
    location,
    serial_number,
    condition,
    description,
  } = req.body;

  if (!name || !type || !status || !location) {
    return res.status(400).json({
      success: false,
      message: "Name, type, status, and location are required.",
    });
  }

  try {
    const result = await pool.query(
      `
      UPDATE public.equipments
      SET name = $1, type = $2, status = $3, location = $4, serial_number = $5, condition = $6, description = $7
      WHERE id = $8
      RETURNING id, name, type, status, location, serial_number, condition, description;
      `,
      [name, type, status, location, serial_number, condition, description, id]
    );

    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Equipment not found." });
    }

    return res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Error in updateEquipment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const deleteEquipment = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `
    DELETE FROM equipments
    WHERE id=$1
    RETURNING *
    `,
      [id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Equipment not found" });
    }

    const deletedEquipment = result.rows[0];

    res.status(200).json({ success: true, message: deletedEquipment });
  } catch (error) {
    console.log("Error in deleteEquipment Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
