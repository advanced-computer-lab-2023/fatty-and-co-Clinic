const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const { default: mongoose } = require("mongoose");
const packageModel = require("../models/packages");
const doctorModel = require("../models/doctors");
const Patient = require("../models/patients");
const prescriptionModel = require("../models/prescriptions");
const { isNull } = require("util");
const { getPatients } = require("./testController");

const createPatient = async (req, res) => {
  const {} = req.body;
  try {
    const patient = await patientModel.create({
      Username: req.body.Username,
      Name: req.body.Name,
      MobileNum: req.body.MobileNum,
      DateOfBirth: req.body.DateOfBirth,
      Gender: req.body.Gender,
      EmergencyContact: req.body.EmergencyContact,
    });
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find();
    res.status(200).send({ patients });
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
    const patient = await patientModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
// view all doctors with speciality and session price
const session_index = (req, res) => {
  // Package discount starts with 0
  let packageDis = 0;
  // Extract the 'id' parameter from the request object
  const { id } = req.params;
  const { Name, Speciality } = req.query;

  // Check if the 'id' parameter is a valid MongoDB ObjectID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }

  // Use the 'findById' method of the 'patientModel' to retrieve a patient document with the specified 'id'
  patientModel
    .findById(id)
    .then((result) => {
      // Extract the 'PackageName' property from the patient document
      const packageName = result.PackageName;
      // If the 'PackageName' property is not null, use the 'find' method of the 'packageModel' to retrieve a package document with the specified 'Name'
      if (!packageName == null) {
        packageModel
          .find({ Name: packageName })
          .then((result) => {
            // Extract the 'SessionDiscount' property from the package document and set the 'packageDis' variable to its value
            packageDis = result.SessionDiscount;
          })
          .catch((err) => {
            res.status(500).json({ error: error.message });
          });
      }

      // Use the 'find' method of the 'doctorModel' to retrieve all doctor documents
      doctorModel
        .find({
          // Search for documents whose 'Name' field contains the 'Name' variable, if it is not empty
          ...(Name ? { Name: { $regex: Name.trim(), $options: "i" } } : {}),
          // Search for documents whose 'Speciality' field contains the 'Speciality' variable, if it is not empty
          ...(Speciality
            ? { Speciality: { $regex: Speciality.trim(), $options: "i" } }
            : {}),
        })
        .then((doctors) => {
          // Create a new array called 'mySessions'
          const mySessions = new Array();
          // Iterate over each doctor document and calculate the cost of a session based on the doctor's hourly rate and the package discount
          doctors.forEach((doctor) => {
            const calcCost = (1 - packageDis / 100) * (doctor.HourlyRate * 1.1); // 1.1 to account for 10% clinic markup
            // Add an object to the 'mySessions' array that contains the doctor's name, speciality, and calculated cost
            mySessions.push({
              Username: doctor.Username,
              Name: doctor.Name,
              Speciality: doctor.Speciality,
              Cost: calcCost,
            });
          });
          // Return a 200 success response with a JSON object that contains the 'mySessions' array
          res.status(200).json(mySessions);
        })
        .catch((err) => {
          res.status(500).json({ error: error.message });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: error.message });
    });
};

const createFamilymember = async (req, res) => {
  const { Name, NationalId, Age, Gender, Relation } = req.body;
  const current_user = "Mariam";
  console.log(Age);
  try {
    const newFamilymember = await familyMemberModel.create({
      PatientUserName: current_user,
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
    const currentPatientuser = req.body.Username;
    const fam = await familyMemberModel.find({
      PatientUserName: currentPatientuser,
    });
    res.status(200).json(fam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const selectPatient = async (req, res) => {
  const id = req.body.id;

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

const getPrescriptions = async (req, res) => {
  try {
    const id = req.body._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "Invalid ID" });
      return;
    }
    const patient = await patientModel.findById(id);
    const prescriptions = await prescriptionModel.find({
      PatientUsername: patient.Username,
    });
    res.status(200).send(prescriptions);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Filter prescriptions by doctor or status or filled or unfilled.
const filterPrescriptions = async (req, res) => {
  const query = req.body;

  const regexQuery = {};

  // Check if a 'DoctorUsername' query is provided
  if (query.DoctorUsername) {
    regexQuery.DoctorUsername = new RegExp(query.DoctorUsername, "i");
  }

  // Check if a 'Date' query is provided
  if (query.Date) {
    // Assuming 'Date' is a field in your schema
    regexQuery.Date = new RegExp(query.Date, "i");
  }

  // Check if a 'Status' query is provided
  if (query.Status) {
    regexQuery.Status = new RegExp(query.Status, "i");
  }

  const patientPrescriptions = prescriptionModel.find({
    PatientUsername: query.PatientUsername,
  });
  // Use the regexQuery in the find method
  try {
    // Use the regexQuery in the find method and await the result
    const prescriptions = await patientPrescriptions.find(regexQuery);
    res.status(200).send(prescriptions);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Use prescription Id to select a prescription.
const selectPrescription = async (req, res) => {
  const prescriptionId = req.body.id;
  try {
    const prescription = await prescriptionModel.findById(prescriptionId);
    res.status(200).send(prescription);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

module.exports = {
  session_index,
  createFamilymember,
  GetFamilymembers,
  selectPatient,
  getPrescriptions,
  filterPrescriptions,
  getPatientUsername,
  createPatient,
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
  selectPrescription,
};
