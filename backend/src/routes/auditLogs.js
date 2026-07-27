const express = require("express");
const router = express.Router();

const pool = require("../config/db");

// GET ALL AUDIT LOGS
router.get(
  "/",
  async (req, res) => {

    try {

      const result =
        await pool.query(`
          SELECT *
          FROM audit_logs
          ORDER BY created_at DESC
        `);

      res.status(200).json({

        success: true,
        logs: result.rows,

      });

    } catch (error) {

      console.error(
        "Audit Logs Error:",
        error.message
      );

      res.status(500).json({

        success: false,
        message:
          "Failed to fetch audit logs",

      });

    }

  }
);

// ADD NEW AUDIT LOG
router.post(
  "/create",
  async (req, res) => {

    try {

      const {

        action_type,
        description,
        performed_by,

      } = req.body;

      const result =
        await pool.query(
          `
          INSERT INTO audit_logs
          (
            action_type,
            description,
            performed_by
          )

          VALUES ($1, $2, $3)

          RETURNING *
          `,
          [
            action_type,
            description,
            performed_by,
          ]
        );

      res.status(201).json({

        success: true,
        log: result.rows[0],

      });

    } catch (error) {

      console.error(
        "Create Audit Log Error:",
        error.message
      );

      res.status(500).json({

        success: false,
        message:
          "Failed to create audit log",

      });

    }

  }
);

module.exports = router;