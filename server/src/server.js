const http = require("http");
const app = require("./app");

const { loadPlanetsData } = require("./models/planets.model");
const { mongoConnect } = require("./services/mongo");

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);

async function startServer() {
  try {
    await mongoConnect();
    await loadPlanetsData();

    server.listen(PORT, () => {
      console.log(`listening on port: ${PORT}`);
    });
  } catch (error) {
    console.log("error:", error.message);
  }
}

startServer();
