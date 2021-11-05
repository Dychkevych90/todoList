const mongoose = require("mongoose");

module.exports = async () => {
  const connectionParams = {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(
    "mongodb://localhost/tasks",
    connectionParams
  );
  console.log("Connected to database.");
};