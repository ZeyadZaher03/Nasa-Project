const http = require("http");
const app = require("./app");
const mongoose = require("mongoose");

const { loadPlanetsData } = require("./models/planets.model");

const PORT = process.env.PORT || 3001;

const MONGO_URL =
  "mongodb+srv://zeyadzaher02:txTkByUk9fpqIrff@nasa-cluster.guqcjo7.mongodb.net/?retryWrites=true&w=majority";

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
  console.error("error:", error);
});

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL);
    await loadPlanetsData();

    server.listen(PORT, () => {
      console.log(`listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log("error:", error.message);
  }
}

startServer();
