const { trusted } = require("mongoose");
const appointmentModel = require("../models/appointments");
const { default: mongoose } = require("mongoose");
const patientModel = require("../models/patients");
const subscriptionModel = require("../models/subscriptions");
const User = require("../models/systemusers");
const { isNull } = require("util");
const docSlotsModel = require("../models/docSlots");
const doctorModel = require("../models/doctors");
const notificationModel = require("../models/notifications");
const { MongoClient } = require("mongodb");

const nodemailer = require("nodemailer");
const { createNotif } = require("./testController");

const transporter = nodemailer.createTransport({
  //service: 'gmail',
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "shebeenhealthclinic@gmail.com",
    pass: "xojm teqp otis nknr",
  },
});

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
const getAppointmentsfamilymembers = async (req, res) => {
  const PatientUser = req.user.Username;
  const query = req.query;
  const Status = query.Status;
  const dateValue = new Date(query.Date);
  const newDate = dateValue.addDays(1);

  // const dateValue = new global.Date(Date);
  // const newDate = new global.Date(Date);
  // newDate.setDate(dateValue.getDate() + 1);
console.log("here is the user ",PatientUser);
  const hasDate = isNaN(dateValue) ? "n" : "y";

  // Check if the 'id' parameter is a valid MongoDB ObjectID
  if (!appointmentModel.findOne({ BookedBy: PatientUser })) {
    res.status(404).json({ error: "Invalid Username" });
    return;
  }

  const appointments =
    Status != "Rescheduled" &&
    Status != "Completed" &&
    Status != "Cancelled" &&
    Status != "Upcoming" &&
    hasDate == "n"
      ? await appointmentModel.find(  {
        PatientUsername: { $ne: PatientUser }, // Filter for PatientUsername not equal to username
        BookedBy: PatientUser // Filter for appointments booked by the current user
      })
      : (Status == "Rescheduled" ||
          Status == "Completed" ||
          Status == "Cancelled" ||
          Status == "Upcoming") &&
        hasDate == "y" &&
        dateValue.getUTCHours() === 0
      ? await appointmentModel.find({
        PatientUsername: { $ne: PatientUser }, // Filter for PatientUsername not equal to username
        BookedBy: PatientUser ,
          Status: Status,
          Date: { $lt: newDate, $gte: dateValue },
        })
      : (Status == "Rescheduled" ||
          Status == "Completed" ||
          Status == "Cancelled" ||
          Status == "Upcoming") &&
        hasDate == "n"
      ? await appointmentModel.find({
        PatientUsername: { $ne: PatientUser }, // Filter for PatientUsername not equal to username
        BookedBy: PatientUser ,
          Status: Status,
        })
      : Status == "Rescheduled" ||
        Status == "Completed" ||
        Status == "Cancelled" ||
        Status == "Upcoming"
      ? await appointmentModel.find({
        PatientUsername: { $ne: PatientUser }, // Filter for PatientUsername not equal to username
        BookedBy: PatientUser ,
          Status: Status,
        })
      : hasDate == "y" && dateValue.getUTCHours() == 0
      ? await appointmentModel.find({
        PatientUsername: { $ne: PatientUser }, // Filter for PatientUsername not equal to username
        BookedBy: PatientUser ,
          Date: { $lt: newDate, $gte: dateValue },
        })
      : hasDate == "y"
      ? await appointmentModel.find({
        PatientUsername: { $ne: PatientUser }, // Filter for PatientUsername not equal to username
        BookedBy: PatientUser ,
          Date: dateValue,
        })
      : "Bad request";

  // Return a 200 success response with a JSON object that contains the 'mySessions' array
  console.log("length",appointments.length);
  if (appointments == "bad requests") {
    res.status(404).json("No Appointments Found");
  } else {
    res.status(200).json(appointments);
  }
};const getAllAppointmentsPat = async (req, res) => {
   try {
     const patientUsername = req.query.patientUsername;

     // Find all appointments for the given patientUsername
     const appointments = await appointmentModel.find({
       PatientUsername: patientUsername,
     });

     res.json(appointments);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: "Internal Server Error" });
   }
}
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

// const reschedulePatient = async (req, res) => {
 
//   try {

