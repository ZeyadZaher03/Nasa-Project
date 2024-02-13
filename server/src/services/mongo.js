const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://zeyadzaher02:txTkByUk9fpqIrff@nasa-cluster.guqcjo7.mongodb.net/?retryWrites=true&w=majority";

// mongoose.connection.once("open", () => {
//   console.log("MongoDB connection ready!");
// });

// mongoose.connection.on("error", (error) => {
//   console.error("error:", error);
// });

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};

const mongoDisconnect = async () => {
  await mongoose.disconnect();
};

module.exports = {
  mongoConnect,
  mongoDisconnect,
};
