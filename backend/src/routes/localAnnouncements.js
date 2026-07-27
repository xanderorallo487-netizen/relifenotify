const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL ANNOUNCEMENTS
// =====================================

router.get("/", async (req, res) => {

  try {

    const announcements =
      await pool.query(`
        SELECT *
        FROM local_announcements
        ORDER BY posted_at DESC
      `);

    res.json(
      announcements.rows
    );

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch announcements"
    });

  }

});


// =====================================
// CREATE ANNOUNCEMENT
// =====================================

router.post("/", async (req, res) => {

  const {

    barangay_id,
    officer_id,

    barangay_name,
    municipality,

    title,
    content,

    category,
    priority_level,

    attachment,
    status

  } = req.body;

  try {

    const newAnnouncement =
      await pool.query(`
        INSERT INTO local_announcements
        (
          barangay_id,
          officer_id,

          barangay_name,
          municipality,

          title,
          content,

          category,
          priority_level,

          attachment,
          status
        )

        VALUES
        (
          $1,$2,
          $3,$4,
          $5,$6,
          $7,$8,
          $9,$10
        )

        RETURNING *
      `,
      [

        barangay_id,
        officer_id,

        barangay_name,
        municipality,

        title,
        content,

        category,
        priority_level,

        attachment,
        status

      ]
    );

    res.status(201).json({

      message:
        "Announcement posted successfully",

      announcement:
        newAnnouncement.rows[0]

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to create announcement"
    });

  }

});


// =====================================
// UPDATE ANNOUNCEMENT
// =====================================

router.put("/:id", async (req, res) => {

  const { id } = req.params;

  const {

    title,
    content,

    category,
    priority_level,

    status

  } = req.body;

  try {

    const updatedAnnouncement =
      await pool.query(`
        UPDATE local_announcements

        SET

          title = $1,
          content = $2,

          category = $3,
          priority_level = $4,

          status = $5,

          updated_at = CURRENT_TIMESTAMP

        WHERE announcement_id = $6

        RETURNING *
      `,
      [

        title,
        content,

        category,
        priority_level,

        status,

        id

      ]
    );

    if (
      updatedAnnouncement.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Announcement not found"
      });

    }

    res.json({

      message:
        "Announcement updated successfully",

      announcement:
        updatedAnnouncement.rows[0]

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to update announcement"
    });

  }

});


// =====================================
// DELETE ANNOUNCEMENT
// =====================================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const deletedAnnouncement =
      await pool.query(`
        DELETE FROM local_announcements
        WHERE announcement_id = $1
        RETURNING *
      `,
      [id]
    );

    if (
      deletedAnnouncement.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Announcement not found"
      });

    }

    res.json({

      message:
        "Announcement deleted successfully"

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to delete announcement"
    });

  }

});

module.exports = router;