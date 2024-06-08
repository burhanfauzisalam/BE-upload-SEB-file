const express = require("express");
const sebFile = require("../controllers/sebController.js");

const router = express.Router();

router.get("/seb", sebFile.sebList);
router.post("/seb", sebFile.sebUpload);

module.exports = router;
