import pool from "../config/db.js";

export const getAllEquipment = async (req, res) => {
  try {
    const equipments = await pool.query(
      `
      SELECT * FROM equipments
      `
    );

    res.status(200).json({ sucess: true, data: equipments });
  } catch (error) {
    console.log("Error in getAllEquipment Function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const createEquipment = async (req, res) => {
  const { name, type, status } = req.body;

  if (!name || !type) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const result = await pool.query(
      `
      INSERT INTO equipments (name, type, status) 
      VALUES ($1, $2, $3)
      RETURNING *
      `,
      [name, type, status || "available"]
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
  const { name, type, status } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE equipments
      SET name = $1, type = $2, status = $3
      WHERE id = $4
      RETURNING *
      `,
      [name, type, status, id]
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Equipment not found" });
    }

    const updatedEquipment = result.rows[0];

    res.status(200).json({ success: true, data: updatedEquipment });
  } catch (error) {
    console.error("Error in updateEquipment Function:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
