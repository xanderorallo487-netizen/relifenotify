const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// GET ALL ALERTS
router.get("/", async (req, res) => {

  try {

    const alerts = await pool.query(`
      SELECT *
      FROM alerts
      ORDER BY created_at DESC
    `);

    res.status(200).json({
      success: true,
      alerts: alerts.rows,
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      error: "Failed to fetch alerts",
    });

  }

});


// CREATE ALERT
router.post("/", async (req, res) => {

  try {

    const {
      title,
      message,
      alert_type,
      target_barangay,
    } = req.body;

    // CREATE ALERT
    const newAlert =
      await pool.query(
        `
        INSERT INTO alerts
        (
          title,
          message,
          alert_type,
          target_barangay
        )

        VALUES ($1,$2,$3,$4)

        RETURNING *
        `,
        [
          title,
          message,
          alert_type,
          target_barangay,
        ]
      );

    // CREATE AUDIT LOG
    await pool.query(
      `
      INSERT INTO audit_logs
      (
        action_type,
        description,
        performed_by
      )

      VALUES ($1, $2, $3)
      `,
      [
        "ALERT_CREATED",
        `Created ${alert_type} alert for ${target_barangay}`,
        "Admin User"
      ]
    );

    res.status(201).json({
      success: true,
      alert: newAlert.rows[0],
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      error: "Failed to create alert",
    });

  }

});

module.exports = router;