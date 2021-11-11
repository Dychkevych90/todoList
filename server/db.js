const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(
   MONGO_URI,
    connectionParams
  );
  console.log("Connected to database.");
};