const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const router = require("./routes/router");

const app = express();

const port = process.env["PORT"];
const mongoString = process.env["DATABASE_URL"];

mongoose.connect(mongoString);
const database = mongoose.connection;
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Service is online on port ${port}`);
});
