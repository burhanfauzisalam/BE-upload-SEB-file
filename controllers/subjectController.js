const subjectModel = require("../models/subjectModel.js");

exports.allSubject = async (req, res) => {
  try {
    const data = await subjectModel.find().sort({ subject: 1 });
    if (!data || data.length === 0) {
      return res.status(400).json({ message: "no data found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.detailSubject = async (req, res) => {
  try {
    const { subject, teacher, schoolYear } = req.query;
    const data = await subjectModel.findOne({ subject, teacher, schoolYear });
    if (!data) {
      return res.status(400).json({ message: "data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addSubject = async (req, res) => {
  try {
    const { subject, schoolYear, teacher, grade } = req.body;
    const cekData = await subjectModel.findOne({
      subject,
      schoolYear,
      teacher,
      grade,
    });
    if (cekData) {
      return res.status(401).json({ message: "subject already exist" });
    }
    const newData = await subjectModel({ subject, schoolYear, teacher, grade });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const deletedData = await subjectModel.findByIdAndDelete(req.query.id);
    res.status(200).json({ message: "Subject deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
