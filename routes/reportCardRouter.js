const express = require("express");
const inputValue = require("../controllers/reportCard/inputValueController");
const router = express.Router();

//
router.post("/input", inputValue.addData);
router.post("/data", inputValue.getData);
router.get("/data-input", inputValue.listData);
router.post("/add-rubric", inputValue.addRubric);
router.post("/input-value", inputValue.editValue);

module.exports = router;
