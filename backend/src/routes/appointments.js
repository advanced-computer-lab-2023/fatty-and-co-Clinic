const express = require("express");
const { getAppointments } = require("../controllers/appointmentController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Appointments");
});

router.get("/getAppointments", getAppointments);

module.exports = router;
