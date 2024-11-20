const express = require("express");
require("dotenv").config();
const connctDB = require("./config/db");
const router = require("./routes/index.js");
const logger = require("morgan");
const port = 4000;
const app = express();

connctDB();
app.use(express.json());
app.use(logger("dev"));
app.use("/api/v1", router);

app.listen(port, () => {
  console.log(`server is running ont the port :  ${port}`);
});
