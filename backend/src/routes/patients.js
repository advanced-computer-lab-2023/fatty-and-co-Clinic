const express = require("express");
const {
  uploadFile,
  getMedicalHistory,
  downloadFile,
  removeHealthRecord,
  getWalletAmount,
  getAmountSubscription,
  getAmountFam,
  updateFamCredit,
  updateSubscription,
  payForFamSubscription,
  cancelSubscription,
  viewHealthFam,
  viewHealthPackage,
  subscribepackagefamilymem,
  getAllPatients,
  deletePatient,
  getPatient,
  getPatientInfo,
  updatePatient,
  getPatientUsername,
  viewOptionPackages,
  session_index,
  createFamilymember,
  getFamilymembers,
  getPrescriptions,
  selectPatient,
  selectPrescription,
  getEmergencyContact,
  linkPatient,
  cancelSubscriptionfamilymember,
  payForSubscription,
  viewHealthPackagewithstatus,
  viewHealthFamwithstatus,
  viewUpcomingAppointmentsPat,
  viewPastAppoitmentsPat,
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
router.get("/viewFamilyPackage", viewHealthFam);
/**
=======
>>>>>>> main
 * @route GET /patients/getAllPatients
 * @desc Returns a list of all patients
 * @access Public
 */
router.get("/getAllPatients", getAllPatients);
router.get("/getWalletAmount", getWalletAmount);
/**
 * @route DELETE /patients/deletePatient/:id
 * @desc Deletes a patient by ID
 * @access Public
 * @param {string} id - The ID of the patient to delete
 */
router.delete("/deletePatient/:id", deletePatient); // TODO: check if the one deleting is an admin or the currently logged in patient

/**
 * @route GET /patients/getPatient/:id
 * @desc Returns a patient by ID
 * @access Public
 * @param {string} id - The ID of the patient to get
 */
router.get("/getPatient/:id", getPatient);
router.get("/getPatientInfo", getPatientInfo)
router.get("/getOptionPackages", viewOptionPackages);
router.patch("/getAmountCredit", getAmountSubscription); //gets amount to be paid for self
router.patch("/getAmountCreditFam", getAmountFam); //gets amount to be paid for fam
router.patch("/updateFamSubs", updateFamCredit); //updates status fam
router.patch("/updateMySubs", updateSubscription); //updates status leya
router.patch("/cancelSubscription", cancelSubscription);
router.patch("/cancelSubscriptionfamilymember", cancelSubscriptionfamilymember);
router.patch("/payForSubscription", payForSubscription);
router.get("/viewHealthPackagewithstatus", viewHealthPackagewithstatus);
router.get("/viewHealthFamwithstatus", viewHealthFamwithstatus);
//router.patch("/cancelSubscription",paym)
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
router.patch("/updatePatient", checkPatient, updatePatient);

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
router.post("/createFamilymember", checkPatient, createFamilymember);

/**
 * @route GET /patients/getFamilymember
 * @desc Returns a list of all family members for a patient
 * @access Patient
 */
router.get("/getFamilymember", checkPatient, getFamilymembers);
// TODO: DO WE NEED THIS??
router.get("/getFamilymember/:Patient", getFamilymembers); //Changed name of params
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
 * @access Patient or Doctor
 * @prop {string} note - The note of the file in the params
 */
router.post("/uploadFile/:username", upload.single("file"), uploadFile);

/**
 * @route GET /patients/getMedicalHistory
 * @desc Returns the medical history(list of [file,note]) for a patient
 * @access Patient or Doctor
 * @param {string} username - The username of the Patient in the params if the user is an Doctor
 */
router.get("/getMedicalHistory/:username", getMedicalHistory);

/**
 * @route GET /patients/downloadFile
 * @desc Downloads a file health record
 * @access Patient or Doctor
 * @param {string} filename - The filename in the params
 */
router.get("/downloadFile/:filename", downloadFile);

/**
 * @route DELETE /patients/removeHealthRecord
 * @desc Removes a file health record
 * @access Patient 
 * @param {string} filename - The filename in the params
 */
router.delete("/removeHealthRecord/:filename", removeHealthRecord);

/**
 * @route GET /patients/selectPatient
 * @desc Returns a list of all patients
 * @access Public
 */
router.get("/selectPatient", selectPatient);

/**
 * @route GET /patients/selectPrescription
 * @desc Returns a prescription by ID
 * @access Public
 * @param {string} id - The ID of the prescription to get
 */
router.get("/selectPrescription", selectPrescription);

/**
 * @route GET /patients/getEmergencyContact
 * @desc Returns emergency constant of a patient by username
 * @access Public
 * @param {string} username - The username of the patient
 */
router.get("/getEmergencyContact/:Username", getEmergencyContact);
router.patch("/linkPatient", linkPatient);
router.post("/subscribepackagefamilymem", subscribepackagefamilymem);
router.get("/viewMyPackage/", viewHealthPackage);
router.patch("/payFamilySubscription/", payForFamSubscription);
router.get("/viewUpcomingAppointmentsPat", checkPatient, (req, res) => {
  viewUpcomingAppointmentsPat(req, res);
});
router.get("/viewPastAppoitmentsPat", checkPatient, (req, res) => {
  viewPastAppoitmentsPat(req, res);
});

module.exports = router;
