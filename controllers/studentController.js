const studentModel = require("../models/studentModel.js");

exports.studentDetail = async (req, res) => {
  try {
    const student = await studentModel
      .findOne({ userID: req.query.id })
      .select("-password");
    if (!student) {
      return res.status(400).json({ message: "student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};
