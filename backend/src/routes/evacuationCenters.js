const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL EVACUATION CENTERS
// =====================================

router.get("/", async (req, res) => {

  try {

    const centers =
      await pool.query(`
        SELECT *
        FROM evacuation_centers
        ORDER BY evacuation_id ASC
      `);

    res.json(
      centers.rows
    );

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch evacuation centers"
    });

  }

});


// =====================================
// GET SINGLE EVACUATION CENTER
// =====================================

router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const center =
      await pool.query(`
        SELECT *
        FROM evacuation_centers
        WHERE evacuation_id = $1
      `,
      [id]
    );

    if (
      center.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Evacuation center not found"
      });

    }

    res.json(
      center.rows[0]
    );

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch evacuation center"
    });

  }

});


// =====================================
// CREATE EVACUATION CENTER
// =====================================

router.post("/", async (req, res) => {

  const {

    center_name,
    barangay,
    municipality,
    address,

    total_capacity,
    current_occupancy,

    available_food_packs,
    available_water_boxes,
    available_medicine_kits,
    available_blankets,

    incoming_evacuees,

    emergency_needs,

    status,

    contact_person,
    contact_number

  } = req.body;

  try {

    const newCenter =
      await pool.query(`
        INSERT INTO evacuation_centers
        (
          center_name,
          barangay,
          municipality,
          address,

          total_capacity,
          current_occupancy,

          available_food_packs,
          available_water_boxes,
          available_medicine_kits,
          available_blankets,

          incoming_evacuees,

          emergency_needs,

          status,

          contact_person,
          contact_number
        )

        VALUES
        (
          $1,$2,$3,$4,
          $5,$6,
          $7,$8,$9,$10,
          $11,
          $12,
          $13,
          $14,$15
        )

        RETURNING *

      `,
      [

        center_name,
        barangay,
        municipality,
        address,

        total_capacity,
        current_occupancy,

        available_food_packs,
        available_water_boxes,
        available_medicine_kits,
        available_blankets,

        incoming_evacuees,

        emergency_needs,

        status,

        contact_person,
        contact_number

      ]
    );

    res.status(201).json({

      message:
        "Evacuation center created successfully",

      center:
        newCenter.rows[0]

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to create evacuation center"
    });

  }

});


// =====================================
// UPDATE EVACUATION CENTER
// =====================================

router.put("/:id", async (req, res) => {

  const { id } = req.params;

  const {

    current_occupancy,

    available_food_packs,
    available_water_boxes,
    available_medicine_kits,
    available_blankets,

    incoming_evacuees,

    emergency_needs,

    status

  } = req.body;

  try {

    const updatedCenter =
      await pool.query(`
        UPDATE evacuation_centers

        SET

          current_occupancy = $1,

          available_food_packs = $2,
          available_water_boxes = $3,
          available_medicine_kits = $4,
          available_blankets = $5,

          incoming_evacuees = $6,

          emergency_needs = $7,

          status = $8,

          updated_at = CURRENT_TIMESTAMP

        WHERE evacuation_id = $9

        RETURNING *

      `,
      [

        current_occupancy,

        available_food_packs,
        available_water_boxes,
        available_medicine_kits,
        available_blankets,

        incoming_evacuees,

        emergency_needs,

        status,

        id

      ]
    );

    if (
      updatedCenter.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Evacuation center not found"
      });

    }

    res.json({

      message:
        "Evacuation center updated successfully",

      center:
        updatedCenter.rows[0]

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to update evacuation center"
    });

  }

});


// =====================================
// DELETE EVACUATION CENTER
// =====================================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const deletedCenter =
      await pool.query(`
        DELETE FROM evacuation_centers
        WHERE evacuation_id = $1
        RETURNING *
      `,
      [id]
    );

    if (
      deletedCenter.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Evacuation center not found"
      });

    }

    res.json({

      message:
        "Evacuation center deleted successfully"

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to delete evacuation center"
    });

  }

});

module.exports = router;