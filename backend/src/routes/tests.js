const express = require("express");
const {
  createSystemUser,
  getSystemUsers,
  getAdmins,
  getDoctors,
  getPatients,
  getRequests,
} = require("../controllers/testController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Tests");
});

router.get("/Users", (req, res) => {
  getSystemUsers(req, res);
});

router.get("/Users/Admins", (req, res) => {
  getAdmins(req, res);
});

router.get("/Users/Doctors", (req, res) => {
  getDoctors(req, res);
});

router.get("/Users/Patients", (req, res) => {
  getPatients(req, res);
});

router.get("/Requests", (req, res) => {
  getRequests(req, res);
});

router.post("/createUser", (req, res) => {
  createSystemUser(req, res);
});

module.exports = router;
