const express = require("express");
const { addPrescription } = require("../controllers/prescriptionController");

const router = express.Router();
router.post("/addPrescription", addPrescription);
module.exports = router;
