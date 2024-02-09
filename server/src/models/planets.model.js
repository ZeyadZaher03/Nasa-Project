const { parse } = require("csv-parse");
const fs = require("fs");
const path = require("path");

let habitablePlanets = [];

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
      .on("data", (data) => {
        if (isHabitable(data)) {
          habitablePlanets.push(data);
        }
      })
      .on("error", (error) => {
        console.log(`error: ${error}`);
        reject(error);
      })
      .on("end", () => {
        console.log(`done`);
        resolve();
      });
  });
};

module.exports = { loadPlanetsData, planets: habitablePlanets };
