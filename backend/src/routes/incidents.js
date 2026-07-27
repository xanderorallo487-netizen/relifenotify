const express = require("express");
const pool = require("../config/db");

const router = express.Router();



// GET ALL INCIDENTS
router.get("/", async (req, res) => {

  try {

    const incidents = await pool.query(`
      SELECT *
      FROM incidents
      ORDER BY created_at DESC
    `);

    res.status(200).json({
      success: true,
      incidents: incidents.rows,
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      error: "Failed to fetch incidents",
    });

  }

});



// APPROVE INCIDENT
router.put(
  "/approve/:id",
  async (req, res) => {

    try {

      const { id } = req.params;

      // UPDATE INCIDENT
      await pool.query(
        `
        UPDATE incidents
        SET verification_status = 'Approved'
        WHERE id = $1
        `,
        [id]
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
          "INCIDENT_APPROVED",
          `Incident ID ${id} was approved`,
          "Admin User"
        ]
      );

      res.status(200).json({
        success: true,
        message: "Incident approved successfully",
      });

    } catch (error) {

      console.error(error.message);

      res.status(500).json({
        success: false,
        error: "Failed to approve incident",
      });

    }

  }
);



// REJECT INCIDENT
router.put(
  "/reject/:id",
  async (req, res) => {

    try {

      const { id } = req.params;

      // UPDATE INCIDENT
      await pool.query(
        `
        UPDATE incidents
        SET verification_status = 'Rejected'
        WHERE id = $1
        `,
        [id]
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
          "INCIDENT_REJECTED",
          `Incident ID ${id} was rejected`,
          "Admin User"
        ]
      );

      res.status(200).json({
        success: true,
        message: "Incident rejected successfully",
      });

    } catch (error) {

      console.error(error.message);

      res.status(500).json({
        success: false,
        error: "Failed to reject incident",
      });

    }

  }
);



// VERIFY INCIDENT
router.put(
  "/verify/:id",
  async (req, res) => {

    try {

      const { id } = req.params;

      // UPDATE INCIDENT
      await pool.query(
        `
        UPDATE incidents
        SET verification_status = 'Verified'
        WHERE id = $1
        `,
        [id]
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
          "INCIDENT_VERIFIED",
          `Incident ID ${id} was verified`,
          "Admin User"
        ]
      );

      res.status(200).json({
        success: true,
        message: "Incident verified successfully",
      });

    } catch (error) {

      console.error(error.message);

      res.status(500).json({
        success: false,
        error: "Failed to verify incident",
      });

    }

  }
);



module.exports = router;