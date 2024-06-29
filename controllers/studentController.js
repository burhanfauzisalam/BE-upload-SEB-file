const studentModel = require("../models/studentModel.js");
const jwt = require("jsonwebtoken");

exports.listStudent = async (req, res) => {
  try {
    const parentID = req.userID;
    const student = await studentModel.find({ parentID }).select("-password ");
    if (!student) {
      return res.status(400).json({ message: "student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.listStudentByGrade = async (req, res) => {
  try {
    const grade = req.query.grade;
    const students = await studentModel.find({ grade });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.allStudent = async (req, res) => {
  try {
    const students = await studentModel.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.studentDetail = async (req, res) => {
  try {
    let student = null;
    if (req.role === "student") {
      const id = req.userID;
      student = await studentModel.findById(id);
      if (!student) {
        return res.status(400).json({ mesaage: "Student not found" });
      }
    } else if (req.role === "parent") {
      const pID = req.userID;
      const sID = req.query.id;
      student = await studentModel.findOne({ parentID: pID, _id: sID });
      if (!student) {
        return res.status(400).json({ mesaage: "Student not found" });
      }
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addStudent = async (req, res) => {
  try {
    const parentID = req.userID;
    const student = await studentModel.findOne({ username: req.body.username });
    if (student) {
      return res.status(401).json({ message: "Student already exist" });
    }
    const addStudent = studentModel({ ...req.body, parentID });
    await addStudent.save();
    res.status(201).json(addStudent);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.studentLogin = async (req, res) => {
  try {
    const student = await studentModel.findOne(req.body);
    if (!student) {
      return res.status(400).json({ message: "student not found" });
    }
    const id = student._id;
    const token = jwt.sign({ id, role: student.role }, process.env["KEY"], {
      expiresIn: "1h",
    });
    res.status(200).json({ token, role: student.role });
  } catch (error) {
    res.status(500).json(error);
  }
};
