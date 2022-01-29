const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const dataSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  hobby: {
    type: String,
  },
  club: {
    type: String,
  },
});
const User = mongoose.model("User", userSchema);
const Data = mongoose.model("Data", dataSchema);
//module.exports = mongoose.model("user", userSchema);
module.exports = { User, Data };
