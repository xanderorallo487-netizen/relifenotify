const express = require("express");

const verifyToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", verifyToken, async (req, res) => {

  res.status(200).json({
    success: true,
    message: "Welcome Admin",
    user: req.user,
  });

});

module.exports = router;