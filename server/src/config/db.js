const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectDB = async (options = {}) => {
  try {
    await mongoose.connect(mongodbURL, options);
    console.log("Connection to db is successfully");

    mongoose.connection.on("error", (error) => {
      console.error("Db connection error", error);
    });
  } catch (error) {
    console.error("Could not connect to db", error.toSting);
  }
};
module.exports ={
    connectDB
}
