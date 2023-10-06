const appointment = require("../models/appointments");
const doctor = require("../models/doctors");
const patient = require("../models/patients");
const familyMember = require("../models/familymembers");
const systemUser = require("../models/systemusers");

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

// get all users
const getSystemUsers = async (req, res) => {
  try {
    const users = await systemUser.find({}).sort({ type: 1 }); // sorts by username in ascending order
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all patients
const getPatients = async (req, res) => {
  try {
    const patients = await patient
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
    const doctors = await doctor.find({ type: "doctor" }).sort({ username: 1 }); // sorts by username in ascending order
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await systemUser
      .find({ Type: "admin" })
      .sort({ Username: 1 }); // sorts by username in ascending order
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createSystemUser,
  getSystemUsers,
  getPatients,
  getDoctors,
  getAdmins,
};
