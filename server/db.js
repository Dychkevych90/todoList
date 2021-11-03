const mongoose = require("mongoose");

module.exports = async (uri, callback) => {
  try {
    const connectionParams = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect("mongodb://localhost/task", {useNewUrlParser: true});
    console.log("Connected to database.");
  } catch (error) {
    console.log("Could not connect to database.", error);
  }
};