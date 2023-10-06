const express = require("express");
const {
  getDoctorByID,
  getDoctorByUsername,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Doctors");
});

router.get("/:id", getDoctorByID);

router.get("/username/:username", getDoctorByUsername);

module.exports = router;
