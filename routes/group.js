const express = require("express");
const router = express.Router();

const { getAllgroups, getoneGroup } = require("../controllers/groups");

router.route("/").get(getAllgroups)
router.route("/:id").get(getoneGroup);

module.exports = router;