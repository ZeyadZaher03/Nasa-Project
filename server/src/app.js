const express = require("express");
const cors = require("cors");

const planetRouter = require("./routes/planets.router");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());

// planets
app.use("/planets", planetRouter);

module.exports = app;
