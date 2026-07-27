const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL EVACUEES
// =====================================

router.get("/", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM evacuee_attendance_tracking
      ORDER BY check_in_time DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch evacuees"
    });

  }

});


// =====================================
// CHECK IN EVACUEE
// =====================================

router.post("/", async (req, res) => {

  const {

    barangay_id,
    officer_id,

    evacuee_name,
    family_head,

    evacuation_center,

    qr_code,

    gender,
    age,

    contact_number,

    status,

    remarks

  } = req.body;

  try {

    const result = await pool.query(`
      INSERT INTO evacuee_attendance_tracking
      (
        barangay_id,
        officer_id,

        evacuee_name,
        family_head,

        evacuation_center,

        qr_code,

        gender,
        age,

        contact_number,

        status,

        remarks
      )

      VALUES
      (
        $1,$2,
        $3,$4,
        $5,
        $6,
        $7,$8,
        $9,
        $10,
        $11
      )

      RETURNING *
    `,
    [

      barangay_id,
      officer_id,

      evacuee_name,
      family_head,

      evacuation_center,

      qr_code,

      gender,
      age,

      contact_number,

      status,

      remarks

    ]);

    res.status(201).json({

      message:
        "Evacuee checked in successfully",

      data:
        result.rows[0]

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to check in evacuee"
    });

  }

});


// =====================================
// UPDATE STATUS
// =====================================

router.put("/:id", async (req, res) => {

  const { id } = req.params;

  const {

    status,
    remarks

  } = req.body;

  try {

    let query = `
      UPDATE evacuee_attendance_tracking

      SET

        status = $1,
        remarks = $2,
        updated_at = CURRENT_TIMESTAMP
    `;

    if (
      status === "Checked Out"
    ) {

      query += `,
        check_out_time =
        CURRENT_TIMESTAMP
      `;

    }

    query += `
      WHERE attendance_id = $3
      RETURNING *
    `;

    const result =
      await pool.query(
        query,
        [
          status,
          remarks,
          id
        ]
      );

    res.json({

      message:
        "Evacuee status updated",

      data:
        result.rows[0]

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to update evacuee"
    });

  }

});

module.exports = router;