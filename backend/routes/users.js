const router = require("express").Router();
const bcrypt = require("bcrypt");

// Models
const User = require("../models/User.js");

// Create User - Register

router.post("/register", async (req, res) => {
  try {
    // generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    // create a new user
    // save the user to db and send response
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
