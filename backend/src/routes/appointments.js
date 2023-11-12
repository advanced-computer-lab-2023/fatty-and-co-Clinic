const express = require("express");
const {
  getAppointmentsDoc,
  getAppointmentsPat,
  findDoctorPatients,
  upcomingAppforDoc,
  searchPatient,
  filterAppointmentsByStatusDoc,
  filterAppointmentsByStatusPat,
  filterAppointmentsByDateDoc,
  filterAppointmentsByDatePat,
  testAppointRef,
} = require("../controllers/appointmentController");

const { checkDoctor, checkPatient } = require("../common/middleware/checkType");

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
 * @access Doctor
 */
router.get("/findPatients", checkDoctor, findDoctorPatients); // checkDoctor middleware to make sure user is a doctor

/**
 * @route GET /appointments/upcoming
 * @desc Get upcoming appointments for a doctor
 * @access Doctor
 */
router.get("/upcoming", checkDoctor, upcomingAppforDoc);

/**
 * @route GET /appointments/searchpatient
 * @desc Search for a patient by name
 * @access Doctor
 * @prop {string} PatientUsername - The username of the patient to search for
 */
router.get("/searchpatient", checkDoctor, searchPatient);

/**
 * @route GET /getAppointmentsDoc
 * @desc Retrieve all appointments for a specific doctor
 * @access Doctor
 */
router.get("/getAppointmentsDoc", checkDoctor, getAppointmentsDoc);

/**
 * @route GET /getAppointmentsPat
 * @desc Retrieve all appointments for a specific patient
 * @access Patient
 */
router.get("/getAppointmentsPat", checkPatient, getAppointmentsPat);

router.get("/filterAppointmentsByStatusDoc", checkPatient, filterAppointmentsByStatusDoc);
router.get("/filterAppointmentsByStatusPat", checkPatient, filterAppointmentsByStatusPat);
router.get("/filterAppointmentsByDateDoc", checkPatient, filterAppointmentsByDateDoc);
router.get("/filterAppointmentsByDatePat", checkPatient, filterAppointmentsByDatePat);



router.get("/testAppRef", testAppointRef);
  
module.exports = router;
