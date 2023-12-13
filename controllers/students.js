const Student = require("../models/student");
const Course = require("../models/course");
const asyncWrapper = require("../middleware/async");

const getAllStudents = asyncWrapper(async (req, res) => {
  const { name, status, groupe, sort, course } = req.query;
  const queryObject = {};
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }
  if (status) {
    queryObject.status = status === "true" ? true : false;
  }
  if (groupe) {
    queryObject.groupe = Number(groupe);
  }
  if (course) {
    // look for the id using the name
    const courses = await Course.find({
      name: { $regex: new RegExp(course, "i") },
    });
    queryObject.courses = [String([courses[0].name])];
    console.log(queryObject);
  }
  let result = Student.find(queryObject);
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }
  const students = await result;
  console.log(students);
  res.status(200).json({ students });
});
const createStudent = asyncWrapper(async (req, res) => {
  //Create the student :
  const {
    university,
    courseID,
    group,
    name,
    surname,
    status,
    phone,
    email,
    speciality,
  } = req.body;
  const newStudent = {
    name: name,
    university: university,
    speciality: speciality,
    surname: surname,
    status: status,
    phone: phone,
    email: email,
    group: [],
    courses: [],
  };
  if (group) {
    newStudent.group.push(group);
  }
  if (courseID) {
    const newcourse = await Course.findById({ _id: courseID });
    newStudent.courses.push(newcourse.name);
  }
  const student = await Student.create(newStudent);
  const studentID = student._id;
  // add the student to the course
  await Course.findOneAndUpdate(
    { _id: courseID },
    { $push: { students: studentID } },
    { new: true }
  );
  res.status(201).json({ student });
});

const deleteStudent = asyncWrapper(async (req, res) => {
  const { id: studentID } = req.params;
  const student = await Student.findByIdAndDelete({ _id: studentID });
  if (!student) {
    return res.status(404).json({ msg: `no id ${req.params.id}` });
  }
  // delete student from courses
  await Course.updateMany(
    { students: studentID },
    { $pull: { students: studentID } }
  );

  res.status(200).json({ student });
});
const updateStudent = asyncWrapper(async (req, res) => {
  const { id: studentID } = req.params;
  const student = await Student.findOneAndUpdate({ _id: studentID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!student) {
    return res.status(404).json({ msg: `no id ${req.params.id}` });
  }
  res.status(200).json({ student });
});
const deleteAll = asyncWrapper(async (req, res) => {
  const student = await Student.deleteMany({});
  // delete students from groups
  await Group.updateMany({}, { $set: { students: [] } });
  // delete students from courses
  await Course.updateMany({}, { $set: { students: [] } });
  res.status(200).json({ student });
});
const addNewCourse = asyncWrapper(async (req, res) => {
  const { studentId: studentId } = req.params;
  const { courseId: courseId } = req.body;
  const { groupId: groupId } = req.body;
  const { coursName: coursName } = req.body;
  console.log(courseId, groupId);
  await Student.findOneAndUpdate(
    { _id: studentId },
    { $push: { courses: coursName, group: groupId } }
  );

  // add student to course
  await Course.findOneAndUpdate(
    { _id: courseId },
    { $push: { students: studentId } }
  );

  res.status(200).json({ status: true });
});

module.exports = {
  getAllStudents,
  createStudent,
  deleteStudent,
  updateStudent,
  deleteAll,
  addNewCourse,
};
