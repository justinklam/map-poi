const router = require("express").Router();

// Models
const POI = require("../models/Poi.js");

// Create POI

router.post("/", async (req, res) => {
  const newPOI = new POI(req.body);
  try {
    // await savedPOI, if successful, it res.status(200)
    const savedPOI = await newPOI.save();
    res.status(200).json(savedPOI);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get All POI

router.get("/", async (req, res) => {
  try {
    // locate all POI
    const poi = await POI.find();
    res.status(200).json(poi);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
