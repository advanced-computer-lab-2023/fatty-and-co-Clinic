const express = require("express");
const {
  getAppointmentsDoc,
  getAppointmentsPat,
  findDoctorPatients,
  upcomingAppforDoc,
  searchPatient,
  testAppointRef,
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
 * @prop {string} DoctorUsername - The username of the doctor to find patients for
 */
router.get("/findPatients", findDoctorPatients);

/**
 * @route GET /appointments/upcoming
 * @desc Get upcoming appointments for a doctor
 * @access Public
 * @prop {string} DoctorUsername - The username of the doctor to get upcoming appointments for
 *
 */
router.get("/upcoming", upcomingAppforDoc);

/**
 * @route GET /appointments/searchpatient
 * @desc Search for a patient by name
 * @access Public
 * @prop {string} DoctorUsername - The username of the doctor searching for the patient
 * @prop {string} PatientUsername - The username of the patient to search for
 */
router.get("/searchpatient", searchPatient);

/**
 * @route GET /appointments/getAppointments
 * @desc Get all appointments
 * @access Public
 * @prop {string} Username - The username of the doctor/patient to get appointments for
 * @prop {string} Status - The status of the appointment ["Upcoming", "Completed", "Rescheduled", "Cancelled"]
 * @prop {date} Date - The date of the appointment
 *
 * @route GET /doctors/getDoctor/:id
 * @desc Returns a doctor by ID
 * @access Public
 * @param {string} Username2 - The ID of the doctor
 */
// router.get("/getAppointments/:Username2", getAppointments);
router.get("/getAppointmentsDoc/:Username2", getAppointmentsDoc);
router.get("/getAppointmentsPat/:PatientUser", getAppointmentsPat);

router.get("/testAppRef", testAppointRef);
  
module.exports = router;
