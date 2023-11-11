const doctorModel = require("../models/doctors");
const appointmentModel = require("../models/appointments");
const prescriptionsModel = require("../models/prescriptions");
const patientModel = require("../models/patients");
const { default: mongoose } = require("mongoose");
const systemUserModel = require("../models/systemusers");
const packageModel = require("../models/packages");

// I think this is useless?
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

// I think this is useless?
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
    const Username = req.user.Username;
    const { HourlyRate, Affiliation } = req.body;
    if (
      Affiliation === undefined &&
      HourlyRate !== undefined &&
      (HourlyRate.length === 0 || HourlyRate.length > 5)
    ) {
      res
        .status(400)
        .send({ error: "Please fill in an hourly rate from 1-99999" });
    } else if (HourlyRate !== undefined) {
      const doc = await doctorModel.findOneAndUpdate(
        { Username: Username },
        { HourlyRate: HourlyRate }
      );
      const doc2 = await doctorModel.findOneAndUpdate(
        { Username: Username },
        { HourlyRate: HourlyRate }
      );
      res.status(200).json(doc2);
    } else if (Affiliation) {
      const doc = await doctorModel.findOneAndUpdate(
        { Username: Username },
        { Affiliation: Affiliation }
      );
      const doc2 = await doctorModel.findOneAndUpdate(
        { Username: Username },
        { Affiliation: Affiliation }
      );
      res.status(200).json(doc2);
    } else {
      res.status(404).send({ error: "Please fill in Affiliation" });
    }
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
const filterDoctor = async (req, res) => {
  try {
    const urlParams = new URLSearchParams(req.query);

    let packageDis = 0;
    var myDoctors = new Array();
    var appointments = new Array();
    var myFilteredDoctors = new Array();

    const username = req.user.Username;
    // const id = req.user.id;
    // //const { id } = req.params;
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   res.status(404).json({ error: "Invalid ID" });
    //   return;
    // }

    //TODO: I BELIEVE THIS BIG LOOP (.HAS(DATE) IS REDUNDANT IF REQ.QUERY.DATE SHAGHALA)
    if (urlParams.has("date") && urlParams.has("hour")) {
      //TODO: TEST THIS WITH NEW SYNTAX
      if (req.query.date && req.query.hour) {
        const date = new Date(req.query.date);
        const day = date.getDay();
        const hours = date.getHours();
        const mins = date.getMinutes();
        const hour = hours + mins / 100;

        //const hour = req.query.hour;
        // console.log('here');
        // console.log(day);
        // console.log(hour);

        //  TODO: CHANGED THE RANGE TO ACCOMODATE FOR DURATION
        const dateDocs = await doctorModel.find({
          WorkingDays: { $in: [day] },
          StartTime: { $lte: hour },
          EndTime: { $gte: hour + 1 },
        });
        if (req.query.speciality) {
          dateDocs.forEach((element) => {
            if (element.Speciality == req.query.speciality) {
              myDoctors.push(element);
            }
          });
        } else {
          myDoctors = dateDocs;
        }

        //TODO: NEEDS TESTING BA2A
        //TODO:added this part in this scope because only if date and hour existed
        for (const doctor of myDoctors) {
          appointments = await appointmentModel.find({
            DoctorUsername: doctor.Username,
          });
          if (appointments.length != 0) {
            console.log("inIf");
            for (let appointment of appointments) {
              const appDay = appointment.Date.getDay();
              const appHour = appointment.Date.getUTCHours();
              const appMin = appointment.Date.getMinutes();
              const appHourFilter = appHour + appMin / 100;

              const dateWithoutTime = date.toISOString().split("T")[0];
              const appDateWithoutTime =
                appointment.Date.toISOString().split("T")[0];

              console.log(day);
              console.log(appDay);
              console.log(appHour);
              console.log(appHourFilter);
              console.log(hour);
              console.log(Math.abs(appHourFilter - hour));

              //TODO: send help,put in mind check utchourthing first
              //USE ABSOLUTE DIFFERENCE BETTER THAN (hour < appHour + 1 || hour < appHour + 1)
              if (
                Math.abs(appHourFilter - hour) < 1 &&
                appDateWithoutTime == dateWithoutTime &&
                appointment.Status == "Upcoming"
              ) {
                //splice takes 2 attributes; index of element to be deleted, how many elements to delete,
                myDoctors.splice(myDoctors.indexOf(doctor), 1);
              }
            }
          }
        }
      }
    } else {
      if (req.query.speciality) {
        myDoctors = await doctorModel.find({
          Speciality: req.query.speciality,
        });
      } else {
        myDoctors = await doctorModel.find();
      }
    }

    //getting package dis of patient
    patientModel.findOne({ Username: username }).then(async (result) => {
      // Extract the 'PackageName' property from the patient document
      const packageName = result.PackageName;
      // If the 'PackageName' property is not null, use the 'find' method of the 'packageModel' to retrieve a package document with the specified 'Name'
      if (packageName) {
        await packageModel
          .findOne({ Name: packageName })
          .then((result) => {
            // Extract the 'SessionDiscount' property from the package document and set the 'packageDis' variable to its value
            packageDis = result.Session_Discount;
          })
          .catch((err) => {
            res.status(500).json({ error: error.message });
          });
      }
      //adding session price to filtered doctors
      for (const element of myDoctors) {
        const calcCost = (1 - packageDis / 100) * (element.HourlyRate * 1.1); // 1.1 to account for 10% clinic markup
        // Add an object to the 'mySessions' array that contains the doctor's name, speciality, and calculated cost
        myFilteredDoctors.push({
          Username: element.Username,
          Name: element.Name,
          Speciality: element.Speciality,
          Cost: calcCost,
        });
      }
      res.status(200).json(myFilteredDoctors);
    });
  } catch (err) {
    console.log(err);
  }
};

// TODO: Make sure health record consists of appointments and prescriptions.
// View information and health records of a doctor's patient
const viewPatientInfoAndHealthRecords = async (req, res) => {
  const patientUsername = req.query.PatientUsername;
  const doctorUsername = req.user.Username;
  try {
    const appointments = await appointmentModel.find({
      PatientUsername: patientUsername,
      DoctorUsername: doctorUsername,
    });
    const prescriptions = await prescriptionsModel.find({
      PatientUsername: patientUsername,
      DoctorUsername: doctorUsername,
    });
    res.status(200).json({ appointments, prescriptions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const followupAppointment = async (req, res) => {
  const patientUsername = req.query.PatientUsername;
  const doctorUsername = req.user.Username;
  const date = new Date(req.query.Date);

  try {
    const patient = await patientModel.findOne({
      Username: patientUsername,
    });
    const doctor = await doctorModel.findOne({
      Username: doctorUsername,
    });

    const appointment = await appointmentModel.create({
      DoctorUsername: doctorUsername,
      DoctorName: doctor.Name,
      PatientUsername: patientUsername,
      PatientName: patient.Name,
      Status: "Upcoming",
      FollowUp: true,
      Date: date,
    });
    res.status(200).json(appointment);
  } catch (error) {
    res.status(400).json({ error: error.message });
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
  followupAppointment,
};
