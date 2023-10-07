const express = require("express");
const {
  getDoctorByID,
  getDoctorByUsername,
  getDoctorByNameAndSpeciality,
  filterDoctor,
  filterDoctor2,
  createDoctor,
  updateDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Doctors");
});

router.post("/createDoctor", createDoctor);

router.patch("/updateDoctor", updateDoctor);

router.get("/id/:id", getDoctorByID);

router.get("/username/:username", getDoctorByUsername);

router.get("/search", getDoctorByNameAndSpeciality);

router.get("/filter", filterDoctor);

module.exports = router;
