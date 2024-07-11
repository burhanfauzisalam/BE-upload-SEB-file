const subjectModel = require("../models/subjectModel.js");

exports.allSubject = async (req, res) => {
  try {
    const data = await subjectModel.find();
    if (!data || data.length === 0) {
      return res.status(400).json({ message: "no data found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addSubject = async (req, res) => {
  try {
    const { subject, schoolYear, teacher } = req.body;
    const cekData = await subjectModel.findOne({
      subject,
      schoolYear,
      teacher,
    });
    if (cekData) {
      return res.status(401).json({ message: "subject already exist" });
    }
    const newData = await subjectModel({ subject, schoolYear, teacher });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json(error);
  }
};
