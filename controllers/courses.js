const Course = require("../models/course");
const Group = require("../models/group");
const Student = require("../models/student");
const asyncWrapper = require("../middleware/async");

const getAllCourses = asyncWrapper(async (req, res) => {
  const { status } = req.query;
  const queryObject = {};
  if (status) {
    queryObject.status = status === "true" ? true : false;
  }
  let result = Course.find(queryObject);
  const courses = await result;
  res.status(200).json(courses);
});
const createCourse = asyncWrapper(async (req, res) => {
  // create course
  req.body.groups = [1];
  groupName = { name: 1 };
  const group = await Group.create(groupName);
  req.body.groups = group;
  const course = await Course.create(req.body);
  // response
  res.status(201).json(course);
});

const deleteAll = asyncWrapper(async (req, res) => {
  const course = await Course.deleteMany({});
  // delete students and groups from student
  res.status(200).json({ status: true });
});

const deleteCourse = asyncWrapper(async (req, res) => {
  const { id: courseID } = req.params;
  const course = await Course.findByIdAndDelete({ _id: courseID });
  if (!course) {
    return res.status(404).json({ msg: `no id ${req.params.id}` });
  }
  // delete the group from the student
  const groupIds = course.groups.map((group) => group);
  console.log(groupIds);
  await Student.updateMany(
    { _id: { $in: course.students } },
    { $pull: { courses: course.name } }
  );

  res.status(200).json({ course });
});

const deleteStudentFromCourse = asyncWrapper(async (req, res) => {
  const courseId = req.params.courseId;
  const studentId = req.params.studentId;

  const course = await Course.findByIdAndUpdate(
    { _id: courseId },
    { $pull: { students: studentId } }
  );
  res.status(200).json({ course });
});

const getStudentFromCourse = asyncWrapper(async (req, res) => {
  const { group } = req.query;
  const courseID = req.params.courseId;
  const course = await Course.find({ _id: courseID });
  const studentIDs = course[0].students;
  let students = {};
  if (group) {
    students = await Student.find({
      _id: { $in: studentIDs },
      group: Number(group), // Assuming groups is an array of numbers
    });
  } else {
    students = await Student.find({ _id: { $in: studentIDs } });
  }
  // const students = await Student.find({ _id: { $in: studentIDs } });
  res.status(200).json({ students: students });
});


const updateCourse = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!course) {
    return res.status(404).json({ msg: `no id ${req.params.id}` });
  }
  res.status(200).json({ course });
});

const createNewGroup = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOne({ _id: id });
  const groupNumber = course.groups.length;
  console.log(groupNumber);
  const obj = { name: groupNumber + 1 };
  console.log(obj);
  const group = await Group.create(obj);
  await Course.findOneAndUpdate(
    { _id: id },
    { $push: { groups: group } },
    { new: true }
  );
  res.status(200).json({});
});

const deleteGroup = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const course = await Course.findOne({ _id: id });

  // Ensure there is at least one group to delete
  if (course.groups.length === 0) {
    return res.status(404).json({ error: "No groups to delete." });
  }

  // Get the group number of the last group
  const groupNumber = course.groups[course.groups.length - 1];

  // Update the document to remove the last group
  await Course.findOneAndUpdate(
    { _id: id },
    { $pull: { groups: groupNumber } },
    { new: true }
  );

  res.status(200).json({});
});

module.exports = {
  getAllCourses,
  createCourse,
  deleteAll,
  deleteCourse,
  deleteStudentFromCourse,
  getStudentFromCourse,
  updateCourse,
  createNewGroup,
  deleteGroup,
};
