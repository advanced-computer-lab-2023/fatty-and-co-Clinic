const express = require("express");
const {
  session_index,
  createFamilymember,
  GetFamilymembers,
  getPrescriptions,
} = require("../controllers/patientController");

const router = express.Router();

/**
 * @route GET /patients
 * @desc Returns a string indicating that the route is for patients
 * @access Public
 */
router.get("/", (req, res) => {
  res.send("Patients");
});

/**
 * @route GET /patients/view/doctors/:id
 * @desc Returns a list of all doctors with speciality and session price for a patient
 * @access Public
 * @param {string} id - The ID of the patient to view doctors for
 */
router.get("/view/doctors/:id", session_index);

/**
 * @route POST /patients/createFamilymember
 * @desc Creates a new family member for a patient
 * @access Public
 * @prop {string} Name - The name of the family member
 * @prop {string} NationalID - The national ID of the family member
 * @prop {number} Age - The age of the family member
 * @prop {string} Gender - The gender of the family member ["M", "F"]
 * @prop {string} Relation - The relation of the family member to the patient ["Spouse", "Child"]
 */
router.post("/createFamilymember", createFamilymember);

/**
 * @route GET /patients/getFamilymember
 * @desc Returns a list of all family members for a patient
 * @access Public
 * @prop {string} Username - The username of the patient to get family members for
 */
router.get("/getFamilymember", GetFamilymembers);

router.get("/getPrescriptions", getPrescriptions);

module.exports = router;
