const router = require("express").Router();

// Models
const User = require("../models/User.js");

// Create User - Register

router.post("/register", async (req, res) => {
  try {
    // generate new password
    // create a new user
    // save the user to db and send response
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
