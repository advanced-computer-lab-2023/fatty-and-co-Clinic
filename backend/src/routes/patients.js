const express = require("express");
const {
  session_index,
  createFamilymember,
  GetFamilymembers,
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
 * @param {string} id - The ID of the patient
 */
router.get("/view/doctors/:id", session_index);

/**
 * @route POST /patients/createFamilymember
 * @desc Creates a new family member for a patient
 * @access Public
 * @body {string} Name - The name of the family member
 * @body {string} NationalID - The national ID of the family member
 * @body {number} Age - The age of the family member
 * @body {string} Gender - The gender of the family member ["M", "F"]
 * @body {string} Relation - The relation of the family member to the patient ["Spouse", "Child"]
 */
router.post("/createFamilymember", createFamilymember);

/**
 * @route GET /patients/getFamilymember
 * @desc Returns a list of all family members for a patient
 * @access Public
 */
router.get("/getFamilymember", GetFamilymembers);

module.exports = router;
