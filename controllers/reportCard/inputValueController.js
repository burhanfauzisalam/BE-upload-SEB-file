const inputModel = require("../../models/reportCard/inputModel");

exports.addData = async (req, res) => {
  try {
    const { studentID, schoolYear, subject } = req.body;
    const cekData = await inputModel.findOne({
      studentID,
      schoolYear,
      subject,
    });
    if (cekData) {
      return res.status(400).json({ message: "data arlready exist" });
    }
    const data = new inputModel(req.body);
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.listData = async (req, res) => {
  try {
    const data = await inputModel.find();
    if (data.length === 0) {
      return res.status(400).json({ message: "data empty" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addRubric = async (req, res) => {
  try {
    const { studentID, schoolYear, subject, rubric } = req.body;
    const data = await inputModel.findOne({
      studentID,
      schoolYear,
      subject,
    });
    if (!data) {
      return res.status(400).json({ message: "data not found" });
    }
    data.rubrics.push(rubric);
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getData = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await inputModel.findOne({ studentID: id });
    if (!data) {
      return res.status(400).json({ message: "data not found" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// exports.transformData = async (req, res) => {
//   try {
//     const data = await reportCardModel.findOne({
//       studentID: req.query.sid,
//       _id: req.query.id,
//     });
//     if (!data) {
//       return res.status(400).json({ message: "data not found" });
//     }
//     const transformedData = data.rubrics.reduce(
//       (acc, rubric) => {
//         acc.item.push(rubric.item);
//         acc.semester1.push(rubric.semester1);
//         acc.semester2.push(rubric.semester2);
//         return acc;
//       },
//       { item: [], semester1: [], semester2: [] }
//     );
//     res.status(200).json(transformedData);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
