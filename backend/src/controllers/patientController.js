const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const { default: mongoose } = require("mongoose");
const packageModel = require("../models/packages");
const doctorModel = require("../models/doctors");
const Patient = require("../models/patients");
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









module.exports = { session_index };
