const express = require("express");
const {
  getDoctorByID,
  getDoctorByUsername,
  getDoctorByNameAndSpeciality,
  filterDoctor2,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Doctors");
});

router.get("/id/:id", getDoctorByID);

router.get("/username/:username", getDoctorByUsername);

router.get("/search/", getDoctorByNameAndSpeciality);

router.get("/filter/", filterDoctor2);


module.exports = router;
