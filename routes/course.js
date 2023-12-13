const express = require("express");
const router = express.Router();

const {
  getAllCourses,
  createCourse,
  deleteAll,
  deleteCourse,
  deleteStudentFromCourse,
  getStudentFromCourse,
  updateCourse,
  createNewGroup,
  deleteGroup,
} = require("../controllers/courses");

router.route("/").get(getAllCourses).post(createCourse).delete(deleteAll);
router.route("/editcourse/:id").patch(updateCourse);
router.route("/:id").delete(deleteCourse);
router.route("/:id/createGroup").patch(createNewGroup);
router.route("/:id/deletegroup").patch(deleteGroup);
router.route("/:courseId/students").get(getStudentFromCourse)
router.route("/:courseId/students/:studentId").patch(deleteStudentFromCourse);

module.exports = router;