//      const docUsername= req.user.Username
//      const {patientUsername,date}=req.body
//      const prevApp=await appointmentModel.findOne({DoctorUsername:docUsername,PatientUsername:patientUsername, Status:"Upcoming"})
//      const reqDate= new Date(date)
//      const user = await User.findOne({Username: patientUsername});
//      const doc = await User.findOne({Username: docUsername});
//      const patient= await patientModel.findOne({Username:patientUsername})
//       const doctor= await doctorModel.findOne({Username:docUsername})
//      if(!prevApp){
//       res.status(404).json({err:"Patient wasn't scheduled for an upcoming appointment!"})
//       return;
//      }
//      else if(prevApp.Date.getFullYear()==reqDate.getFullYear()&& prevApp.Date.getMonth()+1==reqDate.getMonth()+1&& prevApp.Date.getDate()+1==reqDate.getDate()+1&& prevApp.Date.getUTCHours()==reqDate.getUTCHours()){
//       console.log("First else")
//       res.status(404).json({err:"You're rescheduling appointment on the same date it's scheduled on!"})
//      }
//      else{
//      const patientApp= await appointmentModel.find({
//       $or: [  { PatientUsername: patientUsername, Status:"Upcoming"},
//       { DoctorUsername:docUsername,Status:"Upcoming"},
//     ],
//   })
//      const reqDate= new Date(date)
//      let isBooked = false
//      for(const appReserved of patientApp){      
//      if(reqDate.getFullYear()==appReserved.Date.getFullYear() && reqDate.getMonth()+1==appReserved.Date.getMonth()+1 && reqDate.getDate()==appReserved.Date.getDate() &&reqDate.getUTCHours()==appReserved.Date.getUTCHours() ){
//           isBooked= true;
//           break;
//      }
//      console.log("isBooked "+ isBooked)
//      if(isBooked){
//       console.log("error another app booked on same day")
//       res.status(400).json({err:"There is another appointment booked on same date!"})
//       return;
//      }
//      else{
//       console.log("hereee");
//      const updateAppOld=await appointmentModel.findOneAndUpdate({PatientUsername:patientUsername,DoctorUsername:docUsername,Status:"Upcoming"},{Date:date,Status:"Rescheduled"})      
//      console.log("heree");

//      const newApp= await appointmentModel.create({PatientUsername:patientUsername,BookedBy: updateAppOld.BookedBy,PatientName:updateAppOld.PatientName,DoctorName:updateAppOld.DoctorName,DoctorUsername:docUsername,Status:"Upcoming",Date:date})
//      console.log("here");

//      const n1 = await notificationModel.create({
//       Title: "Rescheduled Appointment",
//       Message: `Rescheduled appointment with Dr. ${doctor.Name} scheduled on ${newApp.Date}`,
//       Username: patientUsername,
//     })
//     console.log("here1");

//     const n2 = await notificationModel.create({
//       Title: "Rescheduled Appointment",
//       Message: `Rescheduled appointment with ${patient.Name} scheduled on ${newApp.Date}`,
//       Username: docUsername,
//     })
//     console.log("here2");

//     await transporter.sendMail({
//       to: user.Email,
//       subject: "Rescheduled Appointment",
//       text: `Rescheduled appointment with Dr. ${doctor.Name} scheduled on ${newApp.Date}`,
//     });
//     console.log("here3");

//     await transporter.sendMail({
//       to: doc.Email,
//       subject: "Rescheduled Appointment",
//       text: `Rescheduled appointment with ${patient.Name} scheduled on ${newApp.Date}`,
//     });
//     console.log("here4");

//      res.status(200).json("You have rescheduled appointment successfully!")
//      return;}
//     }}
//   } catch (error) {
//     res.status(404).json(error)
//   }
// }

