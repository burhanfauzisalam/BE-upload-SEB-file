const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  parentID: {
    type: String,
    require: true,
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
  nisn: {
    type: String,
    default: "",
  },
  nis: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  whatsapp: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Student", studentSchema);
