const Group = require("../models/group");
const asyncWrapper = require("../middleware/async");

const getAllgroups = asyncWrapper(async (req, res) => {
  const groups = await Group.find({});
  res.status(200).json(groups);
});

const getoneGroup = asyncWrapper(async (req, res) => {
    const {id} = req.params
    const group = await Group.findOne({_id : id})
    res.status(200).json(group)
})

module.exports = {
  getAllgroups,
  getoneGroup,
};
