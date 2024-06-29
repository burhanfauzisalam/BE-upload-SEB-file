const express = require("express");
const sebFile = require("../controllers/sebController.js");
const user = require("../controllers/userController.js");
const teacher = require("../controllers/teacherController.js");
const student = require("../controllers/studentController.js");
const parent = require("../controllers/parentController.js");

const auth = require("../middlewares/loginMiddleware.js");
const authStudent = require("../middlewares/studentMiddleware.js");
const combineMiddlewares = require("../middlewares/combineMiddleware.js");

const router = express.Router();

//seb file routes
router.get("/seb", combineMiddlewares(auth, authStudent), sebFile.sebList);
router.post("/seb", auth, sebFile.sebUpload);
router.delete("/seb", auth, sebFile.sebDelete);

//user routes
router.get("/user", user.allUser);
router.post("/user", user.addUser);
router.post("/login", user.userLogin);
router.post("/decode", auth, user.userDecode);

//teacher routes
router.get("/teacher", auth, teacher.detailTeacher);

//student routes
router.get("/students", auth, student.listStudent);
router.get("/students-by-grade", student.listStudentByGrade);
router.get("/all-students", student.allStudent);
router.get(
  "/student",
  combineMiddlewares(auth, authStudent),
  student.studentDetail
);
router.post("/student", auth, student.addStudent);
router.post("/login-student", student.studentLogin);

//parent route
router.get("/parents", parent.listParents);
router.get("/parent", auth, parent.detailParent);

module.exports = router;
