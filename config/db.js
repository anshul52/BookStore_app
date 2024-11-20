const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

async function connctDB() {
  try {
    await mongoose.connect(url);
    console.log("db is connected !!!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connctDB;
