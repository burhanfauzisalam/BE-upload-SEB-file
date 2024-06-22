const userModel = require("../models/userModel.js");
const teacherModel = require("../models/teacherModel.js");
const studentModel = require("../models/studentModel.js");
const parentModel = require("../models/parentModel.js");
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
    const userAvailable = ["teacher", "admin", "parent"];
    const cekRole = userAvailable.includes(role);
    if (!cekRole) {
      return res.status(401).json({ message: "role undefined" });
    }
    const addUser = userModel({ name, username, password, role });
    await addUser.save();

    const userRole = addUser.role;

    const data = { name, username, password, role };
    if (userRole === "teacher") {
      const userID = addUser._id;
      const addTeacher = teacherModel({
        userID,
        ...data,
      });
      await addTeacher.save();
      res.status(201).json(addTeacher);
    }
    if (userRole === "parent") {
      const userID = addUser._id;
      const addParent = parentModel({
        userID,
        ...data,
      });
      await addParent.save();
      res.status(201).json(addParent);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userModel.findOne({ username, password });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    // const role = user.role;
    // let userLogin = null;
    // if (role === "teacher") {
    //   userLogin = await teacherModel
    //     .findOne({ userID: user._id })
    //     .select("-password");
    // }
    // if (role === "student") {
    //   userLogin = await studentModel
    //     .findOne({ userID: user._id })
    //     .select("-password");
    // }
    const id = user._id;
    const token = jwt.sign({ id, role: user.role }, process.env["KEY"], {
      expiresIn: "1h",
    });
    res.status(200).json({ token, role: user.role });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.userDecode = async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, process.env["KEY"]);
    res.status(200).json(decoded);
  } catch (error) {
    res.status(500).json(error);
  }
};
