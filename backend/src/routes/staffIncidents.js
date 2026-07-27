const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL INCIDENTS
// =====================================

router.get("/", async (req, res) => {

  try {

    const incidents =
      await pool.query(
        `
        SELECT *
        FROM incidents
        ORDER BY id ASC
        `
      );

    res.json(
      incidents.rows
    );

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch incidents"
    });

  }

});


// =====================================
// GET SINGLE INCIDENT
// =====================================

router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const incident =
      await pool.query(
        `
        SELECT *
        FROM incidents
        WHERE id = $1
        `,
        [id]
      );

    if (
      incident.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Incident not found"
      });

    }

    res.json(
      incident.rows[0]
    );

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch incident"
    });

  }

});


// =====================================
// UPDATE INCIDENT STATUS
// =====================================

router.put("/:id/status", async (req, res) => {

  const { id } = req.params;

  const { status } = req.body;

  try {

    const updatedIncident =
      await pool.query(
        `
        UPDATE incidents
        SET status = $1
        WHERE id = $2
        RETURNING *
        `,
        [status, id]
      );

    if (
      updatedIncident.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Incident not found"
      });

    }

    res.json({
      message:
        "Incident status updated successfully",

      incident:
        updatedIncident.rows[0]
    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to update incident"
    });

  }

});


// =====================================
// DELETE INCIDENT
// =====================================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const deletedIncident =
      await pool.query(
        `
        DELETE FROM incidents
        WHERE id = $1
        RETURNING *
        `,
        [id]
      );

    if (
      deletedIncident.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Incident not found"
      });

    }

    res.json({
      message:
        "Incident deleted successfully"
    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to delete incident"
    });

  }

});


module.exports = router;