const reschedulePatient = async (req, res) => {
 
  try {

    
     const docUsername= req.user.Username
     const {patientUsername,date}=req.body
     const prevApp=await appointmentModel.findOne({DoctorUsername:docUsername,PatientUsername:patientUsername, Status:"Upcoming"})
     const reqDate= new Date(date)
     if(!prevApp){
      res.status(404).json({err:"Patient wasn't scheduled for an upcoming appointment!"})
      return;
     }
     else if(prevApp.Date.getFullYear()==reqDate.getFullYear()&& prevApp.Date.getMonth()+1==reqDate.getMonth()+1&& prevApp.Date.getDate()+1==reqDate.getDate()+1&& prevApp.Date.getUTCHours()==reqDate.getUTCHours()){
      console.log("First else")
      res.status(404).json({err:"You're rescheduling appointment on the same date it's scheduled on!"})
     }
     else{
     const patientApp= await appointmentModel.find({
      $or: [  { PatientUsername: patientUsername, Status:"Upcoming"},
      { DoctorUsername:docUsername,Status:"Upcoming"},
    ],
  })
     const reqDate= new Date(date)
     let isBooked = false
     for(const appReserved of patientApp){      
     if(reqDate.getFullYear()==appReserved.Date.getFullYear() && reqDate.getMonth()+1==appReserved.Date.getMonth()+1 && reqDate.getDate()==appReserved.Date.getDate() &&reqDate.getUTCHours()==appReserved.Date.getUTCHours() ){
          isBooked= true;
          break;
     }
     console.log("isBooked "+ isBooked)
     if(isBooked){
      console.log("error another app booked on same day")
      res.status(400).json({err:"There is another appointment booked on same date!"})
      return;
     }
     else{

      const user = await User.findOne({Username: patientUsername});
    const doc = await User.findOne({Username: docUsername});
    const patient= await patientModel.findOne({Username:patientUsername})
    const doctor= await doctorModel.findOne({Username:docUsername})
    console.log("doctor",docUsername);
    console.log("patient",patientUsername);
    console.log("user",user);
    console.log("doc",doc);
     const updateAppOld=await appointmentModel.findOneAndUpdate({PatientUsername:patientUsername,DoctorUsername:docUsername,Status:"Upcoming"},{Date:date,Status:"Rescheduled"})      
     const newApp= await appointmentModel.create({PatientUsername:patientUsername,BookedBy: updateAppOld.BookedBy,PatientName:updateAppOld.PatientName,DoctorName:updateAppOld.DoctorName,DoctorUsername:docUsername,Status:"Upcoming",Date:date})
     const n1 = await notificationModel.create({
      Title: "Rescheduled Appointment",
      Message: `Rescheduled appointment with Dr. ${doctor.Name} scheduled on ${newApp.Date}`,
      Username: patientUsername,
    })
    console.log("here1");

    const n2 = await notificationModel.create({
      Title: "Rescheduled Appointment",
      Message: `Rescheduled appointment with ${patient.Name} scheduled on ${newApp.Date}`,
      Username: docUsername,
    })
    console.log("here2");

    await transporter.sendMail({
      to: user.Email,
      subject: "Rescheduled Appointment",
      text: `Rescheduled appointment with Dr. ${doctor.Name} scheduled on ${newApp.Date}`,
    });
    console.log("here3");

    await transporter.sendMail({
      to: doc.Email,
      subject: "Rescheduled Appointment",
      text: `Rescheduled appointment with ${patient.Name} scheduled on ${newApp.Date}`,
    });
     res.status(200).json("You have rescheduled appointment successfully!")
     return;}
    }}
  } catch (error) {
    res.status(404).json(error)
  }
}



const getDoctorId= async(req,res)=>{
  try{
    const doctorUsername=req.user.Username
    const doctorRow= await doctorModel.findOne({Username:doctorUsername})
    res.status(200).json(doctorRow._id)
  }
  catch{
    res.status(404).json({err:"Cannot find doctor"})
  }
}


