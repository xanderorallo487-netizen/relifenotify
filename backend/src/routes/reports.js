const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// GET ANALYTICS
router.get(
  "/analytics",
  async (req, res) => {

    try {

      // INCIDENTS
      const incidents =
        await pool.query(`
          SELECT *
          FROM incidents
          ORDER BY id ASC
        `);

      // ALERTS
      const alerts =
        await pool.query(`
          SELECT *
          FROM alerts
          ORDER BY id ASC
        `);

      // BENEFICIARIES
      const beneficiaries =
        await pool.query(`
          SELECT *
          FROM beneficiaries
          ORDER BY id ASC
        `);

      // RELIEF OPERATIONS
      const reliefOperations =
        await pool.query(`
          SELECT *
          FROM relief_operations
          ORDER BY id ASC
        `);

      res.status(200).json({

        success: true,

        totalIncidents:
          incidents.rows.length,

        totalAlerts:
          alerts.rows.length,

        totalBeneficiaries:
          beneficiaries.rows.length,

        totalReliefOperations:
          reliefOperations.rows.length,

        incidents:
          incidents.rows,

        alerts:
          alerts.rows,

        beneficiaries:
          beneficiaries.rows,

        reliefOperations:
          reliefOperations.rows,

      });

    } catch (error) {

      console.error(
        "Analytics Error:",
        error.message
      );

      res.status(500).json({

        success: false,
        message:
          "Failed to fetch analytics",

      });

    }

  }
);

module.exports = router;