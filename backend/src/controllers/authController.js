const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;

    // CHECK IF USER EXISTS
    const userExists = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // INSERT USER
    const newUser = await pool.query(
      `INSERT INTO users (full_name, email, password, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, role`,
      [full_name, email, hashedPassword, role || "staff"]
    );

    // TOKEN
    const token = generateToken(
      newUser.rows[0].id,
      newUser.rows[0].role
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: newUser.rows[0],
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // FIND USER
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const user = userResult.rows[0];

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // GENERATE TOKEN
    const token = generateToken(user.id, user.role);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};