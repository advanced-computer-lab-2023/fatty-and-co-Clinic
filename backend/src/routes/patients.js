const express = require("express");
const patientController = require("../controllers/patientController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Patients");
});

router.get("/:id", patientController.session_index);

module.exports = router;
