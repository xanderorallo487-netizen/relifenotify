const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL SUPPLIES
// =====================================

router.get("/", async (req, res) => {

  try {

    const inventory =
      await pool.query(`
        SELECT *
        FROM supply_inventory_monitoring
        ORDER BY created_at DESC
      `);

    res.json(
      inventory.rows
    );

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch inventory"
    });

  }

});


// =====================================
// ADD NEW SUPPLY
// =====================================

router.post("/", async (req, res) => {

  const {

    barangay_id,
    officer_id,

    barangay_name,
    municipality,

    supply_name,

    supply_category,

    quantity_available,

    unit_measurement,

    storage_location,

    expiration_date,

    inventory_status,

    remarks

  } = req.body;

  try {

    const newSupply =
      await pool.query(`
        INSERT INTO
        supply_inventory_monitoring
        (

          barangay_id,
          officer_id,

          barangay_name,
          municipality,

          supply_name,

          supply_category,

          quantity_available,

          unit_measurement,

          storage_location,

          expiration_date,

          inventory_status,

          remarks

        )

        VALUES
        (
          $1,$2,
          $3,$4,
          $5,$6,
          $7,$8,
          $9,$10,
          $11,$12
        )

        RETURNING *
      `,
      [

        barangay_id,
        officer_id,

        barangay_name,
        municipality,

        supply_name,

        supply_category,

        quantity_available,

        unit_measurement,

        storage_location,

        expiration_date,

        inventory_status,

        remarks

      ]
    );

    res.status(201).json({

      message:
        "Supply added successfully",

      supply:
        newSupply.rows[0]

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to add supply"
    });

  }

});


// =====================================
// DELETE SUPPLY
// =====================================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const deletedSupply =
      await pool.query(`
        DELETE FROM
        supply_inventory_monitoring

        WHERE inventory_id = $1

        RETURNING *
      `,
      [id]
    );

    if (
      deletedSupply.rows.length === 0
    ) {

      return res.status(404).json({
        error:
          "Supply not found"
      });

    }

    res.json({

      message:
        "Supply deleted successfully"

    });

  }
  catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to delete supply"
    });

  }

});

module.exports = router;