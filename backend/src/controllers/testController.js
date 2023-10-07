const appointmentModel = require("../models/appointments");
const doctorModel = require("../models/doctors");
const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const systemUserModel = require("../models/systemusers");
const requests = require("../models/requests");
const {
  generateUsername,
  generateName,
  generateDateOfBirth,
  generateHourlyRate,
  generateAffiliation,
  generateEducationalBackground,
  generateSpeciality,
} = require("../common/utils/generators");

// create a new user
const createSystemUser = async (req, res) => {
  const { Username, Password, Email, Type } = req.body;
  try {
    const newUser = await systemUserModel.create({
      Username,
      Password,
      Email,
      Type,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// create patient 
const createPatient = async (req, res) => {
  const { Username, Name,  MobileNum,DateOfBirth,EmergencyContact, 
    FamilyMem} = req.body;
  try {
    const newPatient = await  patientModel.create({
      Username, Name,  MobileNum,DateOfBirth,EmergencyContact, FamilyMem})
      res.status(201).json(newPatient)}
   catch(error){
      res.status(400).json({error:error.message})
   }}

//Create a new appointment

const createAppointment = async (req, res) => {
  const { DoctorUsername, PatientUsername, Status, Date } = req.body;
  try {
    const newApp = await appointmentModel.create({
      DoctorUsername,
      PatientUsername,
      Status,
      Date
    });
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// =======
// create a new doctor
const createDoctor = async (req, res) => {
  const {
    Username,
    Name,
    DateOfBirth,
    HourlyRate,
    Affiliation,
    EducationalBackground,
    Speciality,
  } = req.body;

  const username = Username || generateUsername();
  const name = Name || generateName();
  const dateOfBirth = DateOfBirth || generateDateOfBirth();
  const hourlyRate = HourlyRate || generateHourlyRate();
  const affiliation = Affiliation || generateAffiliation();
  const educationalBackground =
  EducationalBackground || generateEducationalBackground();
  const speciality = Speciality || generateSpeciality();

  try {
    const newDoctor = await doctorModel.create({
      Username: username,
      Name: name,
      DateOfBirth: dateOfBirth,
      HourlyRate: hourlyRate,
      Affiliation: affiliation,
      EducationalBackground: educationalBackground,
      Speciality: speciality,
    });
    res.status(201).json(newDoctor);
// >>>>>>> main
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
    const patients = await patientModel.find({}).sort({ username: 1 }); // sorts by username in ascending order
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).sort({ username: 1 }); // sorts by username in ascending order
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

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
}

const getRequests = async (req, res) => {
  try {
    const request = await requests.find();
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  createSystemUser,
  createPatient,
  createDoctor,
  getSystemUsers,
  getPatients,
  getDoctors,
  getAdmins,
  getRequests,
  createAppointment
}
