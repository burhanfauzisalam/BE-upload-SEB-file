const userModel = require("../models/userModel.js");
const teacherModel = require("../models/teacherModel.js");
const studentModel = require("../models/studentModel.js");
const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.allUser = async (req, res) => {
  try {
    const data = await userModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addUser = async (req, res) => {
  try {
    const { name, username, password, role } = req.body;
    const user = await userModel.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "user already exist." });
    }
    const userAvailable = ["teacher", "student", "admin"];
    const cekRole = userAvailable.includes(role);
    if (!cekRole) {
      return res.status(401).json({ message: "role undefined" });
    }
    const addUser = userModel({ name, username, password, role });
    await addUser.save();

    const userRole = addUser.role;

    if (userRole === "teacher") {
      const userID = addUser._id;
      const addTeacher = teacherModel({
        userID,
        name,
        username,
        password,
        role,
      });
      await addTeacher.save();
      res.status(201).json(addTeacher);
    }
    if (userRole === "student") {
      const userID = addUser._id;
      const addStudent = studentModel({
        userID,
        name,
        username,
        password,
        role,
      });
      await addStudent.save();
      res.status(201).json(addStudent);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel
      .findOne({ username, password })
      .select("-password");
    if (!user) {
      return res.status(400).json({ message: "user nor found" });
    }
    const token = jwt.sign({ user }, process.env["KEY"], {
      expiresIn: "1m",
    });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.userDecode = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env["KEY"]);
    res.status(200).json(decoded.user);
  } catch (error) {
    res.status(500).json(error);
  }
};
