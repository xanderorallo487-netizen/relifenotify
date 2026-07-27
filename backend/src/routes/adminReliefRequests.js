const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL RELIEF REQUESTS
// =====================================

router.get("/", async (req, res) => {

  try {

    const requests =
      await pool.query(`
        SELECT *
        FROM relief_requests
        ORDER BY requested_at DESC
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
// APPROVE REQUEST
// =====================================

router.put("/approve/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const approvedRequest =
      await pool.query(`
        UPDATE relief_requests

        SET

          status = 'Approved',
          updated_at = CURRENT_TIMESTAMP

        WHERE request_id = $1

        RETURNING *
      `,
      [id]
    );

    if (
      approvedRequest.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Request not found"
      });

    }

    res.json({

      message:
        "Relief request approved successfully",

      request:
        approvedRequest.rows[0]

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to approve request"
    });

  }

});


// =====================================
// REJECT REQUEST
// =====================================

router.put("/reject/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const rejectedRequest =
      await pool.query(`
        UPDATE relief_requests

        SET

          status = 'Rejected',
          updated_at = CURRENT_TIMESTAMP

        WHERE request_id = $1

        RETURNING *
      `,
      [id]
    );

    if (
      rejectedRequest.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Request not found"
      });

    }

    res.json({

      message:
        "Relief request rejected successfully",

      request:
        rejectedRequest.rows[0]

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to reject request"
    });

  }

});


// =====================================
// MARK AS COMPLETED
// =====================================

router.put("/complete/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const completedRequest =
      await pool.query(`
        UPDATE relief_requests

        SET

          status = 'Completed',
          updated_at = CURRENT_TIMESTAMP

        WHERE request_id = $1

        RETURNING *
      `,
      [id]
    );

    if (
      completedRequest.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Request not found"
      });

    }

    res.json({

      message:
        "Relief request marked as completed",

      request:
        completedRequest.rows[0]

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to complete request"
    });

  }

});

module.exports = router;