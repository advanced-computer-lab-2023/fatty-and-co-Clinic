const { trusted } = require("mongoose");
const appointmentModel = require("../models/appointments");
const { default: mongoose } = require("mongoose");
const patientModel = require("../models/patients");
const { isNull } = require("util");

//Filter by date mengheir time wala be time?
const getAppointments = async (req, res) => {
  const statusInput = req.body.Status; //khod input men el front end
  console.log(statusInput);
  const dateSearch = req.body.Date; //khod input men el front end
  const current_user = req.body.Username; //session
  //Check this username is in our table
  const doc = await appointmentModel.find({
    DoctorUsername: req.body.Username,
  });
  const pat = await appointmentModel.find({
    PatientUsername: req.body.Username,
  });
  const current_type = doc
    ? "Doctor"
    : pat
      ? "Patient"
      : "You have no appointments";
  if (current_type === "You have no appointments") {
    res.status(400).send(current_type + " :)");
  }

  //Check if both are present
  if (
    (statusInput === "Upcoming" ||
      statusInput === "Completed" ||
      statusInput === "Rescheduled" ||
      statusInput === "Cancelled") &&
    dateSearch != null &&
    !isNaN(new Date(dateSearch))
  ) {
    const statusValue = statusInput;
    const dateValue = new Date(dateSearch);
    const newDate = new Date(dateValue);
    newDate.setDate(dateValue.getDate() + 1);

    if (dateValue.getUTCHours() === 0) {
      //Gets all appointments on a certain day
      const result =
        current_type === "Doctor"
          ? await appointmentModel.find({
            DoctorUsername: current_user,
            Status: statusValue,
            Date: {
              $lt: newDate,
              $gte: dateValue,
            },
          })
          : await appointmentModel.find({
            PatientUsername: current_user,
            Status: statusValue,
            Date: {
              $lt: newDate,
              $gte: dateValue,
            },
          });
      res.status(200).send(result);
    } else {
      // Gets all appointments on a certain day and time
      const result =
        current_type === "Doctor"
          ? await appointmentModel.find({
            DoctorUsername: current_user,
            Status: statusValue,
            Date: dateValue,
          })
          : await appointmentModel.find({
            PatientUsername: current_user,
            Status: statusValue,
            Date: dateValue,
          });
      res.status(200).send(result);
    }
  } else if (
    statusInput === "Upcoming" ||
    statusInput === "Completed" ||
    statusInput === "Rescheduled" ||
    statusInput === "Cancelled"
  ) {
    const statusValue = statusInput;
    const result =
      current_type === "Doctor"
        ? await appointmentModel.find({
          DoctorUsername: current_user,
          Status: statusValue,
        })
        : await appointmentModel.find({
          PatientUsername: current_user,
          Status: statusValue,
        });
    res.status(200).send(result);
  } else if (dateSearch != null && !isNaN(new Date(dateSearch))) {
    //Gets date on exact day
    const dateValue = new Date(dateSearch);
    const newDate = new Date(dateValue);
    newDate.setDate(dateValue.getDate() + 1);
    console.log(dateValue + " Hee");
    if (dateValue.getUTCHours() === 0) {
      //Gets all appointments on a certain day
      const result =
        current_type === "Doctor"
          ? await appointmentModel.find({
            DoctorUsername: current_user,
            Date: {
              $lt: newDate,
              $gte: dateValue,
            },
          })
          : await appointmentModel.find({
            PatientUsername: current_user,
            Date: {
              $lt: newDate,
              $gte: dateValue,
            },
          });
      res.status(200).send(result);
    } else {
      // Gets all appointments on a certain day and time
      const result =
        current_type === "Doctor"
          ? await appointmentModel.find({
            DoctorUsername: current_user,
            Date: dateValue,
          })
          : await appointmentModel.find({
            PatientUsername: current_user,
            Date: dateValue,
          });
      res.status(200).send(result);
    }
  } else {
    res.status(404).send("Error occured");
  }
};

// Get all the patients of a certain doctor.
const findDoctorPatients = async (req, res) => {
  const doctorUsername = req.body.DoctorUsername;

  // Get all the appointments of the doctor.
  const appointments = await appointmentModel.find({
    DoctorUsername: doctorUsername,
  });

  // Get the names of all the patients from the appointments.
  const patientNames = appointments.map(
    (appointment) => appointment.PatientUsername
  );

  // Create a set to store the unique patient names.
  const uniquePatientNames = new Set();

  // Add each patient name to the set.
  for (const patientName of patientNames) {
    uniquePatientNames.add(patientName);
  }

  // Convert the set back to an array.
  const uniquePatientNamesArray = [...uniquePatientNames];
  const patients = await patientModel.find({
    Username: { $in: uniquePatientNamesArray },
  });

  // Return the unique patient names.
  res.status(200).send(patients);
};

// Get all the upcoming appointments of a certain doctor.
const upcomingAppforDoc = async (req, res) => {
  const doctorUsername = req.query.DoctorUsername;

  // Get all the appointments of the doctor.
  const appointments = await appointmentModel.find({
    DoctorUsername: doctorUsername,
    Status: "Upcoming",
  });

  // Get the names of all the patients from the appointments.
  const patientNames = appointments.map(
    (appointment) => appointment.PatientUsername
  );

  const uniquePatientNames = new Set();

  // Add each patient name to the set.
  for (const patientName of patientNames) {
    uniquePatientNames.add(patientName);
  }

  // Convert the set back to an array.
  const uniquePatientNamesArray = [...uniquePatientNames];
  const patients = await patientModel.find({
    Username: { $in: uniquePatientNamesArray },
  });

  // Return the unique patient names.
  res.status(200).send(patients);
};

const searchPatient = async (req, res) => {
  const doctorUsername = req.query.DoctorUsername;
  const patientName = req.query.PatientUsername;
  const appointments = await appointmentModel.find({
    DoctorUsername: doctorUsername,
  });
  const patients=null;

  // Get the names of all the patients from the appointments.
  const patientNames = appointments.map(
    (appointment) => appointment.PatientUsername
  );
  const uniquePatientNames = new Set();

  // Add each patient name to the set.
  for (const patientName of patientNames) {
    uniquePatientNames.add(patientName);
  }

  // Convert the set back to an array.
  const uniquePatientNamesArray = [...uniquePatientNames];
  if (patientName === null || patientName === "") {
    // patientName is null or an empty string
    patients = await patientModel.find({
      Username: { $in: uniquePatientNamesArray },
    });
  } else {
    // patientName is not null or an empty string
    const filteredPatientNames = patientNames.filter((patientNamee) =>
    patientNamee.includes(patientName)
  );
  patients = await patientModel.find({
    Username: { $in: filteredPatientNames },
  });

  }


  // Filter the patient names to only include patients whose name contains the search query.


  // If at least one patient was found, return the filtered patient names.
  

    res.status(200).send(patients);
 
};

// Export the router.

module.exports = {
  getAppointments,
  findDoctorPatients,
  upcomingAppforDoc,
  searchPatient,
};
