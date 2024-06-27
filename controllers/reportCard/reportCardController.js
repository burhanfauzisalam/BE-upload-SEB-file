const reportCardModel = require("../../models/reportCard/reportCardModel");

exports.getAllData = async (req, res) => {
  try {
    const data = await reportCardModel.find();
    if (data.length === 0) {
      res.status(200).json({ message: "data empty" });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addData = async (req, res) => {
  try {
    const addData = await reportCardModel(req.body);
    await addData.save();
    res.status(200).json(addData);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.addRubric = async (req, res) => {
  try {
    const id = req.query.id;
    const data = await reportCardModel.findById(id);
    const cek = data.rubrics.filter((item) => item.item === req.body.item);
    if (cek.length > 0) {
      return res
        .status(401)
        .json({ message: "rubrics item already exist", cek });
    }
    data.rubrics.push(req.body);
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.transformData = async (req, res) => {
  try {
    const data = await reportCardModel.findOne({ studentID: req.query.id });
    const transformedData = data.rubrics.reduce(
      (acc, rubric) => {
        acc.item.push(rubric.item);
        acc.semester1.push(rubric.semester1);
        acc.semester2.push(rubric.semester2);
        return acc;
      },
      { item: [], semester1: [], semester2: [] }
    );
    res.status(200).json(transformedData);
  } catch (error) {
    res.status(500).json(error);
  }
};
