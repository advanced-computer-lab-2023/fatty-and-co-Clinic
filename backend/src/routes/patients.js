const express = require("express");
const {
  payForFamSubscription,
  cancelSubscription,
  viewHealthFam,
  viewHealthPackage,
  subscribehealthpackage,
  subscribepackagefamilymem,
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
  getPatientUsername,
  viewOptionPackages,
  session_index,
  createFamilymember,
  GetFamilymembers,
  getPrescriptions,
  selectPatient,
  selectPrescription,
  getEmergencyContact,
  cancelSubscriptionfamilymember,
  payForSubscription,
  viewHealthPackagewithstatus,
  viewHealthFamwithstatus,
} = require("../controllers/patientController");
const { constants } = require("buffer");
const { checkPatient } = require("../common/middleware/checkType");

const router = express.Router();

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
 * @route GET /patients/viewFamilyPackage
 * @desc View family health package for the patient
 * @access Private
 */
router.get("/viewFamilyPackage", checkPatient, viewHealthFam);

/**
 * @route GET /patients/getOptionPackages
 * @desc Get option packages for the patient
 * @access Private
 */
router.get("/getOptionPackages", checkPatient, viewOptionPackages);

/**
 * @route PATCH /patients/cancelSubscription
 * @desc Cancel subscription for the patient
 * @access Private
 */
router.patch("/cancelSubscription", checkPatient, cancelSubscription);

/**
 * @route PATCH /patients/cancelSubscriptionfamilymember
 * @desc Cancel subscription for the family member of the patient
 * @access Private
 */
router.patch(
  "/cancelSubscriptionfamilymember",
  checkPatient,
  cancelSubscriptionfamilymember
);

/**
 * @route PATCH /patients/payForSubscription
 * @desc Pay for subscription for the patient
 * @access Private
 */
router.patch("/payForSubscription", checkPatient, payForSubscription);

/**
 * @route GET /patients/viewHealthPackagewithstatus
 * @desc View health package with status for the patient
 * @access Private
 */
router.get(
  "/viewHealthPackagewithstatus",
  checkPatient,
  viewHealthPackagewithstatus
);

/**
 * @route GET /patients/viewHealthFamwithstatus
 * @desc View health family with status for the patient
 * @access Private
 */
router.get("/viewHealthFamwithstatus", checkPatient, viewHealthFamwithstatus);
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
router.get("/getEmergencyContact/:Username", getEmergencyContact);

/**
 * @route POST /patients/subscribehealthpackage
 * @desc Subscribe to a health package for the patient
 * @access Private
 */
router.post("/subscribehealthpackage", subscribehealthpackage);

/**
 * @route POST /patients/subscribepackagefamilymem
 * @desc Subscribe to a health package for a family member of the patient
 * @access Private
 */
router.post("/subscribepackagefamilymem", subscribepackagefamilymem);

/**
 * @route GET /patients/viewMyPackage
 * @desc View the health package of the patient
 * @access Private
 */
router.get("/viewMyPackage/", viewHealthPackage);

/**
 * @route PATCH /patients/payFamilySubscription
 * @desc Pay for the family subscription for the patient
 * @access Private
 */
router.patch("/payFamilySubscription/", payForFamSubscription);

module.exports = router;
