const express = require("express");
const {} = require("../controllers/patientController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Patients");
});

module.exports = router;
