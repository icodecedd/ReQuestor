import pool from '../config/dbConfig.js';

// GET all requests
export const getAllRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT req.*, u.name, u.role,
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
    console.error('Error in getAllRequests Function:', error);

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

// GET recent 5 requests (for dashboard)
export const getRecentRequests = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT req.*, u.name, u.role,
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
    console.error('Error in getRecentRequests Function', error);

    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const checkAvailability = async (req, res) => {
  const { equipment_list, date_use, time_from, time_to } = req.body;

  if (
    !Array.isArray(equipment_list) ||
    equipment_list.length === 0 ||
    !date_use ||
    !time_from ||
    !time_to
  ) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required.',
    });
  }

  const timeFromHours = parseInt(time_from.split(':')[0]);
  const timeToHours = parseInt(time_to.split(':')[0]);
  if (timeToHours < timeFromHours) {
    return res.status(400).json({
      success: false,
      message: 'Invalid time range. Time range cannot span across two days.',
    });
  }

  const dateNow = new Date();
  const dateUse = new Date(date_use);

  dateNow.setHours(0, 0, 0, 0);
  dateUse.setHours(0, 0, 0, 0);

  const dayDiff = (dateUse - dateNow) / (1000 * 60 * 60 * 24);

  if (dayDiff < 3) {
    return {
      success: false,
      message:
        'You must request equipment at least 3 days before the intended use.',
    };
  }

  try {
    const results = await pool.query(
      `
      SELECT e.type, COUNT(e.id) AS available_count
      FROM equipments e
      WHERE e.type = ANY($1)
        AND e.status NOT IN ('Unavailable', 'Under Maintenance') -- exclude broken
        AND NOT EXISTS (
          SELECT 1
          FROM request_items ri
          JOIN requests r ON r.id = ri.request_id
          WHERE ri.equipment_id = e.id
            AND r.date_use = $2
            AND r.status NOT IN ('Cancelled', 'Completed')
            AND (
              ($3 < r.time_to AND $4 > r.time_from) -- time overlap check
            )
        )
      GROUP BY e.type
      `,
      [equipment_list, date_use, time_from, time_to]
    );

    // Format response to include 0 counts for types not found in results
    const formatted = equipment_list.map((type) => {
      const match = results.rows.find((r) => r.type === type);
      return {
        type,
        available_count: match ? parseInt(match.available_count, 10) : 0,
      };
    });

    return res.status(200).json({
      success: true,
      message: 'Availability count retrieved.',
      data: formatted,
    });
  } catch (error) {
    console.error('Error in checkAvailability:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Internal Server Error' });
  }
};

