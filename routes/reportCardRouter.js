const express = require("express");
const reportCard = require("../controllers/reportCard/reportCardController");
const router = express.Router();

router.get("/data", reportCard.getAllData);
router.post("/data", reportCard.addData);
router.post("/add-rubric", reportCard.addRubric);
router.get("/transform", reportCard.transformData);

module.exports = router;