const cancelAppForFam = async (req, res) => {
 
  try {

     const patientSignedIn= req.user.Username
     const {doctorUsername,patientUsername}=req.body;
     console.log(doctorUsername);
     console.log(patientUsername);
     const upcomingApp=await appointmentModel.findOne({DoctorUsername:doctorUsername,BookedBy:patientSignedIn,PatientUsername:patientUsername, Status:"Upcoming"})
     const existApp=await appointmentModel.findOne({DoctorUsername:doctorUsername,BookedBy:patientSignedIn,PatientUsername:patientUsername})
     const user = await User.findOne({Username: patientUsername});
     const doc = await User.findOne({Username: doctorUsername});
     var refund=0
     const currDate= new Date()
     if(!upcomingApp){
      res.status(404).json({err:"No upcoming appointment!"})
      return;
     }
     else if(upcomingApp.Date.getTime()<currDate.getTime()+24*60*60){
      await appointmentModel.findOneAndUpdate({BookedBy:patientSignedIn,DoctorUsername:doctorUsername,PatientUsername:patientUsername, Status:"Upcoming"},{Status:"Cancelled"})
      
      const patient= await patientModel.findOne({Username:patientUsername})
      const doctor= await doctorModel.findOne({Username:doctorUsername})
      const n1 = await notificationModel.create({
      Title: "Cancelled Appointment",
      Message: "Cancelled appointment with Dr. " + doctor.Name +" that was scheduled on " + upcomingApp.Date,
      Username: patientUsername,
    })

    const n2 = await notificationModel.create({
      Title: "Cancelled Appointment",
      Message: "Cancelled appointment with " + patient.Name +" that was scheduled on " + upcomingApp.Date,
      Username: doctorUsername,
    })

    await transporter.sendMail({
      to: user.Email,
      subject: "Cancelled Appointment",
      text: `You have successfully cancelled an appointment with Dr. ${doctor.Name} that was scheduled on ${upcomingApp.Date}`,
    });

    await transporter.sendMail({
      to: doc.Email,
      subject: "New Appointment",
      text: `Cancelled appointment with ${patient.Name} that was scheduled on ${upcomingApp.Date}`,
    });
      res.status(200).json("Appointment cancelled successfully!")

     }
     else{
     const patient= await patientModel.findOne({Username:patientUsername})
     const bookedBy= await patientModel.findOne({Username:patientSignedIn})
     const doctor= await doctorModel.findOne({Username:doctorUsername})
     const package= await subscriptionModel.findOne({Patient:patient,Status:"Subscribed"}).populate("Package")
     const packDisc= package? upcomingApp.createdAt.getTime() >= package.Startdate.getTime() &&
     upcomingApp.createdAt.getTime() <= package.Enddate.getTime()?package.Package.Session_Discount:0:0
     const refund= getSessionPrice(doctor.HourlyRate,packDisc)
     await patientModel.findOneAndUpdate({Username:patientSignedIn},{Wallet:bookedBy.Wallet+refund})
     await appointmentModel.findOneAndUpdate({BookedBy:patientSignedIn,DoctorUsername:doctorUsername,PatientUsername:patientUsername, Status:"Upcoming"},{Status:"Cancelled"})

     const patient1= await patientModel.findOne({Username:patientUsername})
     const n1 = await notificationModel.create({
     Title: "Cancelled Appointment",
     Message: "Cancelled appointment with Dr. " + doctor.Name +" that was scheduled on " + upcomingApp.Date,
     Username: patientUsername,
   })

   const n2 = await notificationModel.create({
     Title: "Cancelled Appointment",
     Message: "Cancelled appointment with " + patient1.Name +" that was scheduled on " + upcomingApp.Date,
     Username: doctorUsername,
   })

   await transporter.sendMail({
     to: user.Email,
     subject: "Cancelled Appointment",
     text: `You have successfully cancelled an appointment with Dr. ${doctor.Name} that was scheduled on ${upcomingApp.Date}`,
   });

   await transporter.sendMail({
     to: doc.Email,
     subject: "New Appointment",
     text: `Cancelled appointment with ${patient1.Name} that was scheduled on ${upcomingApp.Date}`,
   });
     res.status(200).json({success:`Appointment cancelled and an amount of ${refund} refund restored successfully!`})
  }
    
  } catch (error) {
    res.status(404).json(error)
  }
}

