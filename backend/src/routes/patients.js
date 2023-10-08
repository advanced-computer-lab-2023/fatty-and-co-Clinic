const express = require("express");
const {
  session_index,
  createFamilymember,
  GetFamilymembers,
} = require("../controllers/patientController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Patients");
});

// view a list of all doctors with speciality and session price for a patient
router.get("/view/doctors/:id", session_index);

router.post("/createFamilymember", createFamilymember);

router.get("/getFamilymember", GetFamilymembers);

module.exports = router;
