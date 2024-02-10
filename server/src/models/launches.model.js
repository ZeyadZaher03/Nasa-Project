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

module.exports = {
  launches,
  getAllLaunches,
  addNewLaunch,
};

[
  {
    flightNumber: 100,
    mission: "Kepler Expoloration X",
    rocket: "Explorer IS1",
    launchDate: "2030-12-26T22:00:00.000Z",
    target: "Kepler-442 b",
    customers: ["Nasa", "ZTM"],
    upcoming: true,
    success: true,
  },
  {
    flightNumber: 101,
    mission: "ZOX",
    rocket: "Explorer IS1",
    target: "Kepler-1652 b",
    launchDate: "2024-02-10T00:00:00.000Z",
    customers: ["Nasa", "ZTM"],
    success: true,
    upcoming: true,
  },
];
