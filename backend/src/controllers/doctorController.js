const doctorModel = require("../models/doctors");
const appointmentModel = require("../models/appointments");
const prescriptionsModel = require("../models/prescriptions");
const patientModel = require("../models/patients");
const { default: mongoose } = require("mongoose");
const systemUserModel = require("../models/systemusers");

// create a doctor
// const createDoctor = async (req, res) => {
//   const {
//     Username,
//     Name,
//     DateOfBirth,
//     HourlyRate,
//     Affiliation,
//     EducationalBackground,
//   } = req.body;

//   try {
//     const doc = await doctorModel.create({
//       Username: Username,
//       Name: Name,
//       DateOfBirth: DateOfBirth,
//       HourlyRate: HourlyRate,
//       Affiliation: Affiliation,
//       EducationalBackground: EducationalBackground,
//     });

//     res.status(200).json(doc);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
const createDoctor = async (req, res) => {
  const {} = req.body;
  try {
    const doctor = await doctorModel.create({
      Username: req.body.Username,
      Name: req.body.Name,
      DateOfBirth: req.body.DateOfBirth,
      HourlyRate: req.body.HourlyRate,
      Affiliation: req.body.Affiliation,
      EducationalBackground: req.body.EducationalBackground,
      Speciality: req.body.Speciality,
    });
    res.status(200).send({ doctor });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find();
    res.status(200).send({ doctors });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await doctorModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ doctor });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// update a doctor (hourly rate and affiliation)
const updateDoctor = async (req, res) => {
  try {
    const {Username} = req.params;
    // console.log(req.body.Email)
    if (req.body.HourlyRate || req.body.Affiliation) {
      const doc = await doctorModel.findOneAndUpdate({Username:Username}, req.body);
      const doc2 = await doctorModel.findOneAndUpdate({Username:Username}, req.body);
      res.status(200).json(doc2);
    } else {
      const doc = await systemUserModel.findOneAndUpdate({Username:Username}, req.body);
      const doc1 = await systemUserModel.findOneAndUpdate({Username:Username}, req.body);
      res.status(200).json(doc1);
    }
    // console.log(req.body.HourlyRate);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get a doctor by ID
const getDoctorByID = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).json({ error: "Invalid ID" });
    return;
  }

  try {
    const doctor = await doctorModel.findById(id);
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    const { Name, Speciality, Affiliation, EducationalBackground } = doctor;
    const doctorDetails = {
      Name,
      Speciality,
      Affiliation,
      EducationalBackground,
    };
    res.status(200).json(doctorDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a doctor by username
const getDoctorByUsername = async (req, res) => {
  const { username } = req.params;
  try {
    const doctor = await doctorModel.findOne({ Username: username });
    if (!doctor) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    const { Name, Speciality, Affiliation, EducationalBackground } = doctor;
    const doctorDetails = {
      Name,
      Speciality,
      Affiliation,
      EducationalBackground,
    };
    res.status(200).json(doctorDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get doctor by name and/or speciality (search)
const getDoctorByNameAndSpeciality = async (req, res) => {
  const { Name, Speciality } = req.body;
  try {
    const doctors = await doctorModel.find({
      // Search for documents whose 'Name' field contains the 'Name' variable, if it is not empty
      ...(Name ? { Name: { $regex: Name, $options: "i" } } : {}),
      // Search for documents whose 'Speciality' field contains the 'Speciality' variable, if it is not empty
      ...(Speciality && !Name
        ? { Speciality: { $regex: Speciality, $options: "i" } }
        : {}),
    });
    if (doctors.length === 0 || !doctors) {
      res.status(404).json({ error: "Doctor not found" });
      return;
    }
    // TODO: uncomment this if you want to return only the fields you want
    // const doctorDetails = doctors.map((doctor) => {
    //   const { Name, Speciality, Affiliation, EducationalBackground } = doctor;
    //   return {
    //     Name,
    //     Speciality,
    //     Affiliation,
    //     EducationalBackground,
    //   };
    // });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// filter doctors by speciality or/and (date and time)
// TODO: replace query with body
const filterDoctor = async (req, res) => {
  try {
    console.log(req.query);
    const urlParams = new URLSearchParams(req.query);

    let packageDis = 0;
    var myDoctors = new Array();
    var myFilteredDoctors = new Array();

    const patientId = req.query.id;
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      res.status(404).json({ error: "Invalid ID" });
      return;
    } else {
      //getting package dis of patient
      patientModel.findById(patientId).then((result) => {
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
      });
    }

    if (urlParams.has("date") && urlParams.has("hour")) {
      if (req.query.date && req.query.hour) {
        const date = new Date(req.query.date);
        const day = date.getDay();
        const hour = req.query.hour;
        const dateDocs = await doctorModel.find({
          WorkingDays: { $in: [day] },
          StartTime: { $lte: hour },
          EndTime: { $gt: hour },
        });
        if (urlParams.has("speciality")) {
          dateDocs.forEach((element) => {
            if (element.Speciality == req.query.speciality) {
              myDoctors.push(element);
            }
          });
        } else {
          myDoctors = dateDocs;
        }
      }
    } else {
      if (urlParams.has("speciality")) {
        myDoctors = await doctorModel.find({
          Speciality: req.query.speciality,
        });
      } else {
        myDoctors = await doctorModel.find();
      }
    }

    myDoctors.forEach((element) => {
      const calcCost = (1 - packageDis / 100) * (element.HourlyRate * 1.1); // 1.1 to account for 10% clinic markup
      // Add an object to the 'mySessions' array that contains the doctor's name, speciality, and calculated cost
      myFilteredDoctors.push({
        Name: element.Name,
        Speciality: element.Speciality,
        Cost: calcCost,
      });
    });
    res.status(200).json(myFilteredDoctors);
  } catch (err) {
    console.log(err);
  }
};

// TODO: Make sure health record consists of appointments and prescriptions.
// View information and health records of a doctor's patient
const viewPatientInfoAndHealthRecords = async (req, res) => {
  const patientUsername = req.body.PatientUsername;
  try {
    const appointments = await appointmentModel.find({
      PatientUsername: patientUsername,
    });
    const prescriptions = await prescriptionsModel.find({
      PatientUsername: patientUsername,
    });
    res.status(200).json({ appointments, prescriptions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getDoctorByID,
  getDoctorByUsername,
  getDoctorByNameAndSpeciality,
  filterDoctor,
  updateDoctor,
  createDoctor,
  getAllDoctors,
  deleteDoctor,
  viewPatientInfoAndHealthRecords,
};
