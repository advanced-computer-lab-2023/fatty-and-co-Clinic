const express = require("express");
const {
  createPatient,
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
  getPatientUsername,
  session_index,
  createFamilymember,
  GetFamilymembers,
  getPrescriptions,
  selectPatient,
  filterPrescriptions,
  selectPrescription,
} = require("../controllers/patientController");

const router = express.Router();

/**
 * @route POST /patients/addPatient
 * @desc Creates a new patient
 * @access Public
 * @prop {string} Name - The name of the patient
 * @prop {string} Username - The username of the patient
 * @prop {string} Password - The password of the patient
 * @prop {string} Email - The email of the patient
 * @prop {string} NationalID - The national ID of the patient
 * @prop {number} Age - The age of the patient
 * @prop {string} Gender - The gender of the patient ["M", "F"]
 */
router.post("/addPatient", createPatient);

/**
 * @route GET /patients/getAllPatients
 * @desc Returns a list of all patients
 * @access Public
 */
router.get("/getAllPatients", getAllPatients);

/**
 * @route DELETE /patients/deletePatient/:id
 * @desc Deletes a patient by ID
 * @access Public
 * @param {string} id - The ID of the patient to delete
 */
router.delete("/deletePatient/:id", deletePatient);

/**
 * @route GET /patients/getPatient/:id
 * @desc Returns a patient by ID
 * @access Public
 * @param {string} id - The ID of the patient to get
 */
router.get("/getPatient/:id", getPatient);

/**
 * @route PATCH /patients/updatePatient/:id
 * @desc Updates a patient by ID
 * @access Public
 * @param {string} id - The ID of the patient to update
 * @prop {string} Name - The name of the patient
 * @prop {string} Username - The username of the patient
 * @prop {string} Password - The password of the patient
 * @prop {string} Email - The email of the patient
 * @prop {string} NationalID - The national ID of the patient
 * @prop {number} Age - The age of the patient
 * @prop {string} Gender - The gender of the patient ["M", "F"]
 */
router.patch("/updatePatient/:id", updatePatient);

/**
 * @route GET /patients/getPatientUsername/:Username
 * @desc Returns a patient by username
 * @access Public
 * @param {string} Username - The username of the patient to get
 */
router.get("/getPatientUsername/:Username", getPatientUsername);

/**
 * @route GET /patients/view/doctors/:id
 * @desc Returns a list of all doctors with speciality and session price for a patient
 * @access Public
 * @param {string} id - The ID of the patient to view doctors for
 * @prop {string} Name - The name of the doctor to search for
 * @prop {string} Speciality - The speciality of the doctor to search for
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

/**
 * @route GET /patients/getPrescriptions
 * @desc Returns a list of all prescriptions
 * @access Public
 */
router.get("/getPrescriptions", getPrescriptions);

/**
 * @route GET /patients/selectPatient
 * @desc Returns a list of all patients
 * @access Public
 */
router.get("/selectPatient", selectPatient);

/**
 * @route GET /patients/filterPrescriptions
 * @desc Returns a list of all prescriptions filtered by patient ID
 * @access Public
 * @param {string} id - The ID of the patient to filter prescriptions for
 */
router.get("/filterPrescriptions", filterPrescriptions);

/**
 * @route GET /patients/selectPrescription
 * @desc Returns a prescription by ID
 * @access Public
 * @param {string} id - The ID of the prescription to get
 */
router.get("/selectPrescription", selectPrescription);

module.exports = router;
