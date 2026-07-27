const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../config/db");

const router = express.Router();


// GET CURRENT USER
router.get("/me", async (req, res) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const result =
      await pool.query(
        `
        SELECT
          id,
          fullname,
          email,
          role
        FROM users
        WHERE id = $1
        `,
        [decoded.id]
      );

    if (result.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    res.json(result.rows[0]);

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server error",
    });
  }
});


// UPDATE ACCOUNT SETTINGS
router.put("/update", async (req, res) => {

  try {

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        error: "Unauthorized",
      });
    }

    const token =
      authHeader.split(" ")[1];

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    const {
      fullname,
      email,
      currentPassword,
      newPassword,
    } = req.body;

    // GET USER
    const userResult =
      await pool.query(
        `
        SELECT *
        FROM users
        WHERE id = $1
        `,
        [decoded.id]
      );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const user =
      userResult.rows[0];

    let hashedPassword =
      user.password;

    // CHANGE PASSWORD
    if (
      currentPassword &&
      newPassword
    ) {

      const validPassword =
        await bcrypt.compare(
          currentPassword,
          user.password
        );

      if (!validPassword) {
        return res.status(400).json({
          error:
            "Current password is incorrect",
        });
      }

      hashedPassword =
        await bcrypt.hash(
          newPassword,
          10
        );
    }

    // UPDATE USER
    await pool.query(
      `
      UPDATE users
      SET
        fullname = $1,
        email = $2,
        password = $3
      WHERE id = $4
      `,
      [
        fullname,
        email,
        hashedPassword,
        decoded.id,
      ]
    );

    // AUDIT LOG
    await pool.query(
      `
      INSERT INTO audit_logs
      (
        user_id,
        action,
        description
      )
      VALUES
      ($1, $2, $3)
      `,
      [
        decoded.id,
        "UPDATE_ACCOUNT",
        `Updated account settings`,
      ]
    );

    res.json({
      message:
        "Account updated successfully",
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      error: "Server error",
    });
  }
});

module.exports = router;