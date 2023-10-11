/**
 * Defines routes for doctor related operations
 * @module routes/doctors
 * @requires express
 * @requires ../controllers/doctorController
 */

const express = require("express");
const {
  createDoctor,
  deleteDoctor,
  getAllDoctors,
  getDoctorByID,
  getDoctorByUsername,
  getDoctorByNameAndSpeciality,
  filterDoctor,
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
 * @prop {string} Username - The username of the doctor
 * @prop {string} Name - The name of the doctor
 * @prop {date} DateOfBirth - The date of birth of the doctor
 * @prop {number} HourlyRate - The hourly rate of the doctor
 * @prop {string} Affiliation - The affiliation of the doctor
 * @prop {string} EducationalBackground - The educational background of the doctor
 */
router.post("/createDoctor", createDoctor);

/**
 * @route PATCH /doctors/updateDoctor
 * @desc Updates an existing doctor
 * @access Public
 * @prop {string} Username - The username of the doctor to update
 * @prop {number} HourlyRate - The new hourly rate of the doctor
 * @prop {string} Affiliation - The new affiliation of the doctor
 */
router.patch("/updateDoctor/:Username", updateDoctor);

/**
 * @route GET /doctors/id/:id
 * @desc Returns a doctor by ID
 * @access Public
 * @param {string} id - The ID of the doctor
 */
router.get("/getDoctorByid/:id", getDoctorByID);

/**
 * @route GET /doctors/username/:username
 * @desc Returns a doctor by username
 * @access Public
 * @param {string} Username - The username of the doctor
 */
router.get("/getDoctorByUsername/:username", getDoctorByUsername);

/**
 * @route GET /doctors/search
 * @desc Returns a list of doctors by name and speciality
 * @access Public
 * @prop {string} Name - The name of the doctor
 * @prop {string} Speciality - The speciality of the doctor
 */
router.get("/search", getDoctorByNameAndSpeciality);

/**
 * @route GET /doctors/filter
 * @desc Returns a list of doctors filtered by various parameters
 * @access Public
 * @param {string} Speciality - The speciality of the doctor
 * @param {date} date - The date you're looking for an appointment on
 * @param {number} hour - The hour you're looking for an appointment on
 */
router.get("/filter", filterDoctor);

/**
 * @route POST /doctors/addDoctor
 * @desc Creates a new doctor
 * @access Public
 * @prop {string} Username - The username of the doctor
 * @prop {string} Name - The name of the doctor
 * @prop {date} DateOfBirth - The date of birth of the doctor
 * @prop {number} HourlyRate - The hourly rate of the doctor
 * @prop {string} Affiliation - The affiliation of the doctor
 * @prop {string} EducationalBackground - The educational background of the doctor
 */
router.post("/addDoctor", createDoctor);

/**
 * @route GET /doctors/getAllDoctors
 * @desc Returns a list of all doctors
 * @access Public
 */
router.get("/getAllDoctors", getAllDoctors);

/**
 * @route DELETE /doctors/deleteDoctor/:id
 * @desc Deletes a doctor by ID
 * @access Public
 * @param {string} id - The ID of the doctor to delete
 */
router.delete("/deleteDoctor/:id", deleteDoctor);

/**
 * @route GET /doctors/getDoctor/:id
 * @desc Returns a doctor by ID
 * @access Public
 * @param {string} id - The ID of the doctor
 */
router.get("/getDoctor/:id", getDoctorByID);

module.exports = router;
