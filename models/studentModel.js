const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  grade: {
    type: Number,
    default: 0,
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

module.exports = mongoose.model("Student", studentSchema);
