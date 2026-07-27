const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL INCIDENT REPORTS
// =====================================

router.get("/", async (req, res) => {

  try {

    const reports =
      await pool.query(`
        SELECT *
        FROM incident_reports
        ORDER BY incident_id ASC
      `);

    res.json(
      reports.rows
    );

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch incident reports"
    });

  }

});


// =====================================
// GET SINGLE INCIDENT REPORT
// =====================================

router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const report =
      await pool.query(`
        SELECT *
        FROM incident_reports
        WHERE incident_id = $1
      `,
      [id]
    );

    if (
      report.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Incident report not found"
      });

    }

    res.json(
      report.rows[0]
    );

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch incident report"
    });

  }

});


// =====================================
// CREATE INCIDENT REPORT
// =====================================

router.post("/", async (req, res) => {

  const {
    barangay_id,
    officer_id,
    incident_type,
    title,
    description,
    location,
    latitude,
    longitude,
    photo,
    severity,
    status
  } = req.body;

  try {

    const newReport =
      await pool.query(`
        INSERT INTO incident_reports
        (
          barangay_id,
          officer_id,
          incident_type,
          title,
          description,
          location,
          latitude,
          longitude,
          photo,
          severity,
          status
        )
        VALUES
        (
          $1,$2,$3,$4,$5,
          $6,$7,$8,$9,$10,$11
        )
        RETURNING *
      `,
      [
        barangay_id,
        officer_id,
        incident_type,
        title,
        description,
        location,
        latitude,
        longitude,
        photo,
        severity,
        status
      ]
    );

    res.status(201).json({
      message:
        "Incident report created successfully",

      report:
        newReport.rows[0]
    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to create incident report"
    });

  }

});


// =====================================
// UPDATE INCIDENT STATUS
// =====================================

router.put("/:id/status", async (req, res) => {

  const { id } = req.params;

  const { status } = req.body;

  try {

    const updatedReport =
      await pool.query(`
        UPDATE incident_reports
        SET status = $1
        WHERE incident_id = $2
        RETURNING *
      `,
      [status, id]
    );

    if (
      updatedReport.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Incident report not found"
      });

    }

    res.json({
      message:
        "Incident report updated successfully",

      report:
        updatedReport.rows[0]
    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to update incident report"
    });

  }

});


// =====================================
// DELETE INCIDENT REPORT
// =====================================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const deletedReport =
      await pool.query(`
        DELETE FROM incident_reports
        WHERE incident_id = $1
        RETURNING *
      `,
      [id]
    );

    if (
      deletedReport.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Incident report not found"
      });

    }

    res.json({
      message:
        "Incident report deleted successfully"
    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to delete incident report"
    });

  }

});

module.exports = router;