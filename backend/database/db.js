const mongoose = require("mongoose");

const dbConnection = async () => {
  mongoose.set("useCreateIndex", true);

  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("db is connected");
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = dbConnection;
