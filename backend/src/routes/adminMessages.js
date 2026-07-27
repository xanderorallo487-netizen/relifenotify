const express = require("express");

const router = express.Router();

const pool = require("../config/db");

// =====================================
// GET MESSAGES FOR STAFF
// =====================================

router.get("/:receiver_id", async (req, res) => {

  try {

    const { receiver_id } =
      req.params;

    const result =
      await pool.query(

        `
        SELECT *
        FROM admin_messages
        WHERE receiver_id = $1
        AND is_read = FALSE
        ORDER BY created_at DESC
        `,

        [receiver_id]

      );

    res.json(
      result.rows
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch messages"
    });

  }

});

// =====================================
// SEND MESSAGE (ADMIN -> STAFF)
// =====================================

router.post("/", async (req, res) => {

  try {

    const {

      sender_id,
      sender_name,

      receiver_id,

      message

    } = req.body;

    const result =
      await pool.query(

        `
        INSERT INTO admin_messages (

          sender_id,
          sender_name,

          receiver_id,

          message

        )

        VALUES ($1, $2, $3, $4)

        RETURNING *

        `,

        [

          sender_id,
          sender_name,

          receiver_id,

          message

        ]

      );

    res.json(
      result.rows[0]
    );

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to send message"
    });

  }

});

// =====================================
// STAFF REPLY TO ADMIN
// =====================================

router.post("/reply", async (req, res) => {

  try {

    const {

      sender_id,
      sender_name,

      receiver_id,

      message

    } = req.body;

    const result =
      await pool.query(

        `
        INSERT INTO admin_messages (

          sender_id,
          sender_name,

          receiver_id,

          message,

          is_read

        )

        VALUES ($1, $2, $3, $4, TRUE)

        RETURNING *

        `,

        [

          sender_id,
          sender_name,

          receiver_id,

          message

        ]

      );

    res.json({

      success: true,

      message:
        "Reply sent successfully",

      data:
        result.rows[0]

    });

  } catch (error) {

    console.error(
      "Reply error:",
      error
    );

    res.status(500).json({

      success: false,

      error:
        "Failed to send reply"

    });

  }

});

// =====================================
// MARK MESSAGE AS READ
// =====================================

router.put(
  "/read/:message_id",

  async (req, res) => {

    try {

      const { message_id } =
        req.params;

      await pool.query(

        `
        UPDATE admin_messages
        SET is_read = TRUE
        WHERE message_id = $1
        `,

        [message_id]

      );

      res.json({

        success: true,

        message:
          "Message marked as read"

      });

    } catch (error) {

      console.error(error);

      res.status(500).json({

        success: false,

        error:
          "Failed to update message"

      });

    }

  }

);

module.exports = router;