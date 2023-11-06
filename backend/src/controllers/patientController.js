const { default: mongoose } = require("mongoose");

const patientModel = require("../models/patients");
const userModel = require("../models/systemusers");
const familyMemberModel = require("../models/familymembers");
const packageModel = require("../models/packages");
const doctorModel = require("../models/doctors");
const Patient = require("../models/patients");
const prescriptionModel = require("../models/prescriptions");
const { isNull } = require("util");
const { getPatients } = require("./testController");
const User = require("../models/systemusers");

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find();
    res.status(200).send({ patients });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//a function to get the details of the emergency contact of a patient by patient username
const getEmergencyContact = async (req, res) => {
  try {
    const { Username } = req.params;
    const patient = await patientModel.findOne({ Username: Username });

    console.log(patient);

    if (!patient) {
      res.status(404).send({ message: "Patient not found." });
      return;
    }

    const EmergencyContact = patient.EmergencyContact;
    const Name = patient.Name;
    console.log(Name);
    if (!EmergencyContact) {
      res
        .status(404)
        .send({ message: "Emergency contact not found for the patient." });
      return;
    }

    res.status(200).send({ EmergencyContact });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//find patient by id
const getPatient = async (req, res) => {
  try {
    const patient = await patientModel.findById(req.params.id);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//find patient by username
const getPatientUsername = async (req, res) => {
  try {
    const { Username } = req.params;
    const patient = await patientModel.find({ Username: Username });
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// I think this is useless?
// if not useless it needs to delete from user model, apppointments, etc just like in admin controller
const deletePatient = async (req, res) => {
  try {
    const patient = await patientModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await patientModel.findByIdAndUpdate(req.user.id, req.body);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// view all doctors with speciality and session price
const session_index = async (req, res) => {
  const username = req.user.Username;
  const { Name, Speciality } = req.query;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "Invalid ID" });
  // }

  try {
    const patient = await patientModel.findOne({ Username: username });
    let packageDis = 0;

    if (patient.PackageName) {
      const package = await packageModel.findOne({ Name: patient.PackageName });
      packageDis = package.Session_Discount;
    }

    const query = {
      ...(Name ? { Name: { $regex: Name.trim(), $options: "i" } } : {}),
      ...(Speciality
        ? { Speciality: { $regex: Speciality.trim(), $options: "i" } }
        : {}),
    };

    const doctors = await doctorModel.find(query);

    const mySessions = doctors.map((doctor) => {
      const calcCost = (1 - packageDis / 100) * (doctor.HourlyRate * 1.1);
      return {
        Username: doctor.Username,
        Name: doctor.Name,
        Speciality: doctor.Speciality,
        Cost: calcCost,
      };
    });

    res.status(200).json(mySessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createFamilymember = async (req, res) => {
  const { Name, NationalId, Age, Gender, Relation } = req.body;
  const Createpatameter = req.user.Username;
  console.log(Createpatameter);

  // Check if the national ID is not 16.
  if (NationalId.length !== 16) {
    // Return an error message.
    res.status(400).json({ error: "The national ID must be 16 digits long." });
    return;
  }
  // check if age are only 2 digitd
  if (Age.length === 0 || Age.length > 2 || Age == 0) {
    // Return an error message.
    res.status(400).json({ error: "The age must be 1 or 2 digits" });
    return;
  }
  try {
    const newFamilymember = await familyMemberModel.create({
      PatientUserName: Createpatameter,
      Name: Name,
      NationalId: NationalId,
      Age: Age,
      Gender: Gender,
      Relation: Relation,
    });
    res.status(200).json(newFamilymember);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const GetFamilymembers = async (req, res) => {
  try {
    const PatientUserName = req.user.Username;
    console.log(req.params);
    const fam = await familyMemberModel.find({
      PatientUserName: PatientUserName,
    });
    //  console.log(fam)
    res.status(200).json(fam);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const selectPatient = async (req, res) => {
  const id = req.query.id;

  // Get the patient.
  const patient = await patientModel.findById(id);

  // If the patient is not found, return a 404 error.
  if (!patient) {
    res.status(404).send("Patient not found.");
    return;
  }

  // Remove the timestamp from the patient object.
  delete patient.createdAt;
  delete patient.updatedAt;

  // Return the patient object.
  res.status(200).send(patient);
};

// Get prescriptions of a given patient. Can also be filtered
// using `DoctorUsername` or `Date` or `Status`.
const getPrescriptions = async (req, res) => {
  // const query = req.query;
  // console.log(query);
  const patientUsername = req.user.Username; // Extract patientUsername
  // console.log(req.params.patientUsername);

  try {
    const baseQuery = { PatientUsername: patientUsername };
    const regexQuery = {};

    if (query.DoctorName) {
      regexQuery.DoctorName = new RegExp(query.DoctorName, "i");
    }
    if (query.Date) {
      const date = new Date(query.Date);
      const nextDay = date.addDays(1);
      regexQuery.Date = {
        $gte: date,
        $lt: nextDay,
      };
      console.log(date);
      console.log(nextDay);
      console.log(regexQuery.Date);
    }
    if (query.Status) {
      regexQuery.Status = query.Status;
    }

    const patientPrescriptions = await prescriptionModel.find({
      ...baseQuery,
      ...regexQuery,
    });

    res.status(200).send(patientPrescriptions);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Use prescription Id to select a prescription.
const selectPrescription = async (req, res) => {
  const prescriptionId = req.query.id;
  try {
    const prescription = await prescriptionModel.findById(prescriptionId);
    res.status(200).send(prescription);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

module.exports = {
  session_index,
  createFamilymember,
  GetFamilymembers,
  selectPatient,
  getPrescriptions,
  getPatientUsername,
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
  selectPrescription,
  getEmergencyContact,
};
