const express = require("express");
const {
  addPrescription,
  addMedToPrescription,
  deleteMedFromPrescription,
} = require("../controllers/prescriptionController");

const router = express.Router();
router.post("/addPrescription", addPrescription);
router.post("/addMedToPrescription", addMedToPrescription);
router.post("/deleteMedFromPrescription", deleteMedFromPrescription);
module.exports = router;
