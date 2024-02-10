const launches = new Map();

let latestFlightNumber = 100;

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

launches.set(launch.flightNumber, launch);

const getAllLaunches = () => Array.from(launches.values());

const addNewLaunch = (launch) => {
  latestFlightNumber++;
  const newLaunch = {
    flightNumber: latestFlightNumber,
    ...launch,
    customers: ["Nasa", "ZTM"],
    success: true,
    upcoming: true,
  };
  launches.set(latestFlightNumber, newLaunch);
};

const getLaunchById = (launchId) => launches.get(launchId);

const existsLaunchWithId = (launchId) => launches.has(launchId);

const abortLaunchById = (launchId) => {
  const launch = getLaunchById(launchId);
  launch.upcoming = false;
  launch.success = false;
  return launch;
};

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
  existsLaunchWithId,
};
