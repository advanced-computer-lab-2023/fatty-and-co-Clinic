const { trusted } = require("mongoose");
const appointmentModel = require("../models/appointments");
const { default: mongoose } = require("mongoose");
const patientModel = require("../models/patients");
const User = require("../models/systemusers");
const { isNull } = require("util");
const docSlotsModel = require("../models/docSlots");
const DoctorModel = require("../models/doctors");
const { MongoClient } = require("mongodb");

// //Filter by date mengheir time wala be time?
// const getAppointments = async (req, res) => {
//   const statusInput = req.body.Status; //khod input men el front end
//   const dateSearch = req.body.Date; //khod input men el front end
//   const { Username2 } = req.params; //session
//   //Check this username is in our table
//   const doc = await appointmentModel.find({
//     DoctorUsername: Username2,
//   });
//   const pat = await appointmentModel.find({
//     PatientUsername: Username2,
//   });
//   const current_type = doc
//     ? "Doctor"
//     : pat
//     ? "Patient"
//     : "You have no appointments";
//   if (current_type === "You have no appointments") {
//     res.status(400).send(current_type + " :)");
//   }

//   //Check if both are present
//   if (
//     (statusInput === "Upcoming" ||
//       statusInput === "Completed" ||
//       statusInput === "Rescheduled" ||
//       statusInput === "Cancelled") &&
//     dateSearch != null &&
//     !isNaN(new Date(dateSearch))
//   ) {
//     const statusValue = statusInput;
//     const dateValue = new Date(dateSearch);
//     const newDate = new Date(dateValue);
//     newDate.setDate(dateValue.getDate() + 1);

//     if (dateValue.getUTCHours() === 0) {
//       //Gets all appointments on a certain day
//       const result =
//         current_type === "Doctor"
//           ? await appointmentModel.find({
//               DoctorUsername: Username2,
//               Status: statusValue,
//               Date: {
//                 $lt: newDate,
//                 $gte: dateValue,
//               },
//             })
//           : await appointmentModel.find({
//               PatientUsername: Username2,
//               Status: statusValue,
//               Date: {
//                 $lt: newDate,
//                 $gte: dateValue,
//               },
//             });
//       res.status(200).send(result);
//     } else {
//       // Gets all appointments on a certain day and time
//       const result =
//         current_type === "Doctor"
//           ? await appointmentModel.find({
//               DoctorUsername: Username2,
//               Status: statusValue,
//               Date: dateValue,
//             })
//           : await appointmentModel.find({
//               PatientUsername: Username2,
//               Status: statusValue,
//               Date: dateValue,
//             });
//       res.status(200).send(result);
//     }
//   } else if (
//     statusInput === "Upcoming" ||
//     statusInput === "Completed" ||
//     statusInput === "Rescheduled" ||
//     statusInput === "Cancelled"
//   ) {
//     const statusValue = statusInput;
//     const result =
//       current_type === "Doctor"
//         ? await appointmentModel.find({
//             DoctorUsername: Username2,
//             Status: statusValue,
//           })
//         : await appointmentModel.find({
//             PatientUsername: Username2,
//             Status: statusValue,
//           });

//     res.status(200).send(result);
//   } else if (dateSearch != null && !isNaN(new Date(dateSearch))) {
//     //Gets date on exact day
//     const dateValue = new Date(dateSearch);
//     const newDate = new Date(dateValue);
//     newDate.setDate(dateValue.getDate() + 1);
//     console.log(dateValue + " Hee");
//     if (dateValue.getUTCHours() === 0) {
//       //Gets all appointments on a certain day
//       const result =
//         current_type === "Doctor"
//           ? await appointmentModel.find({
//               DoctorUsername: Username2,
//               Date: {
//                 $lt: newDate,
//                 $gte: dateValue,
//               },
//             })
//           : await appointmentModel.find({
//               PatientUsername: Username2,
//               Date: {
//                 $lt: newDate,
//                 $gte: dateValue,
//               },
//             });
//       res.status(200).send(result);
//     } else {
//       // Gets all appointments on a certain day and time
//       const result =
//         current_type === "Doctor"
//           ? await appointmentModel.find({
//               DoctorUsername: Username2,
//               Date: dateValue,
//             })
//           : await appointmentModel.find({
//               PatientUsername: Username2,
//               Date: dateValue,
//             });
//       res.status(200).send(result);
//     }
//   } else {
//     try {
//       current_type === "Doctor"
//         ? await appointmentModel.find({
//             DoctorUsername: Username2,
//           })
//         : await appointmentModel.find({
//             PatientUsername: Username2,
//           });

