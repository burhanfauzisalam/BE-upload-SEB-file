const sebFileModel = require("../models/sebModel.js");
const teacherModel = require("../models/teacherModel.js");

exports.sebList = async (req, res) => {
  try {
    const data = await sebFileModel.find();
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.sebUpload = async (req, res) => {
  try {
    const userID = req.userID;
    const teacher = await teacherModel.findOne({ userID });
    const { filename, url, grade, subject, assessment } = req.body;
    const existingFile = await sebFileModel.findOne({ filename });
    if (existingFile) {
      return res.status(400).json({ error: "File already exist." });
    }
    const newFile = sebFileModel({
      ...req.body,
      teacher: teacher.name,
    });
    await newFile.save();
    res.status(201).json(newFile);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.sebDelete = async (req, res) => {
  try {
    const url = req.query.url;
    const isFileExist = sebFileModel.findOne({ url });
    if (!isFileExist) {
      return res.status(400).json({ message: "File dosen't exist." });
    }
    await sebFileModel.deleteOne({ url });
    res.status(200).json({ message: "File deleted" });
  } catch (error) {
    res.status(500).json(error);
  }
};
