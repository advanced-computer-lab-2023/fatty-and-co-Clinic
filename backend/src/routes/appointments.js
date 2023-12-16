const express = require("express");
const {
  getDoctorId,
  cancelAppForFam,
  cancelAppForSelf,
  reschedulePatient,
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
  reschdulebypatient,
  createAppointment,
  getAppointmentsfamilymembers,
  getAllAppointmentsPat,
} = require("../controllers/appointmentController");

//const {createAppointment} = require("../controllers/testController");
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
router.get("/getAllAppointmentsPat", getAllAppointmentsPat);
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
router.post("/rescheduleAppointmentPatient", checkPatient, reschdulebypatient);
// router.post("/rescheduleAppointmentfamilymember", checkPatient, reschedulefamilymember);
/**
 * @route GET /getAppointmentsPat
 * @desc Retrieve all appointments for a specific patient
 * @access Patient
 */
router.get("/getDoctorId", checkDoctor, getDoctorId);
router.get("/getAppointmentsPat", checkPatient, getAppointmentsPat);

router.get(
  "/filterAppointmentsByStatusDoc",
  checkPatient,
  filterAppointmentsByStatusDoc
);
router.get(
  "/filterAppointmentsByStatusPat",
  checkPatient,
  filterAppointmentsByStatusPat
);
router.get(
  "/filterAppointmentsByDateDoc",
  checkPatient,
  filterAppointmentsByDateDoc
);
router.get(
  "/filterAppointmentsByDatePat",
  checkPatient,
  filterAppointmentsByDatePat
);
router.patch(
  "/filterAppointmentsByDatePat",
  checkPatient,
  filterAppointmentsByDatePat
);

router.get("/testAppRef", testAppointRef);

router.post("/createAppointment",checkPatient, createAppointment);
router.post("/rescheduleForPatient",checkDoctor,reschedulePatient);

// Cancel for family member + for myself

router.patch("/cancelAppFam", checkPatient, cancelAppForFam);
router.patch("/cancelAppointment", checkPatient, cancelAppForSelf);

module.exports = router;
