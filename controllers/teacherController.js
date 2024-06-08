const teacherModel = require("../models/teacherModel.js");

exports.detailTeacher = async (req, res) => {
  try {
    const userID = req.query.id;
    const data = await teacherModel.findOne({ userID });
    if (!data) {
      return res.status(400).json({ message: "user not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