const cancelAppForSelf = async (req, res) => {
 
  try {

     const patientUsername= req.user.Username
     const {doctorUsername}=req.body
     const upcomingApp=await appointmentModel.findOne({DoctorUsername:doctorUsername,PatientUsername:patientUsername, Status:"Upcoming"})
     const currDate= new Date();
     const user = await User.findOne({Username: patientUsername});
     const doc = await User.findOne({Username: doctorUsername});
     var refund=0
     if(!upcomingApp){
      res.status(404).json({err:"Can't cancel an appointment that's rescheduled/cancelled/completed!"})
      return;
     }
     else if(upcomingApp.Date.getTime()<currDate.getTime()+24*60*60){
      await appointmentModel.findOneAndUpdate({DoctorUsername:doctorUsername,PatientUsername:patientUsername, Status:"Upcoming"},{Status:"Cancelled"})
      
      const patient= await patientModel.findOne({Username:patientUsername})
      const doctor= await doctorModel.findOne({Username:doctorUsername})
      const n1 = await notificationModel.create({
      Title: "Cancelled Appointment",
      Message: "Cancelled appointment with Dr. " + doctor.Name +" that was scheduled on " + upcomingApp.Date,
      Username: patientUsername,
    })

    const n2 = await notificationModel.create({
      Title: "Cancelled Appointment",
      Message: "Cancelled appointment with " + patient.Name +" that was scheduled on " + upcomingApp.Date,
      Username: doctorUsername,
    })

    await transporter.sendMail({
      to: user.Email,
      subject: "Cancelled Appointment",
      text: `You have successfully cancelled an appointment with Dr. ${doctor.Name} that was scheduled on ${upcomingApp.Date}`,
    });

    await transporter.sendMail({
      to: doc.Email,
      subject: "Cancelled Appointment",
      text: `Cancelled appointment with ${patient.Name} that was scheduled on ${upcomingApp.Date}`,
    });
      
      res.status(200).json({success:"Appointment cancelled successfully!"})
     }
     else{
     const patient=await patientModel.findOne({Username:patientUsername})
     const bookedBy=await patientModel.findOne({Username:upcomingApp.BookedBy}) 
     const doctor= await doctorModel.findOne({Username:doctorUsername})
     const package= await subscriptionModel.findOne({Patient:patient,Status:"Subscribed"}).populate("Package")
     const packDisc= package? upcomingApp.createdAt.getTime() >= package.Startdate.getTime() &&
     upcomingApp.createdAt.getTime() <= package.Enddate.getTime()?package.Package.Session_Discount:0:0
     const refund= getSessionPrice(doctor.HourlyRate,packDisc)
     upcomingApp.BookedBy==patientUsername? await patientModel.findOneAndUpdate({Username:patientUsername},{Wallet:patient.Wallet+refund}):await patientModel.findOneAndUpdate({Username:bookedBy.Username},{Wallet:bookedBy.Wallet+refund})
     await appointmentModel.findOneAndUpdate({DoctorUsername:doctorUsername,PatientUsername:patientUsername, Status:"Upcoming"},{Status:"Cancelled"})

     const n1 = await notificationModel.create({
      Title: "Cancelled Appointment",
      Message: "Cancelled appointment with Dr. " + doctor.Name +" that was scheduled on " + upcomingApp.Date,
      Username: patientUsername,
    })

    const n2 = await notificationModel.create({
      Title: "Cancelled Appointment",
      Message: "Cancelled appointment with " + patient.Name +" that was scheduled on " + upcomingApp.Date,
      Username: doctorUsername,
    })

    await transporter.sendMail({
      to: user.Email,
      subject: "Cancelled Appointment",
      text: `You have successfully cancelled an appointment with Dr. ${doctor.Name} that was scheduled on ${upcomingApp.Date}`,
    });

    await transporter.sendMail({
      to: doc.Email,
      subject: "Cancelled Appointment",
      text: `Cancelled appointment with ${patient.Name} that was scheduled on ${upcomingApp.Date}`,
    });
     
    res.status(200).json({success:`Appointment cancelled and an amount of ${refund} refund restored successfully!`})
  
  }
    
  } catch (error) {
    res.status(404).json(error)
  }
}

function getSessionPrice(hourlyRate, packageDiscount) {
  return (1 - packageDiscount / 100) * (hourlyRate * 1.1); // 1.1 to add 10% clinic markup
}


/*  {
    "Username":"Dockholoud12&",
    "Password":"Dockholoud12&",
    "Email":"kholoud@yahooo.com",
    "Name":"kholoud",
    "DateOfBirth":"2002-12-1",
    "HourlyRate":"3",
    "Affiliation":"helloworld",
    "EducationalBackground":"Hsrvard",
    "Speciality":"Pulmonology"
    // WorkingDays,
    // StartTime,
    // EndTime,
  }  */


