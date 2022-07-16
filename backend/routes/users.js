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
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // save the user to db and send response
    const user = await newUser.save();
    res.status(200).json(user._id);
    console.log("User Created");
  } catch (err) {
    console.log(`User Creation Error`, err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // locate user
    const user = await User.findOne({ username: req.body.username });

    // if user is not found
    !user && res.status(400).json("Incorrect login credentials!");

    // validate password
    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    !validatePassword && res.status(400).json("Incorrect login credentials!");

    // if validation is sucessful, send res
    res.status(200).json({ _id: user._id, username: username });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
