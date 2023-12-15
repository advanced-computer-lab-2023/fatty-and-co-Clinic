const express = require("express");
const {
  addPrescription,
  addMedToPrescription,
  deleteMedFromPrescription,
  updateDosage,
  checkForPrescription,
  calculatePrescriptionCost,
  getPrescriptionMeds,
  updateDescription,
} = require("../controllers/prescriptionController");

const router = express.Router();
router.post("/addPrescription", addPrescription);
router.post("/addMedToPrescription", addMedToPrescription);
router.post("/deleteMedFromPrescription", deleteMedFromPrescription);
router.post("/updateDescription", updateDescription);

router.post("/updateDosage", updateDosage);
router.get("/checkForPrescription", checkForPrescription);
router.get("/getPrescriptionMeds", getPrescriptionMeds);
router.get("/calculatePrescriptionCost", calculatePrescriptionCost);
module.exports = router;
