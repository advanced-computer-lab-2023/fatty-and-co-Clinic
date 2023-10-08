const express = require("express");
const {
  getDoctorByID,
  getDoctorByUsername,
  getDoctorByNameAndSpeciality,
  filterDoctor,
  // createDoctor,
  updateDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Doctors");
});

/**
 * @route POST /doctors/createDoctor
 * @desc Creates a new doctor
 * @access Public
 * @prop {string} Username - The username of the doctor
 * @prop {string} Name - The name of the doctor
 * @prop {date} DateOfBirth - The date of birth of the doctor
 * @prop {number} HourlyRate - The hourly rate of the doctor
 * @prop {string} Affiliation - The affiliation of the doctor
 * @prop {string} EducationalBackground - The educational background of the doctor
 */
router.post("/createDoctor", createDoctor);

router.patch("/updateDoctor", updateDoctor);

router.get("/id/:id", getDoctorByID);

router.get("/username/:username", getDoctorByUsername);

router.get("/search", getDoctorByNameAndSpeciality);

router.get("/filter", filterDoctor);

module.exports = router;
