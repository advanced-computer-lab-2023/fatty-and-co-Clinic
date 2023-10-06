const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const { default: mongoose } = require("mongoose");
const packageModel = require("../models/packages");
const doctorModel = require("../models/doctors");
const Patient = require("../models/patients");
const { isNull } = require("util");

// view all doctors with speciality and session price
const session_index = (req, res) => {
  const clinicMarkup = 19;
  const packageDis = 0;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }

  patientModel
    .findById(id)
    .then((result) => {
      const packageName = result.PackageName;
      if (!packageName == null) {
        packageModel
          .find({ Name: packageName })
          .then((result) => {
            packageDis = result.SessionDiscount;
          })
          .catch((err) => {
            res.status(500).json({ error: error.message });
          });
      }

      doctorModel
        .find({})
        .then((doctors) => {
          const mySessions = new Array();
          doctors.forEach((doctor) => {
            const calcCost =
              (1 - (packageDis % 100)) *
              (doctor.HourlyRate + 0.1 * clinicMarkup);
            mySessions.push({
              Name: doctor.Name,
              Speciality: doctor.Speciality,
              Cost: calcCost,
            });
          });
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
