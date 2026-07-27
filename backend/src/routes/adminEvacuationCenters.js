const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL EVACUATION CENTERS
// =====================================

router.get("/", async (req, res) => {

  try {

    const result =
      await pool.query(`
        SELECT *
        FROM evacuation_centers
        ORDER BY created_at DESC
      `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch evacuation centers"
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

    const result =
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
          $1,$2,$3,
          $4,
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

      ]);

    res.status(201).json({

      message:
        "Evacuation center added successfully",

      center:
        result.rows[0]

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to add evacuation center"
    });

  }

});


// =====================================
// UPDATE EVACUATION CENTER
// =====================================

router.put("/:id", async (req, res) => {

  const { id } = req.params;

  const {

    total_capacity,
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

    const result =
      await pool.query(`
        UPDATE evacuation_centers

        SET

          total_capacity = $1,
          current_occupancy = $2,

          available_food_packs = $3,
          available_water_boxes = $4,
          available_medicine_kits = $5,
          available_blankets = $6,

          incoming_evacuees = $7,

          emergency_needs = $8,

          status = $9,

          updated_at = CURRENT_TIMESTAMP

        WHERE evacuation_id = $10

        RETURNING *
      `,
      [

        total_capacity,
        current_occupancy,

        available_food_packs,
        available_water_boxes,
        available_medicine_kits,
        available_blankets,

        incoming_evacuees,

        emergency_needs,

        status,

        id

      ]);

    res.json({

      message:
        "Evacuation center updated successfully",

      center:
        result.rows[0]

    });

  } catch (error) {

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

    await pool.query(`
      DELETE FROM evacuation_centers
      WHERE evacuation_id = $1
    `, [id]);

    res.json({

      message:
        "Evacuation center deleted successfully"

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to delete evacuation center"
    });

  }

});

module.exports = router;