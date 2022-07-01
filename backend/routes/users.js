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
    const newUser = new User({
      username: res.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save the user to db and send response
    const user = await newUser.save();
    res.status(200).json(user.id);
    console.log("User Created");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
