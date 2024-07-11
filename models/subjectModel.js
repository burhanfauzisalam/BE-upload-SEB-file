const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  subject: {
    type: String,
    require: true,
  },
  schoolYear: {
    type: String,
    require: true,
  },
  teacher: {
    type: String,
    require: true,
  },
  students: {
    type: Array,
    default: () => [],
  },
});

module.exports = mongoose.model("Subject", subjectSchema);
