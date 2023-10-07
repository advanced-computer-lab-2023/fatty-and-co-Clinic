const express = require("express");
const { findDoctorPatients,upcomingAppforDoc,searchPatient} = require("../controllers/appointmentController");


const router = express.Router();

router.get("/", (req, res) => {
  res.send("Appointments");
});

router.get("/DoctorUsername/:DoctorUsername", findDoctorPatients);
router.get("/upcoming/:DoctorUsername", upcomingAppforDoc);
router.get("/searchpatient/:DoctorUsername/:Username", searchPatient);

module.exports = router;
