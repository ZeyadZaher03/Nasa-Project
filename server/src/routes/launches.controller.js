const { getAllLaunches, addNewLaunch } = require("../models/launches.model");

const isDateValid = (dateStr) => !isNaN(new Date(dateStr));

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
  try {
    const { mission, rocket, target, launchDate } = req.body;
    if (!isDateValid(launchDate)) {
      return res.status(400).json({ error: "please enter a valid Date" });
    }
    if (!mission || !rocket || !target || !launchDate) {
      return res.status(400).json({ error: "missing value" });
    }
    const launch = {
      mission,
      rocket,
      target,
      launchDate: new Date(launchDate),
    };
    addNewLaunch(launch);
    return res.status(201).json({ launch });
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
};
