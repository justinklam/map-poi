const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.listen(8080, () => {
  console.log(`Express server is running on Port 8080! 🐅`);
});
