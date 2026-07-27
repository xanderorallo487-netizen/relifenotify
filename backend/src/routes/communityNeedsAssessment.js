const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL ASSESSMENTS
// =====================================

router.get("/", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM community_needs_assessment
      ORDER BY encoded_at DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch assessments"
    });

  }

});


// =====================================
// CREATE ASSESSMENT (ENCODING FEATURE)
// =====================================

router.post("/", async (req, res) => {

  const {

    barangay_id,
    officer_id,

    resident_name,
    household_id,

    barangay_name,
    municipality,

    need_type,
    quantity_needed,

    urgency_level,
    status,

    notes

  } = req.body;

  try {

    const result = await pool.query(`
      INSERT INTO community_needs_assessment
      (
        barangay_id,
        officer_id,

        resident_name,
        household_id,

        barangay_name,
        municipality,

        need_type,
        quantity_needed,

        urgency_level,
        status,

        notes
      )
      VALUES
      (
        $1,$2,
        $3,$4,
        $5,$6,
        $7,$8,
        $9,$10,
        $11
      )
      RETURNING *
    `,
    [
      barangay_id,
      officer_id,

      resident_name,
      household_id,

      barangay_name,
      municipality,

      need_type,
      quantity_needed,

      urgency_level,
      status,

      notes
    ]);

    res.status(201).json({
      message: "Assessment created successfully",
      assessment: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to create assessment"
    });

  }

});


// =====================================
// UPDATE STATUS (VALIDATION / FULFILLMENT)
// =====================================

router.put("/:id", async (req, res) => {

  const { id } = req.params;

  const {
    status,
    notes
  } = req.body;

  try {

    const result = await pool.query(`
      UPDATE community_needs_assessment
      SET
        status = $1,
        notes = $2,
        updated_at = CURRENT_TIMESTAMP
      WHERE assessment_id = $3
      RETURNING *
    `,
    [
      status,
      notes,
      id
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Assessment not found"
      });
    }

    res.json({
      message: "Assessment updated successfully",
      assessment: result.rows[0]
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to update assessment"
    });

  }

});


// =====================================
// DELETE ASSESSMENT
// =====================================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(`
      DELETE FROM community_needs_assessment
      WHERE assessment_id = $1
      RETURNING *
    `,
    [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "Assessment not found"
      });
    }

    res.json({
      message: "Assessment deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to delete assessment"
    });

  }

});

module.exports = router;