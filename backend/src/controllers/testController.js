const appointmentModel = require("../models/appointments");
const doctorModel = require("../models/doctors");
const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const subscriptionModel = require("../models/subscriptions");
const systemUserModel = require("../models/systemusers");
const requestModel = require("../models/requests");
const prescriptionModel = require("../models/prescriptions");
const docSlotsModel = require("../models/docSlots");

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
  generateNationalId,
  generatePackage,
  generateEmail,
  generatePassword,
  generateWorkingDays,
  generateStartTimeAndEndTime,
  generateAppointmentStatus,
  generateAppointmentDate,
  generateUserType,
  generateMedicine,
  generateDiagnosis,
  generatePrescriptionStatus,
  generateGender,
  generateOneWorkingDay,
  generateStartTime,
} = require("../common/utils/generators");
const {
  getPatient,
  getDoctor,
  getAppointment,
} = require("../common/utils/dbGetters");
const User = require("../models/systemusers");

// create a new System User
const createSystemUser = async (req, res) => {
  const { Username, Password, Email, Type } = req.body;

  const username = Username || generateUsername();
  const password = Password || generatePassword();
  const email = Email || generateEmail();
  const type = Type || generateUserType();
  try {
    const newUser = await systemUserModel.addEntry(
      username,
      password,
      email,
      type
    );
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const acceptDoc = async (req, res) => {
  const { request } = req.body;
  try {
    const doc = await doctorModel.create({
      Username: Username,
      Name: request.Name,
      DateOfBirth: request.DateOfBirth,
      HourlyRate: request.HourlyRate,
      Affiliation: request.Affiliation,
      EducationalBackground: request.EducationalBackground,
      Speciality: request.Speciality,
    });
    const user = await userModel.addEntry(
      Username,
      request.Password,
      request.Email,
      "Doctor"
    );
    res.status(200).json({ doc, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Create a new appointment
const createAppointment = async (req, res) => {
  console.log("creating appointment");
  console.log(req.user.Username);
  const username = req.user.Username;
  var patient;
  var patNameFinal;

  const { DoctorId, FamMemName, Date } = req.body;
  console.log("body: " + req.body.FamMemName);
  //this patient is technically fam member
  if (!FamMemName) {
    console.log("fam");
    Familymemebr = await patientModel.findOne({ FamMemName: username });
    patNameFinal = patient.Name;
  } else {
    console.log("user");
    patient = await patientModel.findOne({ Username: username });
    patNameFinal = FamMemName;
  }
  const doctor = await doctorModel.findOne({ _id: DoctorId });
  const PatientName = patNameFinal;
  const PatientUsernameFinal = patient.Username;
  const DoctorName = doctor.Name;
  console.log("doc name: " + DoctorName);
  const DoctorUsername = doctor.Username;
  const Status = "Upcoming";
  try {
    console.log("creating");
    const newApp = await appointmentModel.create({
      DoctorUsername,
      DoctorName,
      PatientUsername: PatientUsernameFinal,
      PatientName,
      Status,
      Date,
    });
    console.log("created");
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// create a new doctor
const createDoctor = async (req, res) => {
  const {
    Username,
    Password,
    Email,
    Name,
    DateOfBirth,
    HourlyRate,
    Affiliation,
    EducationalBackground,
    Speciality,
    // WorkingDays,
    // StartTime,
    // EndTime,
  } = req.body;

  const username = Username || generateUsername();
  const password = Password || generatePassword();
  const email = Email || generateEmail();
  const name = Name || generateName();
  const dateOfBirth = DateOfBirth || generateDateOfBirth();
  const hourlyRate = HourlyRate || generateHourlyRate();
  const affiliation = Affiliation || generateAffiliation();
  const educationalBackground =
    EducationalBackground || generateEducationalBackground();
  const speciality = Speciality || generateSpeciality();
  // const workingDays = WorkingDays || generateWorkingDays();
  // const { startTime, endTime } =
  //   StartTime && EndTime
  //     ? { startTime: StartTime, endTime: EndTime }
  //     : generateStartTimeAndEndTime();

  try {
    await requestModel.create({
      Username: username,
      Password: password,
      Email: email,
      Name: name,
      DateOfBirth: dateOfBirth,
      HourlyRate: hourlyRate,
      Affiliation: affiliation,
      EducationalBackground: educationalBackground,
      Speciality: speciality,
      Status: "Accepted",
    }); // create a request for the doctor
    await systemUserModel.addEntry(username, password, email, "Doctor");
    const newDoctor = await doctorModel.create({
      Username: username,
      Name: name,
      DateOfBirth: dateOfBirth,
      HourlyRate: hourlyRate,
      Affiliation: affiliation,
      EducationalBackground: educationalBackground,
      Speciality: speciality,
      //WorkingDays: workingDays,
      //StartTime: startTime,
      //EndTime: endTime,
    });
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//create a new doctor slot

// create a new patient
const createPatient = async (req, res) => {
  const {
    Username,
    Password,
    Name,
    MobileNum,
    NationalId,
    EmergencyContact,
    Gender,
    DateOfBirth,
    PackageName,
  } = req.body;

  const username = Username || generateUsername();
  const password = Password || generatePassword();
  const name = Name || generateName();
  const mobileNum = MobileNum || generateMobileNum();
  const nationalId = NationalId || generateNationalId();
  const dateOfBirth = DateOfBirth || generateDateOfBirth();
  const packageName = PackageName || generatePackage();
  const emergencyContact = EmergencyContact || {
    FullName: generateName(),
    PhoneNumber: generateMobileNum(),
  };
  const gender = Gender || generateGender();

  try {
    await systemUserModel.addEntry(
      username,
      password,
      generateEmail(),
      "Patient"
    );
    const newPatient = await patientModel.create({
      Username: username,
      Name: name,
      MobileNum: mobileNum,
      NationalId: nationalId,
      Gender: gender,
      EmergencyContact: emergencyContact,
      DateOfBirth: dateOfBirth,
      PackageName: packageName,
    });

    const newPat = await patientModel.findOne({ Username: username });
    const newUnsubscribed = await subscriptionModel.create({
      Patient: newPat,
      Status: "Unsubscribed",
    });
    
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// create family member
/*
   const newFamilymember = await familyMemberModel.create({
      Patient: findPatientMain,
      FamilyMem:familymember,
     // FamilyMemberUsername:familymember.username,
      Name: Name,
      NationalId: NationalId,
      Age: Age,
      Gender: Gender,
      Relation: Relation,
    });

*/

// const createfamilymember = async (req, res) => {
//  const  currentuser=req.user.Username;
// const  currentPatient=await patientModel.find({Username:currentuser});
//   const {
//     Username,
//     Password,
//     Name,
//     MobileNum,
//     NationalId,
//     relation,
//     EmergencyContact,
//     Gender,
//     DateOfBirth,
//     PackageName,
//   } = req.body;

//   const username = Username || generateUsername();
//   const password = Password || generatePassword();
//   const name = Name || generateName();
//   const mobileNum = MobileNum || generateMobileNum();
//   const nationalId = NationalId || generateNationalId();
//   const dateOfBirth = DateOfBirth || generateDateOfBirth();
//   const packageName = PackageName || generatePackage();
//   const emergencyContact = EmergencyContact || {
//     FullName: generateName(),
//     PhoneNumber: generateMobileNum(),
//   };
//   const gender = Gender || generateGender();

//   try {
//     await systemUserModel.addEntry(
//       username,
//       password,
//       generateEmail(),
//       "Patient"
//     );
//     const familyMember = await patientModel.create({
//       Username: username,
//       Name: name,
//       MobileNum: mobileNum,
//       NationalId: nationalId,
//       Gender: gender,
//       EmergencyContact: emergencyContact,
//       DateOfBirth: dateOfBirth,
//       PackageName: packageName,
//     });
//     const currentDate = new Date();
//     const dob = new Date(familyMember.DateOfBirth);
//   const newFamilymember = await familyMemberModel.create({
//       Patient: currentPatient,
//       FamilyMem: familyMember,
//       FamilyMemberUsername: familyMember.Username,
//       Name: familyMember.Name,
//       NationalId: familyMember.NationalId,
//       Age: Math.floor(
//         Math.abs(currentDate.getTime() - dob.getTime()) / 31557600000
//       ),
//       Gender: familyMember.Gender,
//       Relation: relation
//     });
  
//     const newUnsubscribed = await subscriptionModel.create({
//       Patient: familyMember,
//       Status: "Unsubscribed",
//     });
//     res.status(201).json(newFamilymember);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
// create a random appointment
const createRandomAppointment = async (req, res) => {
  const {
    DoctorUsername,
    PatientUsername,
    PatientName,
    DoctorName,
    Status,
    Date,
  } = req.body;
  const doctor = await getDoctor();
  const doctorUsername = DoctorUsername || doctor.Username;
  const doctorName = DoctorName || doctor.Name;
  // const workingDays = doctor.WorkingDays;
  // const startTime = doctor.StartTime;
  // const endTime = doctor.EndTime;
  const patient = await getPatient();
  const patientUsername = PatientUsername || patient.Username;
  const patientName = PatientName || patient.Name;
  const status = Status || generateAppointmentStatus();
  const date = Date;
  //|| generateAppointmentDate(workingDays, startTime, endTime);

  try {
    const newApp = await appointmentModel.create({
      DoctorUsername: doctorUsername,
      DoctorName: doctorName,
      PatientUsername: patientUsername,
      PatientName: patientName,
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

const getAppointments = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({}); // sorts by username in ascending order
    res.status(200).json(appointments);
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

const createPrescription = async (req, res) => {
  const {
    AppointmentId,
    DoctorUsername,
    DoctorName,
    PatientUsername,
    Date,
    Status,
    Diagnosis,
    Medicine,
  } = req.body;
  const appointment = await getAppointment();
  const appointmentId = AppointmentId || appointment._id;
  const doctorUsername = DoctorUsername || appointment.DoctorUsername;
  const doctorName = DoctorName || appointment.DoctorName;
  const patientUsername = PatientUsername || appointment.PatientUsername;
  const date = Date || appointment.Date;
  const diagnosis = Diagnosis || generateDiagnosis();
  const status = Status || generatePrescriptionStatus();
  const medicine = Medicine || generateMedicine();

  try {
    const newPrescription = await prescriptionModel.create({
      AppointmentId: appointmentId,
      DoctorUsername: doctorUsername,
      DoctorName: doctorName,
      PatientUsername: patientUsername,
      Date: date,
      Diagnosis: diagnosis,
      Status: status,
      Medicine: medicine,
    });
    res.status(201).json(newPrescription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createDocSlot = async (req, res) => {
  const { DoctorId, WorkingDay, StartTime } = req.body;

  const doctorId = DoctorId;
  const workingDay = WorkingDay;
  const startTime = StartTime;

  try {
    const newDocSlot = await docSlotsModel.create({
      WorkingDay: workingDay,
      StartTime: startTime,
      DoctorId: doctorId,
    });
    res.status(201).json(newDocSlot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDocSlot = async (req, res) => {
  try {
    const docSlots = await docSlotsModel.find().populate("DoctorId");
    res.status(201).json(docSlots);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  getAppointments,
  createAppointment,
  createRandomAppointment,
  createPrescription,
  createDocSlot,
  getDocSlot,
  acceptDoc,
};
