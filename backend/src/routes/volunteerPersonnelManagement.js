const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL PERSONNEL
// =====================================

router.get("/", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM volunteer_personnel_management
      ORDER BY created_at DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch personnel records"
    });

  }

});


// =====================================
// ADD PERSONNEL / VOLUNTEER
// =====================================

router.post("/", async (req, res) => {

  const {

    barangay_id,
    officer_id,

    barangay_name,
    municipality,

    full_name,

    role_type,

    contact_number,

    assigned_task,

    availability_status,

    deployment_area,

    shift_schedule,

    skills,

    remarks

  } = req.body;

  try {

    const result = await pool.query(`
      INSERT INTO volunteer_personnel_management
      (
        barangay_id,
        officer_id,

        barangay_name,
        municipality,

        full_name,

        role_type,

        contact_number,

        assigned_task,

        availability_status,

        deployment_area,

        shift_schedule,

        skills,

        remarks
      )

      VALUES
      (
        $1,$2,
        $3,$4,
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12,
        $13
      )

      RETURNING *
    `,
    [

      barangay_id,
      officer_id,

      barangay_name,
      municipality,

      full_name,

      role_type,

      contact_number,

      assigned_task,

      availability_status,

      deployment_area,

      shift_schedule,

      skills,

      remarks

    ]);

    res.status(201).json({

      message:
        "Personnel added successfully",

      data:
        result.rows[0]

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to add personnel"
    });

  }

});


// =====================================
// UPDATE PERSONNEL STATUS
// =====================================

router.put("/:id", async (req, res) => {

  const { id } = req.params;

  const {

    availability_status,
    assigned_task,
    deployment_area,
    remarks

  } = req.body;

  try {

    const result = await pool.query(`
      UPDATE volunteer_personnel_management

      SET

        availability_status = $1,
        assigned_task = $2,
        deployment_area = $3,
        remarks = $4,

        updated_at = CURRENT_TIMESTAMP

      WHERE personnel_id = $5

      RETURNING *
    `,
    [

      availability_status,
      assigned_task,
      deployment_area,
      remarks,

      id

    ]);

    if (result.rows.length === 0) {

      return res.status(404).json({
        error:
          "Personnel not found"
      });

    }

    res.json({

      message:
        "Personnel updated successfully",

      data:
        result.rows[0]

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to update personnel"
    });

  }

});


// =====================================
// DELETE PERSONNEL
// =====================================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(`
      DELETE FROM volunteer_personnel_management
      WHERE personnel_id = $1
      RETURNING *
    `,
    [id]);

    if (result.rows.length === 0) {

      return res.status(404).json({
        error:
          "Personnel not found"
      });

    }

    res.json({
      message:
        "Personnel removed successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to delete personnel"
    });

  }

});

module.exports = router;