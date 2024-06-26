const planets = require("./planets.mongo");

const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

const savePlanet = async (planet) => {
  try {
    await planets.findOneAndUpdate(
      {
        keplerName: planet.kepler_name,
      },
      {
        keplerName: planet.kepler_name,
      },
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Could not save the planet`, error);
  }
};

const getAllPlanets = async () => {
  return await planets.find({}, { _id: 0, __v: 0 });
};

const isHabitable = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
};

const loadPlanetsData = () => {
  new Promise((resolve, reject) => {
    fs.createReadStream(
      path.join(__dirname, "..", "..", "data", "kepler_data.csv")
    )
      .pipe(
        parse({
          comment: "#",
          columns: true,
        })
      )
      .on("data", async (data) => {
        if (isHabitable(data)) {
          await savePlanet(data);
        }
      })
      .on("error", (error) => {
        console.log(`error: ${error}`);
        reject(error);
      })
      .on("end", async () => {
        const countPlanetsFound = (await getAllPlanets()).length;
        console.log(`planets found: ${countPlanetsFound}`);
        resolve();
      });
  });
};

module.exports = { loadPlanetsData, getAllPlanets };
