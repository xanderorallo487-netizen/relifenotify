const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL REQUESTS
// =====================================

router.get("/", async (req, res) => {

  try {

    const requests =
      await pool.query(`
        SELECT *
        FROM relief_requests
        ORDER BY request_id ASC
      `);

    res.json(
      requests.rows
    );

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch relief requests"
    });

  }

});


// =====================================
// CREATE REQUEST
// =====================================

router.post("/", async (req, res) => {

  const {

    barangay_id,
    officer_id,
    barangay_name,
    municipality,

    request_type,

    title,
    description,

    quantity_requested,

    urgency_level,

    contact_person,
    contact_number

  } = req.body;

  try {

    const newRequest =
      await pool.query(`
        INSERT INTO relief_requests
        (
          barangay_id,
          officer_id,
          barangay_name,
          municipality,

          request_type,

          title,
          description,

          quantity_requested,

          urgency_level,

          contact_person,
          contact_number
        )

        VALUES
        (
          $1,$2,$3,$4,
          $5,
          $6,$7,
          $8,
          $9,
          $10,$11
        )

        RETURNING *

      `,
      [

        barangay_id,
        officer_id,
        barangay_name,
        municipality,

        request_type,

        title,
        description,

        quantity_requested,

        urgency_level,

        contact_person,
        contact_number

      ]
    );

    res.status(201).json({

      message:
        "Relief request submitted successfully",

      request:
        newRequest.rows[0]

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to submit relief request"
    });

  }

});


// =====================================
// UPDATE REQUEST STATUS
// =====================================

router.put("/:id/status", async (req, res) => {

  const { id } = req.params;

  const { status } = req.body;

  try {

    const updatedRequest =
      await pool.query(`
        UPDATE relief_requests

        SET
          status = $1,
          updated_at = CURRENT_TIMESTAMP

        WHERE request_id = $2

        RETURNING *
      `,
      [status, id]
    );

    if (
      updatedRequest.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Relief request not found"
      });

    }

    res.json({

      message:
        "Request updated successfully",

      request:
        updatedRequest.rows[0]

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to update request"
    });

  }

});


// =====================================
// DELETE REQUEST
// =====================================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const deletedRequest =
      await pool.query(`
        DELETE FROM relief_requests
        WHERE request_id = $1
        RETURNING *
      `,
      [id]
    );

    if (
      deletedRequest.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Request not found"
      });

    }

    res.json({

      message:
        "Request deleted successfully"

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to delete request"
    });

  }

});

module.exports = router;