const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL COORDINATION REQUESTS
// =====================================

router.get("/", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM rescue_response_coordination
      ORDER BY created_at DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch rescue coordination data"
    });

  }

});


// =====================================
// CREATE COORDINATION REQUEST
// =====================================

router.post("/", async (req, res) => {

  const {

    barangay_id,
    officer_id,

    barangay_name,
    municipality,

    incident_id,

    operation_title,
    response_type,

    affected_area,

    personnel_needed,
    equipment_needed,

    support_request,

    progress_status,
    urgency_level,

    contact_person,
    contact_number,

    remarks

  } = req.body;

  try {

    const result = await pool.query(`
      INSERT INTO rescue_response_coordination
      (
        barangay_id,
        officer_id,

        barangay_name,
        municipality,

        incident_id,

        operation_title,
        response_type,

        affected_area,

        personnel_needed,
        equipment_needed,

        support_request,

        progress_status,
        urgency_level,

        contact_person,
        contact_number,

        remarks
      )

      VALUES
      (
        $1,$2,
        $3,$4,
        $5,
        $6,$7,
        $8,
        $9,$10,
        $11,
        $12,$13,
        $14,$15,
        $16
      )

      RETURNING *
    `,
    [

      barangay_id,
      officer_id,

      barangay_name,
      municipality,

      incident_id,

      operation_title,
      response_type,

      affected_area,

      personnel_needed,
      equipment_needed,

      support_request,

      progress_status,
      urgency_level,

      contact_person,
      contact_number,

      remarks

    ]);

    res.status(201).json({

      message:
        "Coordination request submitted successfully",

      data:
        result.rows[0]

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to submit coordination request"
    });

  }

});


// =====================================
// UPDATE RESPONSE PROGRESS
// =====================================

router.put("/:id", async (req, res) => {

  const { id } = req.params;

  const {

    progress_status,
    remarks

  } = req.body;

  try {

    const result = await pool.query(`
      UPDATE rescue_response_coordination

      SET

        progress_status = $1,
        remarks = $2,

        updated_at = CURRENT_TIMESTAMP

      WHERE coordination_id = $3

      RETURNING *
    `,
    [
      progress_status,
      remarks,
      id
    ]);

    if (result.rows.length === 0) {

      return res.status(404).json({
        error:
          "Coordination request not found"
      });

    }

    res.json({

      message:
        "Response progress updated successfully",

      data:
        result.rows[0]

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to update response progress"
    });

  }

});


// =====================================
// DELETE COORDINATION REQUEST
// =====================================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(`
      DELETE FROM rescue_response_coordination
      WHERE coordination_id = $1
      RETURNING *
    `,
    [id]);

    if (result.rows.length === 0) {

      return res.status(404).json({
        error:
          "Coordination request not found"
      });

    }

    res.json({
      message:
        "Coordination request deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to delete coordination request"
    });

  }

});

module.exports = router;