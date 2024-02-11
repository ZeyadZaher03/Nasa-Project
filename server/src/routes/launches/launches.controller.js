const {
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
  existsLaunchWithId,
} = require("../../models/launches.model");

const httpGetAllLaunches = (req, res) => {
  return res.status(200).json(getAllLaunches());
};

const httpAddNewLaunch = (req, res) => {
  try {
    const launch = req.body;
    const { mission, rocket, target, launchDate } = launch;
    if (!mission || !rocket || !target || !launchDate) {
      return res
        .status(400)
        .json({ error: "Missing required launch property" });
    }
    launch.launchDate = new Date(launch.launchDate);
    if (isNaN(launch.launchDate)) {
      return res.status(400).json({ error: "Invalid launch date" });
    }
    addNewLaunch(launch);
    return res.status(201).json(launch);
  } catch (error) {
    return res.status(500).json({ error: "something went wrong" });
  }
};

const httpAbortLaunch = (req, res) => {
  try {
    const launchId = Number(req.params.id);
    if (!launchId) {
      return res.status(400).json({ error: "missing launch id" });
    }

    if (!existsLaunchWithId(launchId)) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const aborted = abortLaunchById(launchId);
    return res.status(200).json(aborted);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong", error: error.message });
  }
};

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
