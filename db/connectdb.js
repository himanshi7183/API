const mongoose = require("mongoose");


const connectdb = () => {
  return mongoose.connect(process.env.LIVE_URL)
    .then(() => {
      console.log("connected db successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectdb;
