const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
    unique: true,
  },
  url: {
    type: String,
    required: true,
  },
  grade: {
    type: [Number],
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  assessment: {
    type: String,
    require: true,
  },
  teacher: {
    type: String,
    require: true,
  },
});

module.exports = mongoose.model("File", fileSchema);
