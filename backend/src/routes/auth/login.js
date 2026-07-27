const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool =
  require("../../config/db");

const router =
  express.Router();

// LOGIN ROUTE
router.post(
  "/",
  async (req, res) => {

    try {

      const {
        email,
        password,
      } = req.body;

      // =========================
      // CHECK USER
      // =========================
      const userResult =
        await pool.query(
          `
          SELECT *
          FROM users
          WHERE email = $1
          `,
          [email]
        );

      // USER NOT FOUND
      if (
        userResult.rows.length === 0
      ) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password",

        });

      }

      const user =
        userResult.rows[0];

      // =========================
      // CHECK PASSWORD
      // =========================
      const validPassword =
        await bcrypt.compare(
          password,
          user.password
        );

      // INVALID PASSWORD
      if (!validPassword) {

        return res.status(401).json({

          success: false,

          message:
            "Invalid email or password",

        });

      }

      // =========================
      // CREATE JWT TOKEN
      // =========================
      const token = jwt.sign(

        {
          id: user.id,
          role: user.role,
        },

        process.env.JWT_SECRET,

        {
          expiresIn: "1d",
        }

      );

      // =========================
      // CREATE AUDIT LOG
      // =========================
      if (
        user.role &&
        user.role.toLowerCase() === "admin"
      ) {

        await pool.query(
          `
          INSERT INTO audit_logs
          (
            action_type,
            description,
            performed_by
          )

          VALUES ($1, $2, $3)
          `,
          [

            "ADMIN_LOGIN",

            `${user.full_name} logged into admin dashboard`,

            user.full_name,

          ]
        );

      } else {

        await pool.query(
          `
          INSERT INTO audit_logs
          (
            action_type,
            description,
            performed_by
          )

          VALUES ($1, $2, $3)
          `,
          [

            "STAFF_LOGIN",

            `${user.full_name} logged into staff dashboard`,

            user.full_name,

          ]
        );

      }

      // =========================
      // SUCCESS RESPONSE
      // =========================
      res.status(200).json({

        success: true,

        message:
          "Login successful",

        token,

        user: {

          id: user.id,

          full_name:
            user.full_name,

          email:
            user.email,

          role:
            user.role,

        },

      });

    } catch (error) {

      console.error(
        "Login Error:",
        error.message
      );

      res.status(500).json({

        success: false,

        error:
          "Server error",

      });

    }

  }
);

module.exports = router;