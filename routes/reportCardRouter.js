const express = require("express");
const inputValue = require("../controllers/reportCard/inputValueController");
const router = express.Router();

//
router.post("/input", inputValue.addData);
router.get("/data-input", inputValue.listData);
router.post("/add-rubric", inputValue.addRubric);

module.exports = router;
