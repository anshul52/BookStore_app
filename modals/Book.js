const mongoose = require("mongoose");

const newBook = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    // author: { type: String, required: true },
    author_id: { type: mongoose.Schema.Types.ObjectId, ref: "Author" },
    LaunchedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtuals
newBook.virtual("discountedPrice").get(function () {
  return this.price - this.price * (8 / 100);
});

module.exports = mongoose.model("Book", newBook);
