const express = require("express");
const router = express.Router();

const {
  getAllStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  deleteAll,
  addNewCourse,
} = require("../controllers/students");

router.route("/").get(getAllStudents).post(createStudent).delete(deleteAll);
router.route("/:id").delete(deleteStudent).patch(updateStudent);
router.route("/:studentId/AddCourse").patch(addNewCourse);

module.exports = router;
