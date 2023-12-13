const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "give your name"],
  },
  price: {
    type: Number,
    require:[true, 'give the price']
  },
  description:{
    type: String,
  },
  status:{
    type: Boolean
  },
  students:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  groups: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group',
  }]
});

module.exports = mongoose.model('Course', courseSchema);