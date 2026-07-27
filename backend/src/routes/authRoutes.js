const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pool = require("../config/db");

const router = express.Router();


// =========================
// REGISTER ADMIN OR STAFF
// =========================
router.post("/register", async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    // CHECK EMPTY FIELDS
    if (!full_name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // CHECK ROLE
    if (role !== "admin" && role !== "staff") {
      return res.status(400).json({
        success: false,
        message: "Invalid role",
      });
    }

    // CHECK EXISTING EMAIL
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // INSERT USER
    const newUser = await pool.query(
      `INSERT INTO users 
      (full_name, email, password, role)
      VALUES ($1, $2, $3, $4)
      RETURNING id, full_name, email, role`,
      [full_name, email, hashedPassword, role]
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: newUser.rows[0],
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});


// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // CHECK USER
    const user = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // CHECK PASSWORD
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // CREATE JWT TOKEN
    const token = jwt.sign(
      {
        id: user.rows[0].id,
        role: user.rows[0].role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.rows[0].id,
        full_name: user.rows[0].full_name,
        email: user.rows[0].email,
        role: user.rows[0].role,
      },
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;