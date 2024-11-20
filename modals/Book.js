const mongoose = require("mongoose");

const newBook = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  price: { type: Number, required: true },
  auther: { type: String, required: true },
  LaunchedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Book", newBook);
