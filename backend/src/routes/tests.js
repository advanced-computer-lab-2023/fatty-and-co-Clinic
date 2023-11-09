const express = require("express");
const {
  createAppointment,
  createSystemUser,
  createPatient,
  getSystemUsers,
  getAdmins,
  getDoctors,
  getPatients,
  getRequests,
  getAppointments,
  createDoctor,
  createRandomAppointment,
  createPrescription,
  createDocSlot,
} = require("../controllers/testController");
 
const {testAppointRef} = require ("../controllers/appointmentController")
const {testDocSlotRef} = require ("../controllers/docSlotController");

const {
  filterDoctorSlotEdition,
  addMySlotsDoc,
  deleteMySlotsDoc,
  updateMySlotsDoc,
  viewUpcomingAppointmentsDoc,
  viewPastAppoitmentsDoc,
  viewAllAvailableSlots,
} = require ("../controllers/doctorController");


const {
  viewUpcomingAppointmentsPat, 
  viewPastAppoitmentsPat
} = require ("../controllers/patientController");

const router = express.Router();

/**
 * @route GET /tests
 * @desc Test route
 * @access Public
 */
router.get("/", (req, res) => {
  res.send("Tests");
});

/**
 * @route GET /tests/Users
 * @desc Get all system users
 * @access Public
 */
router.get("/Users", (req, res) => {
  getSystemUsers(req, res);
});

/**
 * @route GET /tests/Admins
 * @desc Get all admins
 * @access Public
 */
router.get("/Admins", (req, res) => {
  getAdmins(req, res);
});

/**
 * @route GET /tests/Doctors
 * @desc Get all doctors
 * @access Public
 */
router.get("/Doctors", (req, res) => {
  getDoctors(req, res);
});

/**
 * @route GET /tests/Patients
 * @desc Get all patients
 * @access Public
 */
router.get("/Patients", (req, res) => {
  getPatients(req, res);
});

router.get("/Appointments", (req, res) => {
  getAppointments(req, res);
});

/**
 * @route GET /tests/Requests
 * @desc Get all requests
 * @access Public
 */
router.get("/Requests", (req, res) => {
  getRequests(req, res);
});

/**
 * @route POST /tests/createUser
 * @desc Create a new system user
 * @access Public
 */
router.post("/createUser", (req, res) => {
  createSystemUser(req, res);
});

/**
 * @route POST /tests/createPatient
 * @desc Create a new patient
 * @access Public
 */
router.post("/createPatient", (req, res) => {
  createPatient(req, res);
});

/**
 * @route POST /tests/createDoctor
 * @desc Create a new doctor
 * @access Public
 */
router.post("/createDoctor", (req, res) => {
  createDoctor(req, res);
});

/**
 * @route POST /tests/createAppointment
 * @desc Create a new appointment
 * @access Public
 */
router.post("/createAppointment", (req, res) => {
  createAppointment(req, res);
});

/**
 * @route POST /tests/createRandomAppointment
 * @desc Create a new random appointment
 * @access Public
 */
router.post("/createRandomAppointment", (req, res) => {
  createRandomAppointment(req, res);
});

router.post("/createPrescription", (req, res) => {
  createPrescription(req, res);
});
router.post("/createPrescription", (req, res) => {
  createPrescription(req, res);
});

router.get("/testDocSlotRef", (req, res) => {
  testDocSlotRef(req, res);
});

router.get("/testDocSlotRef", (req, res) => {
  testDocSlotRef(req, res);
});

router.get("/testAppointRef", (req, res) => {
  testAppointRef(req, res);
});


//COPY TO DOCSLOTROUTES  DO NOT FORGET TO COPY THE const() = require above;
//do not forget the middleware 

router.post("/createDocSlot", (req, res) => {
  createDocSlot(req, res);
});

//COPY TO DOCTOR ROUTES
router.get("/filterDoctorSlotEdition", (req, res) => {
  filterDoctorSlotEdition(req, res);
});

router.post("/addMySlotsDoc", (req, res) => {
  addMySlotsDoc(req, res);
});

router.put("/updateMySlotsDoc", (req, res) => {
  updateMySlotsDoc(req, res);
});

router.delete("/deleteMySlotsDoc", (req, res) => {
  deleteMySlotsDoc(req, res);
});

router.get("/viewUpcomingAppointmentsDoc", (req, res) => {
  viewUpcomingAppointmentsDoc(req, res);
});

router.get("/viewPastAppoitmentsDoc", (req, res) => {
  viewPastAppoitmentsDoc(req, res);
});

router.get("/viewAllAvailableSlots", (req, res) => {
  viewAllAvailableSlots(req, res);
});

//COPY TO PATIENT ROUTES
router.get("/viewUpcomingAppointmentsPat", (req, res) => {
  viewUpcomingAppointmentsPat(req, res);
});

router.get("/viewPastAppoitmentsPat", (req, res) => {
  viewPastAppoitmentsPat(req, res);
});


module.exports = router;
