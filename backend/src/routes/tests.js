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
} = require("../controllers/testController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Tests");
});

router.get("/Users", (req, res) => {
  getSystemUsers(req, res);
});

router.get("/Admins", (req, res) => {
  getAdmins(req, res);
});

router.get("/Doctors", (req, res) => {
  getDoctors(req, res);
});

router.get("/Patients", (req, res) => {
  getPatients(req, res);
});

router.get("/Requests", (req, res) => {
  getRequests(req, res);
});

router.get("/Appointments", (req, res) => {
  getAppointments(req, res);
});

router.post("/createUser", (req, res) => {
  createSystemUser(req, res);
});
router.post("/createPatient", (req, res) => {
  createPatient(req, res);
});

router.post("/createDoctor", (req, res) => {
  createDoctor(req, res);
});

router.post("/createAppointment", (req, res) => {
  createAppointment(req, res);
});

router.post("/createRandomAppointment", (req, res) => {
  createRandomAppointment(req, res);
});

router.post("/createPrescription", (req, res) => {
  createPrescription(req, res);
});

module.exports = router;
