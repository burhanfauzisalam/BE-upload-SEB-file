const teacherModel = require("../models/teacherModel.js");

exports.detailTeacher = async (req, res) => {
  try {
    const userID = req.userID;
    const teacher = await teacherModel
      .findOne({ userID })
      .select("-password -_id -userID");
    if (!teacher) {
      return res.status(400).json({ message: "teacher not found" });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json(error);
  }
};
