const mongoose = require("mongoose");

const inputValue = new mongoose.Schema({
  item: {
    type: String,
    default: 0,
  },
  semester1: {
    type: [Number],
    default: Array(20).fill(0),
  },
  semester2: {
    type: [Number],
    default: Array(20).fill(0),
  },
});
const inputModel = new mongoose.Schema({
  schoolYear: {
    type: String,
    default: 0,
  },
  subject: {
    type: String,
    default: 0,
  },
  teacher: {
    type: String,
    default: 0,
  },
  studentID: {
    type: String,
    default: 0,
  },
  rubrics: {
    type: [inputValue],
    default: () => [],
  },
});

module.exports = mongoose.model("rawReport", inputModel);
