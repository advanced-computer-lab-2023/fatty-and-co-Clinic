const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const { default: mongoose } = require("mongoose");
const packageModel = require("../models/packages");
const doctorModel = require("../models/doctors");
const Patient = require("../models/patients");
const prescriptionModel = require("../models/prescriptions");
const { isNull } = require("util");

// view all doctors with speciality and session price
const session_index = (req, res) => {
  // Package discount starts with 0
  let packageDis = 0;
  // Extract the 'id' parameter from the request object
  const { id } = req.params;

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
        .find({})
        .then((doctors) => {
          // Create a new array called 'mySessions'
          const mySessions = new Array();
          // Iterate over each doctor document and calculate the cost of a session based on the doctor's hourly rate and the package discount
          doctors.forEach((doctor) => {
            const calcCost = (1 - packageDis / 100) * (doctor.HourlyRate * 1.1); // 1.1 to account for 10% clinic markup
            // Add an object to the 'mySessions' array that contains the doctor's name, speciality, and calculated cost
            mySessions.push({
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

const getPrescriptions = async (req, res) => {
  try {
    const id = req.body._id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).json({ error: "Invalid ID" });
      return;
    }
    const patient = await patientModel.findById(id);
    const prescriptions = await prescriptionModel.find({ PatientUsername: patient.Username });
    res.status(200).send(prescriptions);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
}

module.exports = { session_index, createFamilymember, GetFamilymembers, getPrescriptions };
