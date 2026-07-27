const express = require("express");
const pool = require("../config/db");

const router = express.Router();


// =====================================
// GET ALL INVENTORY
// =====================================

router.get("/", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT *
      FROM supply_inventory_monitoring
      ORDER BY created_at DESC
    `);

    res.json(result.rows);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to fetch inventory"
    });

  }

});


// =====================================
// ADD SUPPLY ITEM
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

    const result = await pool.query(`
      INSERT INTO supply_inventory_monitoring
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
        $5,
        $6,
        $7,
        $8,
        $9,
        $10,
        $11,
        $12
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

    ]);

    res.status(201).json({

      message:
        "Supply item added successfully",

      data:
        result.rows[0]

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to add supply item"
    });

  }

});


// =====================================
// UPDATE INVENTORY
// =====================================

router.put("/:id", async (req, res) => {

  const { id } = req.params;

  const {

    quantity_available,
    inventory_status,
    remarks

  } = req.body;

  try {

    const result = await pool.query(`
      UPDATE supply_inventory_monitoring

      SET

        quantity_available = $1,
        inventory_status = $2,
        remarks = $3,

        updated_at = CURRENT_TIMESTAMP

      WHERE inventory_id = $4

      RETURNING *
    `,
    [

      quantity_available,
      inventory_status,
      remarks,

      id

    ]);

    if (result.rows.length === 0) {

      return res.status(404).json({
        error:
          "Inventory item not found"
      });

    }

    res.json({

      message:
        "Inventory updated successfully",

      data:
        result.rows[0]

    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to update inventory"
    });

  }

});


// =====================================
// DELETE INVENTORY ITEM
// =====================================

router.delete("/:id", async (req, res) => {

  const { id } = req.params;

  try {

    const result = await pool.query(`
      DELETE FROM supply_inventory_monitoring
      WHERE inventory_id = $1
      RETURNING *
    `,
    [id]);

    if (result.rows.length === 0) {

      return res.status(404).json({
        error:
          "Inventory item not found"
      });

    }

    res.json({
      message:
        "Inventory item deleted successfully"
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        "Failed to delete inventory item"
    });

  }

});

module.exports = router;