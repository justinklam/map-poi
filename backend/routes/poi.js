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
    console.log("POI Saved ");
  } catch (err) {
    console.log("POI Save Error");
    res.status(500).json(err);
  }
});

// Get All POI

router.get("/", async (req, res) => {
  try {
    // locate all POI
    const poi = await POI.find();
    res.status(200).json(poi);
    console.log("POI found");
  } catch (err) {
    console.log("POI cannot be found Error");
    res.status(500).json(err);
  }
});

module.exports = router;
