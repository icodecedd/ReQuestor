import pool from "../config/dbConfig.js";

export const getAllEquipment = async (req, res) => {
  try {
    const equipment = await pool.query(`
      SELECT * FROM equipments
      `);

    res.status(200).json({ sucess: true, data: equipment.rows });
  } catch (error) {
    console.error("Error in getAllEquipment Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addEquipment = async (req, res) => {
  const {
    name,
    type,
    status,
    location,
    serial_number,
    condition,
    description,
  } = req.body;

  if (!name || !type || !location || !condition) {
    return res.status(400).json({
      success: false,
      message: "Name, type, location, and condition are required",
    });
  }

  const query = `
      INSERT INTO equipments (name, type, status, location, serial_number, condition, description)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id, name, type, status, location, serial_number, condition, description;
      `;

  try {
    const result = await pool.query(query, [
      name,
      type,
      status || "Available",
      location,
      serial_number,
      condition,
      description,
    ]);

    const createdEquipment = result.rows[0];

    res.status(200).json({ sucess: true, data: createdEquipment });
  } catch (error) {
    console.error("Error in createEquipment Function", error);

    if (error.code === "23505") {
      if (error.constraint === "unique_serial_number_if_present") {
        return res.status(409).json({
          success: false,
          errorCode: "SERIAL_DUPLICATE",
          message: "Serial number already exists. Please use a unique one.",
        });
      }
    }

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

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Equipment ID is required." });
  }
  // Validate input (basic)
  if (!name && !type && !location && typeof condition === "undefined") {
    return res
      .status(400)
      .json({ success: false, message: "Nothing to update." });
  }

  // Build dynamic SQL to update only provided fields
  const updates = [];
  const values = [];
  let index = 1;

  if (name) {
    updates.push(`name = $${index++}`);
    values.push(name.trim());
  }

  if (type) {
    updates.push(`type = $${index++}`);
    values.push(type.trim());
  }

  if (location) {
    updates.push(`location = $${index++}`);
    values.push(location.trim());
  }

  if (condition) {
    updates.push(`condition = $${index++}`);
    values.push(condition.trim());
  }

  if (typeof status !== "undefined") {
    updates.push(`status = $${index++}`);
    values.push(status.trim());
  }

  if (serial_number !== undefined) {
    updates.push(`serial_number = $${index++}`);
    values.push(serial_number.trim());
  }

  if (description) {
    updates.push(`description = $${index++}`);
    values.push(description.trim());
  }

  values.push(id);

  const query = `
    UPDATE public.equipments
    SET ${updates.join(", ")}
    WHERE id = $${index}
    RETURNING
      id, name, type, status, location, serial_number, condition, description;
`;

  try {
    const result = await pool.query(query, values);

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

    if (error.code === "23505") {
      if (error.constraint === "unique_serial_number_if_present") {
        return res.status(409).json({
          success: false,
          errorCode: "SERIAL_DUPLICATE",
          message: "Serial number already exists. Please use a unique one.",
        });
      }
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const deleteEquipment = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Equipment ID is required." });
  }

  const query = `
    DELETE FROM equipments
    WHERE id=$1
    RETURNING
      id, name, type, status, location, serial_number, condition, description;
    `;

  try {
    const { rows } = await pool.query(query, [id]);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Equipment not found." });
    }

    const deletedEquipment = rows[0];

    res.status(200).json({ success: true, message: deletedEquipment });
  } catch (error) {
    console.error("Error in deleteEquipment Function", error);

    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
