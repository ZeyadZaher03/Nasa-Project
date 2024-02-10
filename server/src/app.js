const express = require("express");
const cors = require("cors");
const path = require("path");
var morgan = require("morgan");

const planetRouter = require("./routes/planets.router");
const launchesRouter = require("./routes/launches.router");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(morgan("combined"));

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

// planets
app.use("/planets", planetRouter);
app.use("/launches", launchesRouter);

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

module.exports = app;
