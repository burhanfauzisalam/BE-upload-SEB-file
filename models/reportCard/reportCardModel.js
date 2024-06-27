const mongoose = require("mongoose");

const rubricSchema = new mongoose.Schema({
  item: { type: String, default: 0 },
  semester1: { type: Number, default: 0 },
  semester2: { type: Number, default: 0 },
});

const reportCardSchema = new mongoose.Schema({
  schoolYear: {
    type: String,
    default: 0,
  },
  subject: {
    type: String,
    require: true,
  },
  teacher: {
    type: String,
    default: 0,
  },
  studentID: {
    type: String,
    default: 0,
  },
  rubrics: [rubricSchema],
});

module.exports = mongoose.model("Report", reportCardSchema);
