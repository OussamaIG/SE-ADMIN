const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: Number,
    required: [true, "give your name"],
  },
});

module.exports = mongoose.model("Group", groupSchema);