const createAppointment = async (req, res) => {
  const username = req.user.Username;
  var patient;
  var patNameFinal;
  var familymember;
  patient = await patientModel.findOne({ Username: username });
//const familymember=null;
  const { DoctorId, FamMemName, Date } = req.body;
// console.log("body: " + req.body.FamMemName);
  //this patient is technically fam member
  if (FamMemName) {
   familymember=await patientModel.findOne({Username: FamMemName});
    patNameFinal = familymember;
  } else {
    patNameFinal = patient;
  }
  console.log(DoctorId);
  //console.log(doctor);
  const doctor = await doctorModel.findById(DoctorId);
  console.log(doctor);
  const PatientUsernameFinal = patNameFinal.Username;
  const PatientName=patNameFinal.Name;
  const DoctorUsername = doctor.Username;
  const DoctorName = doctor.Name;
  const Status = "Upcoming";
  const user = await User.findOne({Username: PatientUsernameFinal});
  const doc = await User.findOne({Username: DoctorUsername});
  try {
    const newApp = await appointmentModel.create({
      DoctorUsername: doctor.Username,
      DoctorName: doctor.Name,
      PatientUsername: PatientUsernameFinal,
      PatientName,
      Status,
      Date,
      BookedBy: patient.Username,
    });

    const n1 = await notificationModel.create({
      Title: "New Appointment",
      Message: `You have successfully booked an appointment with Dr. ${DoctorName} scheduled on ${Date}`,
      Username: PatientUsernameFinal,
    })

    const n2 = await notificationModel.create({
      Title: "New Appointment",
      Message: `New appointment with ${patient.Name} scheduled on ${Date}`,
      Username: DoctorUsername,
    })

    await transporter.sendMail({
      to: user.Email,
      subject: "New Appointment",
      text: `You have successfully booked an appointment with Dr. ${DoctorName} scheduled on ${Date}`,
    });

    await transporter.sendMail({
      to: doc.Email,
      subject: "New Appointment",
      text: `New appointment with ${patient.Name} scheduled on ${Date}`,
    });

    console.log("created");
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


const reschdulebypatient= async (req, res) => {
  const username = req.user.Username;
  var patient;
  var patNameFinal;
  var familymember;
  patient = await patientModel.findOne({ Username: username });
//const familymember=null;
  const { DoctorId, FamMemName, Date } = req.body;
  console.log(DoctorId);
  console.log(FamMemName);
  console.log(Date);
// console.log("body: " + req.body.FamMemName);
  //this patient is technically fam member
  if (FamMemName) {
   familymember= await patientModel.findOne({ Username: FamMemName });
   console.log("here is fameme",familymember);
    patNameFinal = familymember;
  } else {
    patNameFinal = patient;
  }
  console.log(DoctorId);
  //console.log(doctor);
  const doctor = await doctorModel.findById(DoctorId);
  console.log(doctor);
  const PatientUsernameFinal = patNameFinal.Username;
  const PatientName=patNameFinal.Name;
  const DoctorUsername = doctor.Username;
  const DoctorName = doctor.Name;
  const Status = "Upcoming";
  const user = await User.findOne({Username: PatientUsernameFinal});
  const doc = await User.findOne({Username: DoctorUsername});
  try {
    const rescheduledappointment=await appointmentModel.findOneAndUpdate(
           {DoctorUsername:doctor.Username,
        PatientUsername:PatientUsernameFinal,Status:"Upcoming"},{Status:"Rescheduled"}
       )
    const newApp = await appointmentModel.create({
      DoctorUsername: doctor.Username,
      DoctorName: doctor.Name,
      PatientUsername: PatientUsernameFinal,
      PatientName,
      Status,
      Date,
      BookedBy: patient.Username,
    });

    const n1 = await notificationModel.create({
      Title: "Rescheduled Appointment",
      Message: `You have successfully rescheduled an appointment with Dr. ${DoctorName} scheduled on ${Date}`,
      Username: PatientUsernameFinal,
    })

    const n2 = await notificationModel.create({
      Title: "Rescheduled Appointment",
      Message: `Rescheduled appointment with ${patient.Name} scheduled on ${Date}`,
      Username: DoctorUsername,
    })

    await transporter.sendMail({
      to: user.Email,
      subject: "Rescheduled Appointment",
      text: `You have successfully rescheduled an appointment with Dr. ${DoctorName} scheduled on ${Date}`,
    });

    await transporter.sendMail({
      to: doc.Email,
      subject: "Rescheduled Appointment",
      text: `Rescheduled appointment with ${patient.Name} scheduled on ${Date}`,
    });

    console.log("created");
    res.status(201).json(newApp);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// const rescheduleAppointmentPatient= async(req,res) =>{
//   try {
//     const PatientUser = req.user.Username;
//     const {doctorUsername,date }=req.body;
//    const newDate = new Date(date);
//     const Doctor = await doctorModel.findOne({ Username: doctorUsername });
//     const hasappointment=await appointmentModel.findOne({DoctorUsername:doctorUsername,
//     PatientUsername:PatientUser,Status:"Upcoming"});
//     const Patient=await patientModel.findOne({Username:PatientUser});
//   //  console.log("hhh"+hasappointment);
//   //  console.log("1");
//   let timeinhour=newDate.getUTCHours();
//   let timeinminutes=newDate.getUTCMinutes();
//   let combined =timeinhour+(timeinminutes/100);
//   console.log(combined);
//   const Appointmentreserved =await appointmentModel.find({DoctorUsername:doctorUsername,Status:"Upcoming"});
//   // is slot for doctor avliable 
//   //console.log(Appointmentreserved);
//   // you need to check minute
//   let isdocslotavaliable=await docSlotsModel.find({DoctorId:Doctor,WorkingDay:newDate.getDay()+1,
//     StartTime:combined});
     
//     //console.log(newDate.getDay());
//     //console.log(newDate.getUTCHours());
//   // Check is slot is avaliable  as doctor don't have appointment in this slot 
//   let isSlotAvailable = true;
//   for (const appointment of Appointmentreserved){
//     const existingDate = new Date(appointment.Date);
//    // console.log(existingDate);
//     if (newDate.getFullYear()==existingDate.getFullYear() && newDate.getMonth()+1==existingDate.getMonth()
//      && newDate.getDay()==existingDate.getDay() 
//     &&newDate.getUTCHours()==existingDate.getUTCHours()) {
//       isSlotAvailable = false;
//       break;
//     }
//   }

// const PatientAppointments = await appointmentModel.find({
//   PatientUsername: PatientUser,
//   $or: [
//     { Status: "Upcoming" },
//     { Status: "Rescheduled" } 
//   ]
// });
//    // console.log(PatientAppointments);

//     let patientavaliable = true;
//     for (const appointment1 of PatientAppointments){
//       const existingDate1 = new Date(appointment1.Date);
//       console.log(existingDate1);
//       if (newDate.getFullYear()==existingDate1.getFullYear() && newDate.getMonth()+1==existingDate1.getMonth()+1
//        && newDate.getDay()==existingDate1.getDay() 
//       &&newDate.getUTCHours()==existingDate1.getUTCHours()) {
//         patientavaliable = false;
//         break;
//       }
//     }
// //console.log(patientavaliable);

// if (!patientavaliable){
//   res.status(500).send({message:"You already have an appointment  "});
// }
// else if (!isSlotAvailable){
//   res.status(500).send({message:"Doctor has an appointment in this date "});
// }
//   else if (!isdocslotavaliable&&hasappointment){
//     res.status(500).send({message:" This slot is not avaliable for this dctor  "});
//   }
//   else if (hasappointment==null){
//     res.status(500).send({message:"You don't have any appointments Upcooming appointments with this doctor"});
//   }
//   else {
//      const rescheduledappointment=await appointmentModel.findOneAndUpdate(
//       {DoctorUsername:doctorUsername,
//         PatientUsername:PatientUser,Status:"Upcoming"},{Status:"Rescheduled"}
//      )
//      const newappointment=await appointmentModel.create(
//       {DoctorUsername:doctorUsername,
//         DoctorName:Doctor.Name,
//         PatientUsername:PatientUser,
//         PatientName:Patient.Name,
//         Status:"Upcoming",Date:newDate
//       }
//      )
//     res.status(200).json(newappointment);
//   }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }
// const reschedulefamilymember = async (req, res) => {
//   const currentuser = req.user.Username;
//   const { doctorUsername, Familymemberusername, date } = req.body;
//   const newDate = new Date(date);
//   const Doctor = await doctorModel.findOne({ Username: doctorUsername });
//   console.log("Doctor");
//   console.log(Doctor);
//   const Patient =await patientModel.findOne({Username:Familymemberusername});
//   try {

//     const familyMember = await User.findOne({Username: Familymemberusername});
//     const doc = await User.findOne({Username: doctorUsername});

//     const rescheduledappointment=await appointmentModel.findOneAndUpdate(
//       {DoctorUsername:doctor.Username,
//         PatientUsername:PatientUsernameFinal,Status:"Upcoming"},{Status:"Rescheduled"}
//      )
//      const newappointment=await appointmentModel.create(
//       {  DoctorUsername: doctor.Username,
//         DoctorName:doctor.Name,
//         PatientUsername: PatientUsernameFinal,
//         PatientName,
//         Status,
//         Date,
//         BookedBy:username
//       }
//      )
//     res.status(200).json(newappointment);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// const rescheduleAppointmentPatient= async(req,res) =>{
//   try {
//     const PatientUser = req.user.Username;
//     const {doctorUsername,date }=req.body;
//    const newDate = new Date(date);
//     const Doctor = await doctorModel.findOne({ Username: doctorUsername });
//     const hasappointment=await appointmentModel.findOne({DoctorUsername:doctorUsername,
//     PatientUsername:PatientUser,Status:"Upcoming"});
//     const Patient=await patientModel.findOne({Username:PatientUser});
//   //  console.log("hhh"+hasappointment);
//   //  console.log("1");
//   let timeinhour=newDate.getUTCHours();
//   let timeinminutes=newDate.getUTCMinutes();
//   let combined =timeinhour+(timeinminutes/100);
//   console.log(combined);
//   const Appointmentreserved =await appointmentModel.find({DoctorUsername:doctorUsername,Status:"Upcoming"});
//   // is slot for doctor avliable 
//   //console.log(Appointmentreserved);
//   // you need to check minute
//   let isdocslotavaliable=await docSlotsModel.find({DoctorId:Doctor,WorkingDay:newDate.getDay()+1,
//     StartTime:combined});
     
//     //console.log(newDate.getDay());
//     //console.log(newDate.getUTCHours());
//   // Check is slot is avaliable  as doctor don't have appointment in this slot 
//   let isSlotAvailable = true;
//   for (const appointment of Appointmentreserved){
//     const existingDate = new Date(appointment.Date);
//    // console.log(existingDate);
//     if (newDate.getFullYear()==existingDate.getFullYear() && newDate.getMonth()+1==existingDate.getMonth()
//      && newDate.getDay()==existingDate.getDay() 
//     &&newDate.getUTCHours()==existingDate.getUTCHours()) {
//       isSlotAvailable = false;
//       break;
//     }
//   }

// const PatientAppointments = await appointmentModel.find({
//   PatientUsername: PatientUser,
//   $or: [
//     { Status: "Upcoming" },
//     { Status: "Rescheduled" } 
//   ]
// });
//    // console.log(PatientAppointments);

//     let patientavaliable = true;
//     for (const appointment1 of PatientAppointments){
//       const existingDate1 = new Date(appointment1.Date);
//       console.log(existingDate1);
//       if (newDate.getFullYear()==existingDate1.getFullYear() && newDate.getMonth()+1==existingDate1.getMonth()+1
//        && newDate.getDay()==existingDate1.getDay() 
//       &&newDate.getUTCHours()==existingDate1.getUTCHours()) {
//         patientavaliable = false;
//         break;
//       }
//     }
// //console.log(patientavaliable);

// if (!patientavaliable){
//   res.status(500).send({message:"You already have an appointment  "});
// }
// else if (!isSlotAvailable){
//   res.status(500).send({message:"Doctor has an appointment in this date "});
// }
//   else if (!isdocslotavaliable&&hasappointment){
//     res.status(500).send({message:" This slot is not avaliable for this dctor  "});
//   }
//   else if (hasappointment==null){
//     res.status(500).send({message:"You don't have any appointments Upcooming appointments with this doctor"});
//   }
//   else {
//      const rescheduledappointment=await appointmentModel.findOneAndUpdate(
//       {DoctorUsername:doctorUsername,
//         PatientUsername:PatientUser,Status:"Upcoming"},{Status:"Rescheduled"}
//      )
//      const newappointment=await appointmentModel.create(
//       {DoctorUsername:doctorUsername,
//         DoctorName:Doctor.Name,
//         PatientUsername:PatientUser,
//         PatientName:Patient.Name,
//         Status:"Upcoming",Date:newDate
//       }
//      )
//     res.status(200).json(newappointment);
//   }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// }
// const reschedulefamilymember = async (req, res) => {
//   const currentuser = req.user.Username;
//   const { doctorUsername, Familymemberusername, date } = req.body;
//   const newDate = new Date(date);
//   const Doctor = await doctorModel.findOne({ Username: doctorUsername });
//   console.log("Doctor");
//   console.log(Doctor);
//   const Patient =await patientModel.findOne({Username:Familymemberusername});
//   try {
//     const rescheduledappointment=await appointmentModel.findOneAndUpdate(
//       {DoctorUsername:doctorUsername,
//         PatientUsername:Familymemberusername,Status:"Upcoming"},{Status:"Rescheduled"}
//      )
//      const newappointment=await appointmentModel.create(
//       {DoctorUsername:doctorUsername,
//         DoctorName:Doctor.Name,
//         PatientUsername:Familymemberusername,
//         PatientName:Patient.Name,
//         Status:"Upcoming",
//         Date:newDate,
//         BookedBy:currentuser,
//       }
//      )
//     res.status(200).json(newappointment);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

  
module.exports = {
  getDoctorId,
  cancelAppForFam,
  cancelAppForSelf,
  createAppointment,
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
  getAppointmentsfamilymembers,
  testAppointRef,
  reschdulebypatient,
  // reschedulefamilymember,
  getAllAppointmentsPat,
  
}