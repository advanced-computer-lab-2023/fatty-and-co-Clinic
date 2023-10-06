const appointmentModel = require("../models/appointments");
const doctorModel = require("../models/doctors");
const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const systemUserModel = require("../models/systemusers");

// create a new user
const createSystemUser = async (req, res) => {
  const { Username, Password, Email, Type } = req.body;
  try {
    const newUser = await systemUser.create({
      Username,
      Password,
      Email,
      Type,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create patient 
const createPatient = async (req, res) => {
  const { Username, Name,  MobileNum,DateOfBirth,EmergencyContact, 
    FamilyMem} = req.body;
  try {
    const newPatient = await  patientModel.create({
      Username, Name,  MobileNum,DateOfBirth,EmergencyContact, 
      FamilyMem
    });
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all users
const getSystemUsers = async (req, res) => {
  try {
    const users = await systemUserModel.find({}).sort({ type: 1 }); // sorts by username in ascending order
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await patientModel
      .find({ type: "patient" })
      .sort({ username: 1 }); // sorts by username in ascending order
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel
      .find({ type: "doctor" })
      .sort({ username: 1 }); // sorts by username in ascending order
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await systemUserModel
      .find({ Type: "admin" })
      .sort({ Username: 1 }); // sorts by username in ascending order
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSystemUser,
  createPatient,
  getSystemUsers,
  getPatients,
  getDoctors,
  getAdmins,
};