//       if (current_type === "Doctor") {
//         const result = await appointmentModel.find({
//           DoctorUsername: Username2,
//         });
//         console.log("Fetching Doctor");
//         res.status(200).send(result);
//       } else {
//         const result = await appointmentModel.find({
//           PatientUsername: Username2,
//         });
//         res.status(200).send(result);
//       }
//     } catch (error) {
//       res.status(400).send({ message: error.message });
//     }
//   }
// };

// Get all the patients of a certain doctor.

// Date.prototype.addDays = function(days) {
//   var date = new Date(this.valueOf());
//   date.setDate(date.getDate() + days);
//   return date;
// };
Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};
const findDoctorPatients = async (req, res) => {
  const doctorUsername = req.user.Username;

  // Get all the appointments of the doctor.
  const appointments = await appointmentModel.find({
    DoctorUsername: doctorUsername,
    DoctorName: { $exists: true },
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

  // Find all the patients with the unique patient names.
  const patients = await patientModel.find({
    Username: { $in: uniquePatientNamesArray },
  });

  // Return the patients.
  res.status(200).send(patients);
};

// Get all the upcoming appointments of a certain doctor.
const upcomingAppforDoc = async (req, res) => {
  const doctorUsername = req.user.Username;

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

const filterAppointmentsByStatusDoc = async (req, res) => {

  const username = req.user.Username;
  const status = req.query.status

  const doctor = await patientModel.find({
    Username: username
  })

    const appointments = await appointmentModel.find({
      DoctorUsername: username,
      Status: status,
    });
  try {
  
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const filterAppointmentsByStatusPat = async (req, res) => {

  const username = req.user.Username;
  const status = req.query.status

    const appointments = await appointmentModel.find({
      PatientName: username,
      Status: status,
    });

  try {
  
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const filterAppointmentsByDateDoc = async (req, res) => {

  const username = req.user.Username;
  const date = req.query.date

  const doctor = await patientModel.find({
    Username: username
  })

    const appointments = await appointmentModel.find({
      DoctorUsername: username,
      Status: date,
    });
  try {
  
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const filterAppointmentsByDatePat = async (req, res) => {

  const username = req.user.Username;
  const date = req.query.date

    const appointments = await appointmentModel.find({
      PatientName: username,
      Status: date,
    });

  try {
  
    res.status(200).json(appointments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
const searchPatient = async (req, res) => {
  const doctorUsername = req.user.Username; // username of the doctor searching
  const patientName = req.query.PatientName; // name of the patient to search for

  // Get all the appointments of the doctor.
  const appointments = await appointmentModel.find({
    DoctorUsername: doctorUsername,
  });

  // Get the names of all the patients from the appointments.
  const patientNames = appointments.map(
    (appointment) => appointment.PatientName
  );
  const patientUserNames = appointments.map(
    (appointment) => appointment.PatientUsername
  );
  const uniquePatientNames = new Set();

  // Add each patient name to the set.
  for (const patientName of patientNames) {
    uniquePatientNames.add(patientName);
  }

  // Convert the set back to an array.
  const uniquePatientNamesArray = [...uniquePatientNames];

  // Check if the patientName param is empty.
  if (!req.query.PatientName) {
    // patientName is null or an empty string
    const patients = await patientModel.find({
      Username: { $in: patientUserNames },
    });
    res.status(200).send(patients);
  } else {
    // patientName is not null or an empty string
    const filteredPatientNames = uniquePatientNamesArray.filter(
      (patientNamee) =>
        patientNamee.toLowerCase().includes(patientName.toLowerCase())
    );
    const patients = await patientModel.find({
      Name: { $in: filteredPatientNames },
      Username: { $in: patientUserNames },
    });

    res.status(200).send(patients);
  }
};


const getAppointmentsDoc = async (req, res) => {
  // Package discount starts with 0
  // Extract the 'id' parameter from the request object
  const Username2 = req.user.Username;
  const query = req.query;
  const Status = query.Status;
  const dateValue = new Date(query.Date);
  const newDate = dateValue.addDays(1);

  // const dateValue = new global.Date(Date);
  // const newDate = new global.Date(Date);
  // newDate.setDate(dateValue.getDate() + 1);

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

const getAppointmentsPat = async (req, res) => {
  const PatientUser = req.user.Username;
  const query = req.query;
  const Status = query.Status;
  const dateValue = new Date(query.Date);
  const newDate = dateValue.addDays(1);

  // const dateValue = new global.Date(Date);
  // const newDate = new global.Date(Date);
  // newDate.setDate(dateValue.getDate() + 1);

  const hasDate = isNaN(dateValue) ? "n" : "y";

  // Check if the 'id' parameter is a valid MongoDB ObjectID
  if (!appointmentModel.findOne({ PatientUsername: PatientUser })) {
    res.status(404).json({ error: "Invalid Username" });
    return;
  }

  const appointments =
    Status != "Rescheduled" &&
    Status != "Completed" &&
    Status != "Cancelled" &&
    Status != "Upcoming" &&
    hasDate == "n"
      ? await appointmentModel.find({ PatientUsername: PatientUser })
      : (Status == "Rescheduled" ||
          Status == "Completed" ||
          Status == "Cancelled" ||
          Status == "Upcoming") &&
        hasDate == "y" &&
        dateValue.getUTCHours() === 0
      ? await appointmentModel.find({
          PatientUsername: PatientUser,
          Status: Status,
          Date: { $lt: newDate, $gte: dateValue },
        })
      : (Status == "Rescheduled" ||
          Status == "Completed" ||
          Status == "Cancelled" ||
          Status == "Upcoming") &&
        hasDate == "n"
      ? await appointmentModel.find({
          PatientUsername: PatientUser,
          Status: Status,
        })
      : Status == "Rescheduled" ||
        Status == "Completed" ||
        Status == "Cancelled" ||
        Status == "Upcoming"
      ? await appointmentModel.find({
          PatientUsername: PatientUser,
          Status: Status,
        })
      : hasDate == "y" && dateValue.getUTCHours() == 0
      ? await appointmentModel.find({
          PatientUsername: PatientUser,
          Date: { $lt: newDate, $gte: dateValue },
        })
      : hasDate == "y"
      ? await appointmentModel.find({
          PatientUsername: PatientUser,
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
const testAppointRef = async (req, res) => {
 
  await appointmentModel
    .aggregate([
      //testing join by username instead of id -- works
      // {
      //   $lookup: {
      //     from: DoctorModel.collection.name,
      //     localField: "DoctorUsername",
      //     foreignField: "Username",
      //     as: "DoctorDetails",
      //   },
      // },
      // {
      //   $unwind: "$DoctorDetails",
      // },

      //testing adding fields to Appointments --works
      {
        $addFields: {
          day: {$dayOfWeek: "$Date"},
          hour: {$hour: "$Date"}
        }
      }
      
    ])
    .then((value) => {
      console.log(value);
      res.status(200).json(value);
    });
};


const reschedulePatient = async (req, res) => {
 
  try {
     const docUsername= req.user.username
     const {patientUsername,date}=req.body
     const prevApp=await appointmentModel.findOne({DoctorUsername:docUsername,PatientUsername:patientUsername,Status:"Upcoming"})
     if(!prevApp){
      res.status(404).json({err:"Patient wasn't scheduled for an upcoming appointment!"})
     }
     else{
     const doctor= await DoctorModel.findOne({Username:docUsername})
     const docSlots= await docSlotsModel.find({DoctorId:doctor._id})
     const patientApp= await appointmentModel.find({DoctorUsername:doctor.Username,Status:"Upcoming"})
     const reqDate= new Date(date)
     const isBooked = patientApp.map((appReserved) => {
      
      if(reqDate.getFullYear()==appReserved.Date.getFullYear() && reqDate.getMonth()+1==appReserved.Date.getMonth() && reqDate.getDay()==appReserved.Date.getDay() &&reqDate.getUTCHours()==appReserved.Date.getUTCHours() ){
           return true;
      }
              
      })
     if(isBooked){
      res.status(400).json({err:"There is another appointment booked on same date!"})
     }
     else{ 
     const isAvailable = docSlots.map(async (docSlot) => {
      if(docSlot.WorkingDay==reqDate.getDay() && docSlot.StartTime==reqDate.getUTCHours()){
           return true
      }
              
      })
  
    if(isAvailable){
      const newApp=await appointmentModel.findOneAndUpdate({PatientUsername:patientUsername,DoctorUsername:docUsername,Status:"Upcoming"},{Date:date})
      res.status(200).json("You have rescheduled appointment successfully!")
    }
    else{
      res.status(404).json({err:"This isn't an available slot you work in!"})
    }
  }


  }
  } catch (error) {
    res.status(404).json(error)
  }
}

const rescheduleAppointmentPatient= async(req,res) =>{
  try {
    const PatientUser = req.user.Username;
    const {doctorUsername,date}=req.body;
   const newDate = newDate(date);
    const Patient =await patientModel.findOne({Username:PatientUser});
    const Doctor = await DoctorModel.findOne({ Username: doctorUsername });
    const hasappointment=await appointmentModel.findOne({DoctorUsername:doctorUsername,
    PatientUsername:PatientUser,Status:"Upcoming" })
  const Appointmentreserved =await appointmentModel.find({DoctorUsername:doctorUsername});
  // Check is slot is avaliable 
  let isSlotAvailable = true;
  for (const appointment of Appointmentreserved) {
    const existingDate = new Date(appointment.Date);
    if (newDate.getHours() === existingDate.getHours()) {
      isSlotAvailable = false;
      break;
    }
  }
  if (!Patient){
    res.status(500).send({message:"Wrong Patient Username "});
  }
 else  if (!Doctor){
    res.status(500).send({message:"No such a doctor with username "});
  }
  else if (isSlotAvailable){
    res.status(500).send({message:" This slot is not avaliable for this dctor  "});
  }
  else if (!hasappointment){
    res.status(500).send({message:"You don't have any appointments with this doctor to reschdule "});
  }
  else {
     const rescheduledappointment=await appointmentModel.findOneAndUpdate(
      {DoctorUsername:doctorUsername,
        PatientUsername:PatientUser,Status:"Upcoming"},{Status:"Rescheduled",
      Date:newDate}
     )
    res.status(200).json(rescheduledappointment);
  }
  } catch (error) {
    res.status(500).json(error);
  }
}

module.exports = {
  reschedulePatient,
  filterAppointmentsByStatusDoc,
  filterAppointmentsByStatusPat,
  filterAppointmentsByDateDoc,
  filterAppointmentsByDatePat,
  getAppointmentsDoc,
  findDoctorPatients,
  upcomingAppforDoc,
  searchPatient,
  getAppointmentsPat,
  testAppointRef,
  rescheduleAppointmentPatient
};
