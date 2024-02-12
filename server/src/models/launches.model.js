const launchesDB = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchesDB.findOne({}).sort("-flightNumber");
  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }
  return latestLaunch.flightNumber;
};
getLatestFlightNumber();

const getAllLaunches = async () => {
  return await launchesDB.find({}, { _id: 0, __v: 0 });
};

const saveLaunch = async (launch) => {
  try {
    await launchesDB.findOneAndUpdate(
      { flightNumber: launch.flightNumber },
      launch,
      {
        upsert: true,
      }
    );
  } catch (error) {
    console.error(`Could not save launch`, error);
  }
};

const scheduleNewLaunch = async (launch) => {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planets were found");
  }

  const launchFlightNumber = (await getLatestFlightNumber()) + 1;
  const launchData = Object.assign(launch, {
    success: true,
    upcoming: true,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: launchFlightNumber,
  });

  return saveLaunch(launchData);
};

const existsLaunchWithId = async (launchId) => {
  return await launchesDB.findOne({ flightNumber: launchId });
};

const launch = {
  flightNumber: 100,
  mission: "Kepler Expoloration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customers: ["Nasa", "ZTM"],
  upcoming: true,
  success: true,
};

scheduleNewLaunch(launch);

const abortLaunchById = async (launchId) => {
  const aborted = await launchesDB.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.acknowledged === true && aborted.modifiedCount === 1;
};

module.exports = {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  existsLaunchWithId,
};
