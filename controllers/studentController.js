const studentModel = require("../models/studentModel.js");

exports.studentDetail = async (req, res) => {
  try {
    const userID = req.userID;
    const student = await studentModel
      .findOne({ userID })
      .select("-password -_id -userID");
    if (!student) {
      return res.status(400).json({ message: "student not found" });
    }
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json(error);
  }
};
