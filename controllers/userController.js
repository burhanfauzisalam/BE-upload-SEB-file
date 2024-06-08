const userModel = require("../models/userModel.js");
const teacherModel = require("../models/teacherModel.js");
const studentModel = require("../models/studentModel.js");

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
    // if (role !== "teacher" || role !== "student" || role !== "admin") {
    //   return res.status(400).json({ message: "role undefined" });
    // }
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
