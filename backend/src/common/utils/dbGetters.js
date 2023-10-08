const appointmentModel = require("../../models/appointments");
const doctorModel = require("../../models/doctors");
const patientModel = require("../../models/patients");
const familyMemberModel = require("../../models/familymembers");
const systemUserModel = require("../../models/systemusers");
const requestModel = require("../../models/requests");
const { default: mongoose } = require("mongoose");

// get a random patient username from db
async function getPatientUsername() {
  try {
    const data = await patientModel.find().select("Username").exec();
    const usernames = data.map((patient) => patient.Username);
    const randomUsername =
      usernames[Math.floor(Math.random() * usernames.length)];
    return String(randomUsername);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// get a random doctor username from db
async function getDoctorUsername() {
  try {
    const data = await doctorModel.find().select("Username").exec();
    const usernames = data.map((doctor) => doctor.Username);
    const randomUsername =
      usernames[Math.floor(Math.random() * usernames.length)];
    return String(randomUsername);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getPatientUsername, getDoctorUsername };
