const express = require("express");
const { } = require("../controllers/doctorController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Doctors");
});

module.exports = router;
