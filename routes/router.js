const express = require("express");
const sebFile = require("../controllers/sebController.js");
const user = require("../controllers/userController.js");
const teacher = require("../controllers/teacherController.js");
const student = require("../controllers/studentController.js");

const auth = require("../middlewares/loginMiddleware.js");

const router = express.Router();

//seb file routes
router.get("/seb", auth, sebFile.sebList);
router.post("/seb", auth, sebFile.sebUpload);
router.delete("/seb", sebFile.sebDelete);

//user routes
router.get("/user", user.allUser);
router.post("/user", user.addUser);
router.post("/login", user.userLogin);
router.post("/decode", auth, user.userDecode);

//teacher routes
router.get("/teacher", auth, teacher.detailTeacher);

//student routes
router.get("/student", student.studentDetail);

module.exports = router;
