const {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  existsLaunchWithId,
} = require("../../models/launches.model");

const httpGetAllLaunches = async (req, res) => {
  return res.status(200).json(await getAllLaunches());
};

const httpAddNewLaunch = async (req, res) => {
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
    await scheduleNewLaunch(launch);
    return res.status(201).json(launch);
  } catch (error) {
    return res
      .status(500)
      .json({ error: `something went wrong - ${error.message}` });
  }
};

const httpAbortLaunch = async (req, res) => {
  try {
    const launchId = Number(req.params.id);
    const existsLaunch = await existsLaunchWithId(launchId);

    if (!existsLaunch) {
      return res.status(404).json({ error: "Launch not found" });
    }

    const aborted = await abortLaunchById(launchId);
    if (!aborted) {
      return res.status(400).json({
        error: "Launch not aborted",
      });
    }
    return res.status(200).json({ ok: true });
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
