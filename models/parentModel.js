const mongoose = require("mongoose");

const parentSchema = new mongoose.Schema({
  userID: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
    unique: true,
  },
  username: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  role: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("Parent", parentSchema);
