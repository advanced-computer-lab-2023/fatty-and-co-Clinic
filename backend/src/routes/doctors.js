/**
 * @fileoverview Defines routes for doctor related operations
 * @module routes/doctors
 * @requires express
 * @requires ../controllers/doctorController
 */

const express = require("express");
const {
  getDoctorByID,
  getDoctorByUsername,
  getDoctorByNameAndSpeciality,
  filterDoctor,
  createDoctor,
  updateDoctor,
} = require("../controllers/doctorController");

const router = express.Router();

/**
 * @route GET /doctors
 * @desc Returns a message indicating that the request was successful
 * @access Public
 */
router.get("/", (req, res) => {
  res.send("Doctors");
});

/**
 * @route POST /doctors/createDoctor
 * @desc Creates a new doctor
 * @access Public
 */
router.post("/createDoctor", createDoctor);

/**
 * @route PATCH /doctors/updateDoctor
 * @desc Updates an existing doctor
 * @access Public
 */
router.patch("/updateDoctor", updateDoctor);

/**
 * @route GET /doctors/id/:id
 * @desc Returns a doctor by ID
 * @access Public
 */
router.get("/id/:id", getDoctorByID);

/**
 * @route GET /doctors/username/:username
 * @desc Returns a doctor by username
 * @access Public
 */
router.get("/username/:username", getDoctorByUsername);

/**
 * @route GET /doctors/search
 * @desc Returns a list of doctors by name and speciality
 * @access Public
 */
router.get("/search", getDoctorByNameAndSpeciality);

/**
 * @route GET /doctors/filter
 * @desc Returns a list of doctors filtered by various parameters
 * @access Public
 */
router.get("/filter", filterDoctor);

module.exports = router;
