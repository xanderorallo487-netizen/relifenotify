const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL INCIDENT HISTORY
// =====================================

router.get("/", async (req, res) => {

  try {

    const incidents =
      await pool.query(`
        SELECT *
        FROM incident_reports
        ORDER BY reported_at DESC
      `);

    res.json(incidents.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch incident history"
    });

  }

});


// =====================================
// GET INCIDENT HISTORY BY STATUS
// =====================================

router.get("/status/:status", async (req, res) => {

  const { status } = req.params;

  try {

    const incidents =
      await pool.query(`
        SELECT *
        FROM incident_reports
        WHERE status = $1
        ORDER BY reported_at DESC
      `,
      [status]
    );

    res.json(incidents.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch filtered incident history"
    });

  }

});


// =====================================
// GET SINGLE INCIDENT RECORD
// =====================================

router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const incident =
      await pool.query(`
        SELECT *
        FROM incident_reports
        WHERE incident_id = $1
      `,
      [id]
    );

    if (incident.rows.length === 0) {

      return res.status(404).json({
        error: "Incident not found"
      });

    }

    res.json(incident.rows[0]);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to fetch incident record"
    });

  }

});

module.exports = router;