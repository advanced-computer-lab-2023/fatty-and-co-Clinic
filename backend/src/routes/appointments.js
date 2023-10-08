const express = require("express");
const { getAppointments,findDoctorPatients,upcomingAppforDoc,searchPatient} = require("../controllers/appointmentController");


const router = express.Router();

router.get("/", (req, res) => {
  res.send("Appointments");
});

router.get("/findPatients", findDoctorPatients);
router.get("/upcoming", upcomingAppforDoc);
router.get("/searchpatient", searchPatient);

router.get("/getAppointments", getAppointments);

module.exports = router; 
