const express = require("express");
const sebFile = require("../controllers/sebController.js");
const user = require("../controllers/userController.js");
const teacher = require("../controllers/teacherController.js");

const router = express.Router();

//seb file routes
router.get("/seb", sebFile.sebList);
router.post("/seb", sebFile.sebUpload);
router.delete("/seb", sebFile.sebDelete);

//user routes
router.get("/user", user.allUser);
router.post("/user", user.addUser);
router.post("/login", user.userLogin);
router.post("/decode", user.userDecode);

//teacher routes
router.get("/teacher", teacher.detailTeacher);

module.exports = router;
