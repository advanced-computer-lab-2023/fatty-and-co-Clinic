const express = require("express");
const {createPatient,getAllPatients,deletePatient,getPatient} = require("../controllers/patientController");

const router = express.Router();

router.post("/addPatient", createPatient);
router.get("/getAllPatients", getAllPatients);
router.delete("/deletePatient/:id", deletePatient);
router.get("/getPatient/:id", getPatient);

module.exports = router;
