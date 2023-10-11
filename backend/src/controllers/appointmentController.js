const { trusted } = require("mongoose");
const appointmentModel = require("../models/appointments");
const { default: mongoose } = require("mongoose");
const patientModel = require("../models/patients");
const User = require("../models/systemusers");
const { isNull } = require("util");

//Filter by date mengheir time wala be time?
const getAppointments = async (req, res) => {
  const statusInput = req.body.Status; //khod input men el front end
  const dateSearch = req.body.Date; //khod input men el front end
  const { Username2 } = req.params; //session
  //Check this username is in our table
  const doc = await appointmentModel.find({
    DoctorUsername: Username2,
  });
  const pat = await appointmentModel.find({
    PatientUsername: Username2,
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
              DoctorUsername: Username2,
              Status: statusValue,
              Date: {
                $lt: newDate,
                $gte: dateValue,
              },
            })
          : await appointmentModel.find({
              PatientUsername: Username2,
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
              DoctorUsername: Username2,
              Status: statusValue,
              Date: dateValue,
            })
          : await appointmentModel.find({
              PatientUsername: Username2,
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
            DoctorUsername: Username2,
            Status: statusValue,
          })
        : await appointmentModel.find({
            PatientUsername: Username2,
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
              DoctorUsername: Username2,
              Date: {
                $lt: newDate,
                $gte: dateValue,
              },
            })
          : await appointmentModel.find({
              PatientUsername: Username2,
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
              DoctorUsername: Username2,
              Date: dateValue,
            })
          : await appointmentModel.find({
              PatientUsername: Username2,
              Date: dateValue,
            });
      res.status(200).send(result);
    }
  } else {
    try {
      current_type === "Doctor"
        ? await appointmentModel.find({
            DoctorUsername: Username2,
          })
        : await appointmentModel.find({
            PatientUsername: Username2,
          });

      if (current_type === "Doctor") {
        const result = await appointmentModel.find({
          DoctorUsername: Username2,
        });
        console.log("Fetching Doctor");
        res.status(200).send(result);
      } else {
        const result = await appointmentModel.find({
          PatientUsername: Username2,
        });
        res.status(200).send(result);
      }
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  }
};

// Get all the patients of a certain doctor.
const findDoctorPatients = async (req, res) => {
  const doctorUsername = req.query.DoctorUsername;

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

const getAppointmentsDoc = async (req, res) => {
  // Package discount starts with 0
  // Extract the 'id' parameter from the request object
  const { Username2 } = req.params;
  const { Status, Date } = req.query;
  const dateValue = new global.Date(Date);
  const newDate = new global.Date(Date);
  newDate.setDate(dateValue.getDate() + 1);

  const hasDate = isNaN(dateValue) ? "n" : "y";

  // Check if the 'id' parameter is a valid MongoDB ObjectID
  if (!appointmentModel.findOne({ DoctorUsername: Username2 })) {
    res.status(404).json({ error: "Invalid Username" });
    return;
  }

  const appointments =
    Status != "Rescheduled" &&
    Status != "Completed" &&
    Status != "Cancelled" &&
    Status != "Upcoming" &&
    hasDate == "n"
      ? await appointmentModel.find({ DoctorUsername: Username2 })
      : (Status == "Rescheduled" ||
          Status == "Completed" ||
          Status == "Cancelled" ||
          Status == "Upcoming") &&
        hasDate == "y" &&
        dateValue.getUTCHours() === 0
      ? await appointmentModel.find({
          DoctorUsername: Username2,
          Status: Status,
          Date: { $lt: newDate, $gte: dateValue },
        })
      : (Status == "Rescheduled" ||
          Status == "Completed" ||
          Status == "Cancelled" ||
          Status == "Upcoming") &&
        hasDate == "n"
      ? await appointmentModel.find({
          DoctorUsername: Username2,
          Status: Status,
        })
      : Status == "Rescheduled" ||
        Status == "Completed" ||
        Status == "Cancelled" ||
        Status == "Upcoming"
      ? await appointmentModel.find({
          DoctorUsername: Username2,
          Status: Status,
        })
      : hasDate == "y" && dateValue.getUTCHours() == 0
      ? await appointmentModel.find({
          DoctorUsername: Username2,
          Date: { $lt: newDate, $gte: dateValue },
        })
      : hasDate == "y"
      ? await appointmentModel.find({
          DoctorUsername: Username2,
          Date: dateValue,
        })
      : "Bad request";
  
  
  // Return a 200 success response with a JSON object that contains the 'mySessions' array
  if (appointments == "bad requests") {
    res.status(404).json("No Appointments Found");
  } else {
    res.status(200).json(appointments);
  }
};

module.exports = {
  getAppointmentsDoc,
  findDoctorPatients,
  upcomingAppforDoc,
  searchPatient,
  getAppointments,
};
