const express = require("express");
const pool = require("../config/db");
const QRCode = require("qrcode");

const router = express.Router();


// GET ALL BENEFICIARIES
router.get("/", async (req, res) => {

  try {

    const beneficiaries =
      await pool.query(`
        SELECT *
        FROM beneficiaries
        ORDER BY created_at DESC
      `);

    res.status(200).json({
      success: true,
      beneficiaries:
        beneficiaries.rows,
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      error:
        "Failed to fetch beneficiaries",
    });

  }

});


// GENERATE QR CODE
router.get(
  "/qr/:code",
  async (req, res) => {

    try {

      const {
        code,
      } = req.params;

      const qrImage =
        await QRCode.toDataURL(
          code
        );

      res.status(200).json({
        success: true,
        qr: qrImage,
      });

    } catch (error) {

      console.error(error.message);

      res.status(500).json({
        success: false,
        error:
          "QR generation failed",
      });

    }

  }
);


// CLAIM BENEFICIARY
router.put(
  "/claim/:id",
  async (req, res) => {

    try {

      const { id } =
        req.params;

      // CHECK STATUS
      const beneficiary =
        await pool.query(
          `
          SELECT *
          FROM beneficiaries
          WHERE id = $1
          `,
          [id]
        );

      if (
        beneficiary.rows.length ===
        0
      ) {

        return res.status(404).json({
          success: false,
          error:
            "Beneficiary not found",
        });

      }

      const beneficiaryData =
        beneficiary.rows[0];

      // UPDATE STATUS
      await pool.query(
        `
        UPDATE beneficiaries
        SET relief_status = 'Claimed'
        WHERE id = $1
        `,
        [id]
      );

      // INSERT CLAIM RECORD
      await pool.query(
        `
        INSERT INTO relief_claims
        (
          beneficiary_id,
          claimed_by
        )

        VALUES ($1, $2)
        `,
        [id, "Relief Staff"]
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
          "RELIEF_CLAIMED",
          `${beneficiaryData.full_name} claimed relief assistance`,
          "Relief Staff"
        ]
      );

      res.status(200).json({
        success: true,
        message:
          "Relief claimed successfully",
      });

    } catch (error) {

      console.error(error.message);

      res.status(500).json({
        success: false,
        error:
          "Claim verification failed",
      });

    }

  }
);

module.exports = router;