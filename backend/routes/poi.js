const router = require("express").Router();

// Models
const POI = require("../models/Poi.js");

// Create POI

router.post("/", (req, res) => {
  const newPOI = new POI(req.body);
});

// Get POI
