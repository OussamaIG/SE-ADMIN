const mongoose = require("mongoose");

const studentModel = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "give your name"],
  },
  surname: {
    type: String,
    required: [true, "give your surname"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
    required: [true, "give phone number"],
  },
  university: {
    type: String,
  },
  speciality: {
    type: String,
  },
  group: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    default: false,
  },
  courses: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("Student", studentModel);