export const addRequest = async (req, res) => {
  const {
    name,
    course_section,
    faculty_in_charge,
    equipment_list,
    date_use,
    time_from,
    time_to,
    purpose,
    user_id,
  } = req.body;

  // Validation
  if (
    !name ||
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
      message: 'All fields are required.',
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
        'You must request equipment at least 3 days before the intended use.',
    });
  }

  const timeFromHours = parseInt(time_from.split(':')[0]);
  const timeToHours = parseInt(time_to.split(':')[0]);
  if (timeToHours < timeFromHours) {
    return res.status(400).json({
      success: false,
      message: 'Invalid time range. Time range cannot span across two days.',
    });
  }

  try {
    await pool.query('BEGIN');

    const userRes = await pool.query('SELECT id FROM users WHERE name = $1', [
      name,
    ]);

    if (userRes.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res
        .status(400)
        .json({ success: false, message: 'User not found.' });
    }

    const userId = userRes.rows[0].id;
    const available = [];
    const unavailable = [];

    const duplicateCheck = await pool.query(
      `SELECT 1
       FROM requests r
       JOIN request_items ri ON r.id = ri.request_id
       JOIN equipments e ON ri.equipment_id = e.id
       WHERE r.user_id = $1
       AND r.date_use = $2
       AND r.time_from = $3
       AND r.time_to = $4
       AND e.type = ANY($5)
       AND r.status IN ('Reserved', 'In Use')
       LIMIT 1`,
      [userId, date_use, time_from, time_to, equipment_list]
    );

    if (duplicateCheck.rows.length > 0) {
      await pool.query('ROLLBACK');
      return res.status(409).json({
        success: false,
        message: 'You already have a request with the same details.',
      });
    }

    for (const type of equipment_list) {
      const result = await pool.query(
        `SELECT e.* FROM equipments e
          WHERE e.type = $1
          AND e.status = 'Available'
          AND NOT EXISTS (
          SELECT 1 FROM request_items ri
          JOIN requests r ON ri.request_id = r.id
          WHERE ri.equipment_id = e.id
          AND r.date_use = $2
          AND r.status IN ('Reserved', 'In Use')
          AND r.time_from < $4
          AND r.time_to > $3
          )
          ORDER BY RANDOM()
          FOR UPDATE SKIP LOCKED
          LIMIT 1
        `,
        [type, date_use, time_from, time_to]
      );

      if (result.rows.length === 0) {
        unavailable.push({ type });
      } else {
        available.push({ type, equipment: result.rows[0] });
      }
    }

    if (unavailable.length > 0) {
      await pool.query('ROLLBACK');
      return res.status(409).json({
        success: false,
        message:
          'Some items you selected are no longer available. Please review your request.',
        available: available,
        unavailable: unavailable,
      });
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

    for (const { type, equipment } of available) {
      await pool.query(
        `INSERT INTO request_items (request_id, equipment_id, requested_type)
         VALUES ($1, $2, $3)`,
        [requestId, equipment.id, type]
      );
    }

    const result = await pool.query(
      `SELECT req.*, u.name, u.role,
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

    await pool.query('COMMIT');

    const activityLog = await pool.query(
      `INSERT INTO activity_logs (user_id, action, target_id, category, timestamp)
       VALUES ($1, 'CREATED', $2, 'REQUESTS', NOW())
       RETURNING
       id,
       user_id,
       action,
       target_id,
       category,
       timestamp
       `,
      [user_id, userId]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      activity: activityLog.rows[0],
    });
  } catch (error) {
    console.error('Error in addRequest Function', error);
    await pool.query('ROLLBACK');
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

export const updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status, user_id } = req.body;

  // Valid status transitions
  const validStatuses = ['In Use', 'Reserved', 'Rejected', 'Completed'];

  if (!status || !validStatuses.includes(status.status)) {
    return res.status(400).json({
      success: false,
      message:
        'Valid status required: In Use, Reserved, Rejected, or Completed.',
    });
  }

  if (!id) {
    return res.status(400).json({
      success: false,
      message: 'Request ID is required.',
    });
  }

  try {
    await pool.query('BEGIN');

    // Check if request exists
    const existingRequest = await pool.query(
      'SELECT * FROM requests WHERE id = $1',
      [id]
    );

    if (existingRequest.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({
        success: false,
        message: 'Request not found.',
      });
    }

    const currentRequest = existingRequest.rows[0];

    if (status.status === 'Completed') {
      if (currentRequest.status !== 'In Use') {
        await pool.query('ROLLBACK');
        return res.status(400).json({
          success: false,
          message: 'Only in use requests can be completed.',
        });
      }
    }

    // Update the request status
    const result = await pool.query(
      `UPDATE requests
       SET status = $1
       WHERE id = $2
       RETURNING *`,
      [status.status, id]
    );

    await pool.query('COMMIT');
    const updatedRequest = result.rows[0];

    await pool.query(
      `INSERT INTO activity_logs (user_id, action, target_id, category, timestamp)
       VALUES ($1, $2, $3, 'REQUESTS', NOW())
       RETURNING id, user_id, action, target_id, category, timestamp;`,
      [user_id, status.status?.toUpperCase(), id]
    );

    res.status(200).json({
      success: true,
      message: `Request ${status.status?.toLowerCase()} successfully.`,
      data: updatedRequest,
    });
  } catch (error) {
    console.error('Error in updateRequestStatus Function', error);
    await pool.query('ROLLBACK');
    res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};

export const cancelRequest = async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: 'Request ID is required.' });
  }

  try {
    await pool.query('BEGIN');

    // Step 1: Check if request exists and get current status
    const existingRequest = await pool.query(
      'SELECT * FROM requests WHERE id = $1',
      [id]
    );

    if (existingRequest.rows.length === 0) {
      await pool.query('ROLLBACK');
      return res.status(404).json({
        success: false,
        message: 'Request not found.',
      });
    }

    const currentRequest = existingRequest.rows[0];

    // Step 2: Check if request can be cancelled
    const nonCancellableStatuses = ['Completed', 'Cancelled'];
    if (nonCancellableStatuses.includes(currentRequest.status)) {
      await pool.query('ROLLBACK');
      return res.status(400).json({
        success: false,
        message: `Cannot cancel request with status: ${currentRequest.status}.`,
      });
    }

    // Step 4: Update request status to 'Cancelled'
    const result = await pool.query(
      `UPDATE requests
       SET status = 'Cancelled'
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    await pool.query('COMMIT');
    const updatedRequest = result.rows[0];

    await pool.query(
      `INSERT INTO activity_logs (user_id, action, target_id, category, timestamp)
       VALUES ($1, 'CANCELLED', $2, 'REQUESTS', NOW())
       RETURNING id, user_id, action, target_id, category, timestamp;`,
      [user_id, id]
    );

    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    console.error('Error in cancelRequest Function', error);
    await pool.query('ROLLBACK');
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
