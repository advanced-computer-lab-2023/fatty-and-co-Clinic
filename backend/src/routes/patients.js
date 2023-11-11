const express = require("express");
const {
  viewHealthFam,
  viewHealthPackage,
  subscribehealthpackage,
  subscribepackagefamilymem,
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
  selectPrescription,
  getEmergencyContact,
  uploadFile,
  getMedicalHistory,
  downloadFile,
  removeHealthRecord,
} = require("../controllers/patientController");
const { constants } = require("buffer");
const { checkPatient } = require("../common/middleware/checkType");
const { upload } = require("../common/middleware/upload");

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
router.get("/viewFamilyPackage/:PatientID", viewHealthFam);
/**
=======
>>>>>>> main
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
// TODO: add type check as middleware if needed
router.delete("/deletePatient/:id", deletePatient); // TODO: check if the one deleting is an admin or the currently logged in patient

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
 * @access Patient
 * @prop {string} Name - The name of the patient
 * @prop {string} Username - The username of the patient
 * @prop {string} Password - The password of the patient
 * @prop {string} Email - The email of the patient
 * @prop {string} NationalID - The national ID of the patient
 * @prop {number} Age - The age of the patient
 * @prop {string} Gender - The gender of the patient ["M", "F"]
 */
// TODO: does it have to be a patient? or can it be an admin?
// TODO: check if the one updating is an admin or the currently logged in patient
router.patch("/updatePatient/:id", checkPatient, updatePatient);

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
 * @prop {string} Name - The name of the doctor to search for
 * @prop {string} Speciality - The speciality of the doctor to search for
 */
router.get("/view/doctors/", checkPatient, session_index);

/**
 * @route POST /patients/createFamilymember
 * @desc Creates a new family member for a patient
 * @access Patient
 * @prop {string} Name - The name of the family member
 * @prop {string} NationalID - The national ID of the family member
 * @prop {number} Age - The age of the family member
 * @prop {string} Gender - The gender of the family member ["M", "F"]
 * @prop {string} Relation - The relation of the family member to the patient ["Spouse", "Child"]
 */
router.post("/createFamilymember/:Createparameter", createFamilymember);
router.post("/createFamilymember", checkPatient, createFamilymember);

/**
 * @route GET /patients/getFamilymember
 * @desc Returns a list of all family members for a patient
 * @access Patient
 */
router.get("/getFamilymember/:PatientID", GetFamilymembers); //Changed name of params
router.get("/getFamilymember", checkPatient, GetFamilymembers);
/**
 * @route GET /patients/getPrescriptions
 * @desc Returns a list of all prescriptions
 * @access Public
 */
// TODO: add type check as middleware if needed
router.get("/getPrescriptions", getPrescriptions);

/**
 * @route POST /patients/uploadFile
 * @desc Uploads a file health record
 * @access Patient
 * @prop {string} note - The note of the file in the body
 */
router.post("/uploadFile", upload.single("file"), uploadFile);

/**
 * @route GET /patients/getFiles
 * @desc Returns a list of all files for a patient
 * @access Patient or Admin
 * @param {string} username - The username of the patient in the body if the user is an admin
 */
router.get("/getMedicalHistory", getMedicalHistory);

/**
 * @route GET /patients/downloadFile
 * @desc Downloads a file health record
 * @access Patient or Admin
 * @param {string} filename - The filename in the params
 */
router.get("/downloadFile/:filename", downloadFile); 

/**
 * @route DELETE /patients/removeHealthRecord
 * @desc Removes a file health record
 * @access Patient or Admin
 * @param {string} filename - The filename in the params
 */
router.delete("/removeHealthRecord/:filename", removeHealthRecord);

/**
 * @route GET /patients/selectPatient
 * @desc Returns a list of all patients
 * @access Public
 */
// TODO: add type check as middleware if needed
router.get("/selectPatient", selectPatient);

/**
 * @route GET /patients/selectPrescription
 * @desc Returns a prescription by ID
 * @access Public
 * @param {string} id - The ID of the prescription to get
 */
// TODO: add type check as middleware if needed
router.get("/selectPrescription", selectPrescription);

/**
 * @route GET /patients/getEmergencyContact
 * @desc Returns emergency constant of a patient by username
 * @access Public
 * @param {string} username - The username of the patient
 */
// TODO: add type check as middleware if needed
router.get("/getEmergencyContact/:Username", getEmergencyContact);
router.patch("/subscribehealthpackage/:id", subscribehealthpackage);
router.patch("/subscribepackagefamilymem/:id", subscribepackagefamilymem);
router.get("/viewMyPackage/:PatientID", viewHealthPackage);

module.exports = router;
