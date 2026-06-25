const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const DBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected with MONGODB");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = DBConnection;
