const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// GET ALL RELIEF OPERATIONS
router.get("/", async (req, res) => {

  try {

    const operations =
      await pool.query(`
        SELECT *
        FROM relief_operations
        ORDER BY distribution_date DESC
      `);

    res.status(200).json({
      success: true,
      operations: operations.rows,
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      error:
        "Failed to fetch relief operations",
    });

  }

});


// CREATE RELIEF OPERATION
router.post("/", async (req, res) => {

  try {

    const {
      operation_name,
      barangay,
      relief_type,
      quantity,
      distributed_by,
      status,
    } = req.body;

    const newOperation =
      await pool.query(
        `
        INSERT INTO relief_operations
        (
          operation_name,
          barangay,
          relief_type,
          quantity,
          distributed_by,
          status
        )
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *
        `,
        [
          operation_name,
          barangay,
          relief_type,
          quantity,
          distributed_by,
          status,
        ]
      );

    res.status(201).json({
      success: true,
      operation:
        newOperation.rows[0],
    });

  } catch (error) {

    console.error(error.message);

    res.status(500).json({
      success: false,
      error:
        "Failed to create operation",
    });

  }

});

module.exports = router;