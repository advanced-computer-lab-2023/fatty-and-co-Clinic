const express = require("express");
const {} = require("../controllers/appointmentController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Appointments");
});

module.exports = router;
