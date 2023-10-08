const express = require("express");
const {
  getAppointments,
  findDoctorPatients,
  upcomingAppforDoc,
  searchPatient,
} = require("../controllers/appointmentController");

const router = express.Router();

/**
 * @route GET /appointments
 * @desc return a message indicating that the route is for appointments
 * @access Public
 */
router.get("/", (req, res) => {
  res.send("Appointments");
});

/**
 * @route GET /appointments/findPatients
 * @desc Find patients for a doctor
 * @access Public
 */
router.get("/findPatients", findDoctorPatients);

/**
 * @route GET /appointments/upcoming
 * @desc Get upcoming appointments for a doctor
 * @access Public
 */
router.get("/upcoming", upcomingAppforDoc);

/**
 * @route GET /appointments/searchpatient
 * @desc Search for a patient by name
 * @access Public
 */
router.get("/searchpatient", searchPatient);

/**
 * @route GET /appointments/getAppointments
 * @desc Get all appointments
 * @access Public
 */
router.get("/getAppointments", getAppointments);

module.exports = router;
