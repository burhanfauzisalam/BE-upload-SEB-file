const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  jalan: {
    type: String,
    default: "",
  },
  rt: {
    type: Number,
    default: 0,
  },
  rw: {
    type: Number,
    default: 0,
  },
  kelurahan: {
    type: String,
    default: "",
  },
  kecamatan: {
    type: String,
    default: "",
  },
});

const teacherSchema = new mongoose.Schema({
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
  whatsapp: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    default: "",
  },
  domisili: {
    type: addressSchema,
    default: () => ({}), // Set default as a function returning a new object
  },
  alamat_kk: {
    type: addressSchema,
    default: () => ({}), // Set default as a function returning a new object
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
