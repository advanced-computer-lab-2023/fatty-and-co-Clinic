const appointmentModel = require("../../models/appointments");
const doctorModel = require("../../models/doctors");
const patientModel = require("../../models/patients");
const familyMemberModel = require("../../models/familymembers");
const systemUserModel = require("../../models/systemusers");
const requestModel = require("../../models/requests");
const { default: mongoose } = require("mongoose");

// get a random patient username from db
async function getPatient() {
  try {
    const data = await patientModel.find().select("_id").exec();
    const ids = data.map((patient) => patient._id);
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    console.log(randomId);
    const patient = await patientModel.findById(randomId);
    return patient;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// get a random doctor username from db
async function getDoctor() {
  try {
    const data = await doctorModel.find().select("_id").exec();
    const ids = data.map((doctor) => doctor._id);
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    console.log(randomId);
    const doctor = await doctorModel.findById(randomId);
    return doctor;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

// get a random appointment id, its doctor username and patient username
async function getAppointment() {
  try {
    const data = await appointmentModel.find().select("_id").exec();
    const ids = data.map((appointment) => appointment._id);
    const randomId = ids[Math.floor(Math.random() * ids.length)];
    console.log(randomId);
    const appointment = appointmentModel.findById(randomId);
    return appointment;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getPatient, getDoctor, getAppointment };
