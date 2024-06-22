const parentModel = require("../models/parentModel.js");
const jwt = require("jsonwebtoken");

exports.listParents = async (req, res) => {
  try {
    const parents = await parentModel.find().select("-password ");
    if (!parents) {
      return res.status(400).json({ message: "no parents" });
    }
    res.status(200).json(parents);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.detailParent = async (req, res) => {
  try {
    const userID = req.userID;
    const parent = await parentModel.findOne({ userID });
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json(error);
  }
};
