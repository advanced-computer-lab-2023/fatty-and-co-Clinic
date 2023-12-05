const express = require("express");
const {
  addPrescription,
  addMedToPrescription,
  deleteMedFromPrescription,
  updateDosage,
} = require("../controllers/prescriptionController");

const router = express.Router();
router.post("/addPrescription", addPrescription);
router.post("/addMedToPrescription", addMedToPrescription);
router.post("/deleteMedFromPrescription", deleteMedFromPrescription);
updateDosage;
router.post("/updateDosage", updateDosage);
module.exports = router;
