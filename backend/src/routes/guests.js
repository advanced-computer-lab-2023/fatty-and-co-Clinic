const express = require("express");
const {
  createPatient,
  createRequest,
  updateRequest,
  updateEmail,
  login,
  updatePass,
  sendOTP,
  validateOTP,
  resetPass,
  getNotifs,
  viewNotif,
} = require("../controllers/guestController");
const requireAuth = require("../common/middleware/requireAuth");
const { cpUpload } = require("../common/middleware/doctorUpload");
const send = require("send");

const router = express.Router();

// MAKE SURE TO ADD ANY ROUTES THAT REQUIRE AUTHENTICATION UNDER THE REQUIREAUTH MIDDLEWARE
// the following routes do not require authentication

// use this for login page and such
router.get("/", (req, res) => {
  res.send("Guests");
});

router.post("/login", login);

router.post("/sendOTP", sendOTP);
router.post("/validateOTP", validateOTP);

/**
 * @route POST /patients/addPatient
 * @desc patient signup
 * @access Public
 * @prop {string} Username - The username of the patient
 * @prop {string} Name - The name of the patient
 * @prop {string} Password - The password of the patient
 * @prop {string} Email - The email of the patient
 * @prop {string} MobileNum - The mobile number of the patient
 * @prop {string} DateOfBirth - The date of birth of the patient
 * @prop {string} Gender - The gender of the patient ["M", "F"]
 * @prop {string} EmergencyContactNumber - The emergency contact number of the patient
 * @prop {string} EmergencyContactName - The emergency contact name of the patient
 */
router.post("/addPatient", createPatient);

/**
 * @route POST /guests/addRequest
 * @desc doctor signup request
 * @access Public
 * @prop {string} Username - The username of the doctor
 * @prop {string} Password - The password of the doctor
 * @prop {string} Email - The email of the doctor
 * @prop {string} Name - The name of the doctor
 * @prop {string} DateOfBirth - The date of birth of the doctor
 * @prop {number} HourlyRate - The hourly rate of the doctor
 * @prop {string} Affiliation - The affiliation of the doctor
 * @prop {string} EducationalBackground - The educational background of the doctor
 * @prop {string} Speciality - The speciality of the doctor
 */
router.post("/addRequest", cpUpload, createRequest);

router.patch("/resetPass/", resetPass);
// the following routes require authentication
router.use(requireAuth);

router.get("/getNotifs", getNotifs);
router.patch("/viewNotif", viewNotif);

// TODO: add type check as middleware if needed
router.put("/updateRequest/:id", updateRequest);

// TODO: add type check as middleware if needed
router.patch("/updateEmail", updateEmail);

router.patch("/updatePass/", updatePass);

module.exports = router;
