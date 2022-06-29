const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected! 🐯");
  })
  .catch((err) => console.log(`MongoDB Error`, err));

app.listen(8080, () => {
  console.log(`Express server is running on Port 8080! 🐅`);
});
