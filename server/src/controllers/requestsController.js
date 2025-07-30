import pool from "../config/db.js";

// GET all requests
export const getAllRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT req.*, u.username, u.role,
         json_agg(json_build_object(
           'request_item_id', ri.id,
           'equipment_id', eq.id,
           'equipment_name', eq.name,
           'equipment_type', eq.type
         )) AS equipment_list
       FROM requests req
       LEFT JOIN users u ON u.id = req.user_id
       LEFT JOIN request_items ri ON req.id = ri.request_id
       LEFT JOIN equipments eq ON ri.equipment_id = eq.id
       GROUP BY req.id, u.id
       ORDER BY req.created_at DESC`
    );

    const allRequests = result.rows;

    res.status(200).json({ success: true, data: allRequests });
  } catch (error) {
    console.error("Error in getAllRequests Function:", error);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

// GET recent 5 requests (for dashboard)
export const getRecentRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT req.*, u.username, u.role,
         json_agg(json_build_object(
           'request_item_id', ri.id,
           'equipment_id', eq.id,
           'equipment_name', eq.name,
           'equipment_type', eq.type
         )) AS equipment_list
       FROM requests req
       LEFT JOIN users u ON u.id = req.user_id
       LEFT JOIN request_items ri ON req.id = ri.request_id
       LEFT JOIN equipments eq ON ri.equipment_id = eq.id
       GROUP BY req.id, u.id
       ORDER BY req.created_at DESC
       LIMIT 5`
    );

    const recentRequests = result.rows;

    res.status(200).json({ success: true, data: recentRequests });
  } catch (error) {
    console.error("Error in getRecentRequests Function", error);

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const addRequest = async (req, res) => {
  const {
    username,
    course_section,
    faculty_in_charge,
    equipment_list,
    date_use,
    time_from,
    time_to,
    purpose,
  } = req.body;

  // Validation
  if (
    !username ||
    !course_section ||
    !faculty_in_charge ||
    !equipment_list ||
    !Array.isArray(equipment_list) ||
    equipment_list.length === 0 ||
    !date_use ||
    !time_from ||
    !time_to
  ) {
    return res.status(400).json({
      success: false,
      message: "All fields are required.",
    });
  }

  // 3-day advance check
  const dateNow = new Date();
  const dateUse = new Date(date_use);
  dateNow.setHours(0, 0, 0, 0);
  dateUse.setHours(0, 0, 0, 0);
  const dayDiff = (dateUse - dateNow) / (1000 * 60 * 60 * 24);

  if (dayDiff < 3) {
    return res.status(400).json({
      success: false,
      message:
        "You must request equipment at least 3 days before the intended use.",
    });
  }

  try {
    await pool.query("BEGIN");

    const userRes = await pool.query(
      "SELECT id FROM users WHERE username = $1",
      [username]
    );

    if (userRes.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res
        .status(400)
        .json({ success: false, message: "User not found." });
    }

    const userId = userRes.rows[0].id;
    const assignedEquipment = [];

    for (const type of equipment_list) {
      const result = await pool.query(
        `SELECT e.* FROM equipments e
         WHERE e.type = $1 AND e.status = 'Available'
         AND NOT EXISTS (
           SELECT 1 FROM request_items ri
           JOIN requests r ON ri.request_id = r.id
           WHERE ri.equipment_id = e.id
           AND r.date_use = $2
           AND r.status IN ('Reserved', 'In Use')
           AND NOT (
             r.time_to <= $3 OR
             r.time_from >= $4
           )
         )
         FOR UPDATE SKIP LOCKED
         LIMIT 1`,
        [type, date_use, time_from, time_to]
      );

      if (result.rows.length === 0) {
        await pool.query("ROLLBACK");
        return res.status(409).json({
          success: false,
          message: `No available equipment of type "${type}" for the selected date and time.`,
        });
      }

      assignedEquipment.push({ type, equipment: result.rows[0] });
    }

    const requestRes = await pool.query(
      `INSERT INTO requests (user_id, course_section, faculty_in_charge, date_use, time_from, time_to, purpose, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, 'Reserved')
       RETURNING id`,
      [
        userId,
        course_section,
        faculty_in_charge,
        date_use,
        time_from,
        time_to,
        purpose,
      ]
    );

    const requestId = requestRes.rows[0].id;

    for (const { type, equipment } of assignedEquipment) {
      await pool.query(
        `INSERT INTO request_items (request_id, equipment_id, requested_type)
         VALUES ($1, $2, $3)`,
        [requestId, equipment.id, type]
      );

      await pool.query(
        `UPDATE equipments SET status = 'Reserved' WHERE id = $1`,
        [equipment.id]
      );
    }

    const result = await pool.query(
      `SELECT req.*, u.username, u.role,
         json_agg(json_build_object(
           'request_item_id', ri.id,
           'equipment_id', eq.id,
           'equipment_name', eq.name,
           'equipment_type', eq.type,
           'requested_type', ri.requested_type
         )) AS equipment_list
       FROM requests req
       LEFT JOIN users u ON u.id = req.user_id
       LEFT JOIN request_items ri ON req.id = ri.request_id
       LEFT JOIN equipments eq ON ri.equipment_id = eq.id
       WHERE req.id = $1
       GROUP BY req.id, u.id
       ORDER BY req.created_at DESC`,
      [requestId]
    );

    await pool.query("COMMIT");
    res.status(201).json({ success: true, data: result.rows[0] });
  } catch (error) {
    console.error("Error in addRequest Function", error);
    await pool.query("ROLLBACK");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  // Valid status transitions
  const validStatuses = ["Approved", "Rejected", "Completed"];

  if (!status || !validStatuses.includes(status)) {
    return res.status(400).json({
      success: false,
      message: "Valid status required: Approved, Rejected, or Completed",
    });
  }

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Request ID is required.",
    });
  }

  try {
    await pool.query("BEGIN");

    // Check if request exists
    const existingRequest = await pool.query(
      "SELECT * FROM requests WHERE id = $1",
      [id]
    );

    if (existingRequest.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({
        success: false,
        message: "Request not found.",
      });
    }

    const currentRequest = existingRequest.rows[0];

    if (status === "Completed") {
      if (currentRequest.status !== "Approved") {
        await pool.query("ROLLBACK");
        return res.status(400).json({
          success: false,
          message: "Only approved requests can be completed",
        });
      }

      // Release equipment back to available (equipment returned)
      const assignedEquipment = await pool.query(
        `SELECT ri.equipment_id
         FROM request_items ri
         WHERE ri.request_id = $1`,
        [id]
      );

      for (const item of assignedEquipment.rows) {
        await pool.query(
          `UPDATE equipments SET status = 'Available' WHERE id = $1`,
          [item.equipment_id]
        );
      }
    }

    // Update the request status
    const result = await pool.query(
      `UPDATE requests
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status, id]
    );

    await pool.query("COMMIT");
    const updatedRequest = result.rows[0];

    res.status(200).json({
      success: true,
      message: `Request ${status.toLowerCase()} successfully`,
      data: updatedRequest,
    });
  } catch (error) {
    console.error("Error in updateRequestStatus Function", error);
    await pool.query("ROLLBACK");
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const cancelRequest = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Request ID is required." });
  }

  try {
    await pool.query("BEGIN");

    // Step 1: Check if request exists and get current status
    const existingRequest = await pool.query(
      "SELECT * FROM requests WHERE id = $1",
      [id]
    );

    if (existingRequest.rows.length === 0) {
      await pool.query("ROLLBACK");
      return res.status(404).json({
        success: false,
        message: "Request not found",
      });
    }

    const currentRequest = existingRequest.rows[0];

    // Step 2: Check if request can be cancelled
    const nonCancellableStatuses = ["Completed", "Cancelled"];
    if (nonCancellableStatuses.includes(currentRequest.status)) {
      await pool.query("ROLLBACK");
      return res.status(400).json({
        success: false,
        message: `Cannot cancel request with status: ${currentRequest.status}`,
      });
    }

    // Step 3: Release assigned equipment back to 'Available'
    const assignedEquipment = await pool.query(
      `SELECT ri.equipment_id
       FROM request_items ri
       WHERE ri.request_id = $1`,
      [id]
    );
    for (const item of assignedEquipment.rows) {
      await pool.query(
        `UPDATE equipments SET status = 'Available' WHERE id = $1`,
        [item.equipment_id]
      );
    }

    // Step 4: Update request status to 'Cancelled'
    const result = await pool.query(
      `UPDATE requests
       SET status = 'Cancelled'
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    await pool.query("COMMIT");
    const updatedRequest = result.rows[0];

    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error("Error in cancelRequest Function", error);
    await pool.query("ROLLBACK");
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};