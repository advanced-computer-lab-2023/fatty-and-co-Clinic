const appointmentModel = require("../models/appointments");
const doctorModel = require("../models/doctors");
const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const systemUserModel = require("../models/systemusers");
const requestModel = require("../models/requests");
const { default: mongoose } = require("mongoose");
const {
  generateUsername,
  generateName,
  generateDateOfBirth,
  generateHourlyRate,
  generateAffiliation,
  generateEducationalBackground,
  generateSpeciality,
  generateMobileNum,
  generatePackage,
  generateEmail,
  generatePassword,
  generateWorkingDays,
  generateStartTimeAndEndTime,
  generateAppointmentStatus,
  generateAppointmentDate,
} = require("../common/utils/generators");
const {
  getPatientUsername,
  getDoctorUsername,
} = require("../common/utils/dbGetters");

// create a new user
// create a new System User
const createSystemUser = async (req, res) => {
  const { Username, Password, Email, Type } = req.body;

  const username = Username || generateUsername();
  const password = Password || generatePassword();
  const email = Email || generateEmail();
  const type = Type || "Admin";
  console.log(username, password, email, type);
  try {
    const newUser = await systemUserModel.create({
      Username: username,
      Password: password,
      Email: email,
      Type: type,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create a new appointment
const createAppointment = async (req, res) => {
  const { DoctorUsername, PatientUsername, Status, Date } = req.body;
  try {
    const newApp = await appointmentModel.create({
      DoctorUsername,
      PatientUsername,
      Status,
      Date,
    });
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
    WorkingDays,
    StartTime,
    EndTime,
  } = req.body;

  const username = Username || generateUsername();
  const name = Name || generateName();
  const dateOfBirth = DateOfBirth || generateDateOfBirth();
  const hourlyRate = HourlyRate || generateHourlyRate();
  const affiliation = Affiliation || generateAffiliation();
  const educationalBackground =
    EducationalBackground || generateEducationalBackground();
  const speciality = Speciality || generateSpeciality();
  const workingDays = WorkingDays || generateWorkingDays();
  const { startTime, endTime } =
    StartTime && EndTime
      ? { startTime: StartTime, endTime: EndTime }
      : generateStartTimeAndEndTime();

  try {
    const newDoctor = await doctorModel.create({
      Username: username,
      Name: name,
      DateOfBirth: dateOfBirth,
      HourlyRate: hourlyRate,
      Affiliation: affiliation,
      EducationalBackground: educationalBackground,
      Speciality: speciality,
      WorkingDays: workingDays,
      StartTime: startTime,
      EndTime: endTime,
    });
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a new patient
const createPatient = async (req, res) => {
  const { Username, Name, MobileNum, DateOfBirth, PackageName } = req.body;

  const username = Username || generateUsername();
  const name = Name || generateName();
  const mobileNum = MobileNum || generateMobileNum();
  const dateOfBirth = DateOfBirth || generateDateOfBirth();
  const packageName = PackageName || generatePackage();

  try {
    const newPatient = await patientModel.create({
      Username: username,
      Name: name,
      MobileNum: mobileNum,
      DateOfBirth: dateOfBirth,
      PackageName: packageName,
    });
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a random appointment
const createRandomAppointment = async (req, res) => {
  const { DoctorUsername, PatientUsername, Status, Date } = req.body;
  const doctorUsername = DoctorUsername || String(await getDoctorUsername());
  const patientUsername = PatientUsername || String(await getPatientUsername());
  const status = Status || generateAppointmentStatus();
  const date = Date || generateAppointmentDate();

  console.log(doctorUsername, patientUsername, status, date);

  try {
    const newApp = await appointmentModel.create({
      DoctorUsername: doctorUsername,
      PatientUsername: patientUsername,
      Status: status,
      Date: date,
    });
    res.status(201).json(newApp);
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
};

// get all admins
const getAdmins = async (req, res) => {
  try {
    const admins = await systemUserModel
      .find({ Type: "Admin" })
      .sort({ Username: 1 }); // sorts by username in ascending order
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const request = await requestModel.find();
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createSystemUser,
  createDoctor,
  createPatient,
  getSystemUsers,
  getPatients,
  getDoctors,
  getAdmins,
  getRequests,
  createAppointment,
  createRandomAppointment,
};
