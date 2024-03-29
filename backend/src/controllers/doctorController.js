const doctorModel = require("../models/doctors");
const appointmentModel = require("../models/appointments");
const prescriptionsModel = require("../models/prescriptions");
const patientModel = require("../models/patients");
const { default: mongoose } = require("mongoose");
const systemUserModel = require("../models/systemusers");
const packageModel = require("../models/packages");
const docSlotsModel = require("../models/docSlots");
const subscriptionModel = require("../models/subscriptions");
const requestModel = require("../models/appointmentrequests");
const notificationModel = require("../models/notificationsChat");
const { Int32 } = require("bson");

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

const getDoctorByUser = async (req, res) => {
  const username = req.user.Username;
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

    if (urlParams.has("date") && urlParams.has("hour")) {
      if (req.query.date && req.query.hour) {
        const date = new Date(req.query.date);
        const day = date.getDay();
        const hours = date.getHours();
        const mins = date.getMinutes();
        const hour = hours + mins / 100;

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

        for (const doctor of myDoctors) {
          appointments = await appointmentModel.find({
            DoctorUsername: doctor.Username,
          });
          if (appointments.length != 0) {
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
      // Extract the 'Package' property from the patient document
      const Package = result.Package;
      // If the 'Package' property is not null, use the 'find' method of the 'packageModel' to retrieve a package document with the specified 'Name'
      if (Package) {
        await packageModel
          .findOne({ Name: Package })
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
        const calcCost = (1 - packageDis / 100) * (element.HourlyRate * 1.1);
        const calcCostOld = element.HourlyRate * 1.1;
        const calcCostfam = calcCost;
        // 1.1 to account for 10% clinic markup
        // Add an object to the 'mySessions' array that contains the doctor's name, speciality, and calculated cost
        myFilteredDoctors.push({
          Username: element.Username,
          Name: element.Name,
          Speciality: element.Speciality,
          Cost: calcCost,
          CostOld: calcCostOld,
          CostFam: calcCostfam,
        });
      }
      console.log(myFilteredDoctors);
      res.status(200).json(myFilteredDoctors);
    });
  } catch (err) {
    console.log(err);
  }
};
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

function findDayRangeFromDate(startDate, endDate) {
  const dayDiff = parseInt((endDate - startDate) / (1000 * 60 * 60 * 24), 10);
  var dayRange = [];
  if (dayDiff >= 7) dayRange = [0, 1, 2, 3, 4, 5, 6];
  else
    for (
      var dateCount = startDate;
      dateCount <= endDate;
      dateCount.setDate(dateCount.getDate() + 1)
    ) {
      dayRange.push(dateCount.getDay());
    }
  return dayRange;
}

function getDayNumberFromName(day) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekDays.indexOf(day);
}
function getDayNameFromNumber(day) {
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return weekDays[day];
}

const filterDoctorSlotEdition = async (req, res) => {
  //TODO: Check if both end time and end Date required (sprint 3)
  try {
    var dateFilteredDoctors = new Array();
    var specFilteredDoctors = new Array();
    var finalRes = new Array();
    var finalResView = new Array();

    //first stage -> filter by date&time range
    if (
      req.query.startDate &&
      req.query.endDate &&
      req.query.startHour &&
      req.query.endHour
    ) {
      //get all doctors who have slots within the date&time range passed by user.
      const dateDocs = await availableDocXSlots(req, res);

      //get all doctors who have slotss available for booking within the date&time range passed by user
      var filteredDateDocs = await filteredDateDoctors(
        dateDocs,
        dateFilteredDoctors
      );

      //second stage -> filter first_Stage docs by speciality
      if (req.query.speciality) {
        var filteredSpecDocs = await filteredSpecDoctors(
          filteredDateDocs,
          specFilteredDoctors,
          req.query.speciality
        );
        finalRes = filteredSpecDocs;
      } else finalRes = filteredDateDocs;

      //In case no date filter params
    } else {
      console.log("helloelse");
      const query = req.query.speciality
        ? { Speciality: { $regex: req.query.speciality.trim(), $options: "i" } }
        : {};
      finalRes = await doctorModel.find(query);
    }

    console.log("before for");
    console.log(finalRes);
    const discount = await getPackageDiscount(req.user.Username);

    console.log("dis: " + discount);

    const famDiscount = await getPackageFamDiscount(req.user.Username);

    for (let element of finalRes) {
      finalResView.push({
        Username: element.Username,
        Name: element.Name,
        Speciality: element.Speciality,
        //HourlyRate: element.HourlyRate,
        Cost: getSessionPrice(element.HourlyRate, discount).toFixed(2),
        CostOld: getSessionPrice(element.HourlyRate, discount).toFixed(2),
        CostFam: getSessionPrice(element.HourlyRate, famDiscount).toFixed(2),
      });
    }
    console.log("after for");

    console.log(finalResView);
    res.status(200).json(finalResView);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

async function getPackageDiscount(patientUsername) {
  const patient = await patientModel.findOne({ Username: patientUsername });
  const subscription = await subscriptionModel
    .findOne({ Patient: patient._id })
    .populate("Package");

  if (!subscription) {
    return 0;
  }
  if (subscription.Status === "Subscribed" && subscription.Package) {
    return subscription.Package.Session_Discount;
  }
  return 0;
}
function getSessionPrice(hourlyRate, packageDiscount) {
  return (1 - packageDiscount / 100) * (hourlyRate * 1.1); // 1.1 to add 10% clinic markup
}

async function getPackageFamDiscount(patientUsername) {
  const patient = await patientModel.findOne({ Username: patientUsername });
  const subscription = await subscriptionModel
    .findOne({ Patient: patient._id })
    .populate("Package");

  if (!subscription) {
    console.log("unsub");
    return 0;
  }
  if (subscription.Status === "Subscribed" && subscription.Package) {
    console.log("subscribed");
    return subscription.Package.Family_Discount;
  }
  return 0;
}

//usage: returns the available slot(s) of all doctorsss
//based on the date&time range passed from the user
//returns DocSlots (ex: {doc: X, slot: Mon 3:00}, {doc: X, slot: Sun 4:00}, {doc: Y, slot: Sun 4:00} , ..)
async function availableDocXSlots(req) {
  try {
    if (
      (req.query.startDate && req.query.endDate,
      req.query.startHour && req.query.endHour)
    ) {
      const startDate = new Date(req.query.startDate);
      const endDate = new Date(req.query.endDate);
      dayRange = findDayRangeFromDate(startDate, endDate);

      const startHour = parseInt(req.query.startHour);
      const endHour = parseInt(req.query.endHour);

      const docSlotCross = await doctorModel.aggregate([
        {
          $lookup: {
            from: docSlotsModel.collection.name,
            localField: "_id",
            foreignField: "DoctorId",
            as: "DocSlotCross",
          },
        },
        {
          $unwind: "$DocSlotCross",
        },
        {
          $match: {
            $and: [
              { "DocSlotCross.StartTime": { $gte: startHour, $lte: endHour } },
              { "DocSlotCross.WorkingDay": { $in: dayRange } },
            ],
          },
        },
        {
          $project: {
            Username: 1,
            Name: 1,
            Speciality: 1,
            HourlyRate: 1,
            DocSlotCross: 1,
          },
        },
      ]);
      return docSlotCross;
    }
  } catch (error) {
    console.log(error);
  }
}

//usage: checks if A doctor in A slot (aka docSlot) is available
//by checking if he has no appointment in this slot or apt is not upcoming
//returns false or the doc NEEDED fields for further operations
async function isDocSlotAvailable(docSlot) {
  try {
    const tmpSlotDay = docSlot.DocSlotCross.WorkingDay;
    const tmpSlotHour = docSlot.DocSlotCross.StartTime;
    console.log(docSlot);
    const docApts = await appointmentModel.aggregate([
      {
        $addFields: {
          aptDay: { $dayOfWeek: "$Date" },
          aptHour: { $hour: "$Date" },
        },
      },
      {
        $match: {
          $and: [
            { DoctorUsername: { $eq: docSlot.Username } },
            { aptDay: tmpSlotDay },
            { aptHour: tmpSlotHour },
          ],
        },
      },
    ]);

    console.log(docApts);

    if (docApts.length != 0) {
      if (docApts.Status === "Upcoming") {
        console.log("false");
        return false;
      }
    }
    console.log("true");
    return {
      Username: docSlot.Username,
      Name: docSlot.Name,
      Speciality: docSlot.Speciality,
      HourlyRate: docSlot.HourlyRate,
    };
    //return true;
  } catch (error) {
    console.log(error);
  }
}

//usage: does the (isDocSlotAvailable) check on all docs with slots within the range.
async function filteredDateDoctors(dateDocs, dateFilteredDoctors) {
  for (let element of dateDocs) {
    //second stage
    const tmpDocDate = await isDocSlotAvailable(element);
    if (!tmpDocDate) {
      continue;
    } else {
      if (!(await checkDuplicate(dateFilteredDoctors, tmpDocDate)))
        dateFilteredDoctors.push(tmpDocDate);
    }
  }
  return dateFilteredDoctors;
}

//usage: checks if element exists in an array
async function checkDuplicate(array, element) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].Username === element.Username) {
      return true;
    }
  }
  return false;
}

//usage: checks on speciality of A doctor
//returns false or doc neede info
async function isDocSpeciality(doc, speciality) {
  try {
    if (!(doc.Speciality === speciality)) {
      return false;
    }
    return doc;
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

//usage: does the (isDocSpeciality) check on all passed docs.
async function filteredSpecDoctors(docs, specFilteredDoctors, speciality) {
  for (let element of docs) {
    const tmpDocSpec = await isDocSpeciality(element, speciality);
    if (!tmpDocSpec) {
      continue;
    } else {
      if (!(await checkDuplicate(specFilteredDoctors, tmpDocSpec)))
        specFilteredDoctors.push(tmpDocSpec);
    }
  }
  return specFilteredDoctors;
}

const addMySlotsDoc = async (req, res) => {
  const { dayNumber, StartTimeToAdd } = req.query;
  const username = req.user.Username;
  //const dayNumber = getDayNumberFromName(DayToAdd);
  try {
    const doctor = await doctorModel.findOne({ Username: username });
    //find the slots of this doctor that are in the same day using docId
    const slots = await docSlotsModel.find({
      DoctorId: doctor._id,
      WorkingDay: dayNumber,
    });

    console.log("hello_add");
    console.log(slots);
    //check that no conflict between existing slots
    for (let element of slots) {
      //idk if this is error (status 500) or not.
      if (Math.abs(element.StartTime - StartTimeToAdd) < 1) {
        res.status(500).send({ message: "can not add, conflict" });
        return;
      }
    }

    const newSlot = await docSlotsModel.create({
      WorkingDay: dayNumber,
      StartTime: StartTimeToAdd,
      DoctorId: doctor._id,
    });

    const slotToTable = {
      SlotId: newSlot._id,
      DayName: getDayNameFromNumber(newSlot.WorkingDay),
      StartTime: newSlot.StartTime,
    };

    console.log("hello_add_created");
    console.log(slotToTable);

    res.status(200).send({ slotToTable });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//update will basically update the time on;y, if you want to update the day this
//means you delete it from the old day and insert a new one in the new day.
const updateMySlotsDoc = async (req, res) => {
  const { StartTimeToUpdate } = req.query;
  const { id } = req.params;

  var x = StartTimeToUpdate.split(":");

  try {
    const mySlot = await docSlotsModel.findById(id);
    const slots = await docSlotsModel.find({
      DoctorId: mySlot.DoctorId,
      WorkingDay: mySlot.WorkingDay,
    });

    for (let element of slots) {
      if (
        Math.abs(element.StartTime - StartTimeToUpdate) < 1 &&
        element._id != id
      ) {
        res.status(500).json("can not update, conflict");
        return;
      }
    }
    const newSlot = await docSlotsModel.findByIdAndUpdate(id, {
      StartTime: StartTimeToUpdate,
    });
    res.status(200).send({ newSlot });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const deleteMySlotsDoc = async (req, res) => {
  const { id } = req.params;
  try {
    const docSlot = await docSlotsModel.findByIdAndDelete(id);
    if (!docSlot) {
      res.status(404).json("slot does not exist");
      return;
    }
    res.status(200).json(docSlot);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const viewUpcomingAppointmentsDoc = async (req, res) => {
  const username = req.user.Username;
  //put in mind the string thing if the (Status) condition in the find query does not work
  try {
    const pastAppointments = await appointmentModel.find(
      { DoctorUsername: username },
      { Status: { $eq: "Upcoming" } }
    );
    //maybe for usability add smth that says no appointments in case length of pastAppointments == 0
    res.status(200).json(pastAppointments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//make sure from the ta that past appointments is completed bas
const viewPastAppoitmentsDoc = async (req, res) => {
  const username = req.user.Username;
  try {
    const pastAppointments = await appointmentModel.find(
      { DoctorUsername: username },
      { Status: { $eq: "Completed" } }
    );
    //maybe for usability add smth that says no appointments in case length of pastAppointments == 0
    res.status(200).json(pastAppointments);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//the username of the doctor will be passed and added to the viewDoctorDetails page
const viewAllAvailableSlots = async (req, res) => {
  const { username } = req.params;
  var slotsToView = new Array();
  try {
    const doctor = await doctorModel.findOne({ Username: username });
    const allDocSlots = await docSlotsModel.find({ DoctorId: doctor._id });
    for (let element of allDocSlots) {
      const StartTime = element.StartTime.toFixed(2);
      const strtTime2 = StartTime.toString().split(".");
      console.log("strtTime2: " + strtTime2);

      const StartTimeFinal = strtTime2[0].padStart(2, "0") + ":" + strtTime2[1];
      console.log("StartTimeFinal: " + StartTimeFinal);
      slotsToView.push({
        DoctorId: element.DoctorId,
        DayName: getDayNameFromNumber(element.WorkingDay),
        StartTime: StartTimeFinal,
      });
    }
    res.status(200).json(slotsToView);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const viewAllAvailableSlotsForMe = async (req, res) => {
  const username = req.user.Username;
  var slotsToView = new Array();
  try {
    const doctor = await doctorModel.findOne({ Username: username });
    const allDocSlots = await docSlotsModel.find({ DoctorId: doctor._id });
    for (let element of allDocSlots) {
      const StartTime = element.StartTime.toFixed(2);
      const strtTime2 = StartTime.toString().split(".");
      console.log("strtTime2: " + strtTime2);

      const StartTimeFinal = strtTime2[0].padStart(2, "0") + ":" + strtTime2[1];
      console.log("StartTimeFinal: " + StartTimeFinal);
      slotsToView.push({
        DoctorId: element.DoctorId,
        DayName: getDayNameFromNumber(element.WorkingDay),
        StartTime: StartTimeFinal,
      });
    }
    res.status(200).json(slotsToView);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

//use: when booking appointment based on A doc slot, you need to validate that:
//    -> the date day matches the day ; ex: 11/11 is Sat
//     -> the doc has no appointment in that Day

//TODO: make the calendar thing validation greater than today (CAN POSTPONE TO SPRINT_3)
//TODO: ADD THE ROUTE OF THIS METHOD &  THE DOCTOR USERNAME IN THE URL;
// const checkAptDateForBooking = async (req, res) => {
//   //doctor Username ---> from URL
//   const { username } = req.params;

//   //patient Username --> from session or family member
//   const { patUsername } = req.user.Username;

//   //TODO: check the local zone time thing
//   //you need to pass all docSlot fields in  case it is a new page

//   //the given date from the calendar
//   const date = req.body;

//   //slot fields from docSlot
//   const { WorkingDay, StartTime } = req.body;
//   const curDate = new Date();

//   try {
//     if (date < curDate || date.getDay != WorkingDay)
//       res.status(500).json("invalid date");
//     else {
//       const docApts = await appointmentModel.aggregate([
//         {
//           $addFields: {
//             aptDay: { $dayOfWeek: "$Date" },
//             aptHour: { $hour: "$Date" },
//           },
//         },
//         {
//           $match: {
//             $and: [
//               { DoctorUsername: { $eq: username } },
//               { aptDay: WorkingDay },
//               { aptHour: StartTime },
//               { Status: { $in: ["Upcoming", "FollowUp"] } },
//             ],
//           },
//         },
//       ]);

//       if (docApts.length != 0) {
//         res.status(500).json("Can not book this appointment");
//       } else {
//         //TODO: make sure you have a create method that given a
//         // patient username or doctor username it adds the right patientName & docName
//         //and not the random generator
//         const newApt = await appointmentModel.create({
//           DoctorUsername: username,
//           Date: date.setHours(StartTime),
//           PatientUsername: patUsername,
//           Status: "Upcoming",
//         });
//         res.status(201).json(newApt);
//       }
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const validateBookingDate = async (req, res) => {
  const { DayName, DateFinal, DoctorId } = req.query;

  console.log(DateFinal);
  console.log(new Date(DateFinal));
  const tmpDate = new Date(DateFinal);

  console.log(getDayNameFromNumber(tmpDate.getDay()));
  console.log(DayName);

  if (getDayNameFromNumber(tmpDate.getDay()) === DayName) {
    try {
      console.log(DateFinal);
      const Doctor = await doctorModel.findOne({ _id: DoctorId });
      const appointment = await appointmentModel.findOne({
        DoctorUsername: Doctor.Username,
        Date: DateFinal,
        Status: "Upcoming",
      });
      if (appointment) {
        console.log(appointment.Date);
        console.log("invalid");
        res.status(500).send({ message: "this date is unavailable" });
      } else {
        console.log("valid");
        res.status(200).json("validDate");
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else
    res.status(500).send({ message: "Chosen Date does not match chosen Day" });
};



const validateBookingDateDoctor = async (req, res) => {
  const { DayName, DateFinal, DoctorId } = req.query;

  console.log(DateFinal);
  console.log(new Date(DateFinal));
  const tmpDate = new Date(DateFinal);

  console.log(getDayNameFromNumber(tmpDate.getDay()));
  console.log(DayName);

  if (getDayNameFromNumber(tmpDate.getDay()) === DayName) {
    try {
      console.log(DateFinal);
      const Doctor = await doctorModel.findOne({ _id: DoctorId });
      const appointment = await appointmentModel.findOne({
        DoctorUsername: Doctor.Username,
        Date: DateFinal,
        Status: "Upcoming",
      });
      if (appointment) {
        console.log(appointment.Date);
        console.log("invalid");
        res.status(500).send({ message: "this date is unavailable" });
      } else {
        console.log("valid");
        res.status(200).json("validDate");
      }
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  } else
    res.status(500).send({ message: "Chosen Date does not match chosen Day" });
};

const rescheduleAppointmentPatient = async (req, res) => {
  try {
    const PatientUser = req.user.Username;
    const { doctorUsername, date } = req.body;
    const newDate = newDate(date);
    const tmpDate = new Date(DateFinal);
    const Patient = await patientModel.findOne({ Username: PatientUser });
    const Doctor = await doctorModel.findOne({ Username: doctorUsername });
    const hasappointment = await appointmentModel.findOne({
      DoctorUsername: doctorUsername,
      PatientUsername: PatientUser,
      Status: "Upcoming",
    });
    const Appointmentreserved = await appointmentModel.find({
      DoctorUsername: doctorUsername,
    });
    // Check is slot is avaliable
    //  const isslotfordoctor =await docSlotsModel.find({DoctorId:Doctor,WorkingDay:newDate.getDay()});
    let isSlotAvailable = true;
    for (const appointment of Appointmentreserved) {
      const existingDate = new Date(appointment.Date);
      if (newDate.getHours() === existingDate.getHours()) {
        isSlotAvailable = false;
        break;
      }
    }
    let patientavaliable = true;
    const patientappointments = await appointmentModel.findOne({
      PatientUsername: PatientUser,
      Status: "Upcoming",
    });
    for (const appointmentPatient of patientappointments) {
      const existingDate = new Date(appointmentPatient.Date);
      if (newDate.getHours() === existingDate.getHours()) {
        patientavaliable = false;
        break;
      }
    }
    if (!Patient) {
      res.status(500).send({ message: "Wrong Patient Username " });
    } else if (!Doctor) {
      res.status(500).send({ message: "No such a doctor with username " });
    } else if (!patientavaliable) {
      res.status(500).send({ message: "You already have an appointment  " });
    } else if (isSlotAvailable) {
      res
        .status(500)
        .send({ message: " This slot is not avaliable for this dctor  " });
    } else if (!hasappointment) {
      res.status(500).send({
        message:
          "You don't have any appointments with this doctor to reschdule ",
      });
    } else {
      const rescheduledappointment = await appointmentModel.findOneAndUpdate(
        {
          DoctorUsername: doctorUsername,
          PatientUsername: PatientUser,
          Status: "Upcoming",
        },
        { Status: "Rescheduled", Date: newDate }
      );
      res.status(200).json(rescheduledappointment);
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const viewMySlotsDoc = async (req, res) => {
  const username = req.user.Username;

  try {
    const doctor = await doctorModel.findOne({ Username: username });
    const slots = await docSlotsModel.find({ DoctorId: doctor._id });
    var viewSlots = new Array();

    for (let slot of slots) {
      console.log("slot start time: " + slot.StartTime);

      const dayName = getDayNameFromNumber(slot.WorkingDay);

      //toFixed --> makes sure number contains 2 digits after point
      //needed for cases like XX:10 , XX:20 since parsing into Number will make it XX.1, .2,..
      const StartTime = slot.StartTime.toFixed(2);
      const strtTime2 = StartTime.toString().split(".");
      console.log("strtTime2: " + strtTime2);

      //padStart --> makes sure you have two numbers before point
      //and if no numbers it adds 0
      //needed for cases like 00:XX, 04:XX since parsing into number makes it 0, 4 , ...
      const StartTimeFinal = strtTime2[0].padStart(2, "0") + ":" + strtTime2[1];
      console.log("StartTimeFinal: " + StartTimeFinal);

      viewSlots.push({
        SlotId: slot._id,
        DayName: dayName,
        StartTime: StartTimeFinal,
      });
    }
    res.status(200).json(viewSlots);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

const followupAppointment = async (req, res) => {
  const patientUsername = req.query.PatientUsername;
  const doctorUsername = req.user.Username;
  const appointmentID = req.query.appointmentID;
  const date = new Date(req.query.date);
  const today = new Date();

  try {
    const patient = await patientModel.findOne({
      Username: patientUsername,
    });
    const doctor = await doctorModel.findOne({
      Username: doctorUsername,
    });

    if (date < today) {
      res.status(400).json({ error: "invalid date" });
      return;
    } else {
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
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const payDoctor = async (req, res) => {
  const id = req.body.DoctorId;
  // const famMemName = req.body.FamMemName;
  // const username = req.user.Username;
  try {
    const doctor = await doctorModel.findOne({ _id: id });

    const HourlyRate = doctor.HourlyRate;
    // const patient = await subscriptionModel.findOne
    console.log("before: " + doctor.Wallet);
    doctor.Wallet += doctor.HourlyRate;
    await doctor.save();
    console.log("doqwallet" + doctor.Wallet);
    res.status(200).json({ message: "Doctor got paid" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPaymentAmount = async (req, res) => {
  const id = req.body.DoctorId;
  const famMemName = req.body.FamMemName;
  const username = req.user.Username;

  try {
    //   const doctor = await doctorModel.findOne({ _id: id });

    //   const HourlyRate = doctor.HourlyRate;
    //  // const patient = await subscriptionModel.findOne
    //   console.log("before: " + doctor.Wallet);
    //   doctor.Wallet += doctor.HourlyRate;
    //   await doctor.save();
    //   console.log("doqwallet" + doctor.Wallet);
    //   res.status(200).json({ message: "Doctor got paid" });

    var discount;
    const patient = await patientModel.findOne({ Username: username });
    const subscription = await subscriptionModel
      .findOne({ Patient: patient._id })
      .populate("Package");

    if (!subscription) {
      discount = 0;
    } else {
      if (subscription.Status === "Subscribed" && subscription.Package) {
        if (famMemName) {
          discount = subscription.Package.Family_Discount;
        } else {
          discount = subscription.Package.Session_Discount;
        }
      }
    }
    const doctor = await doctorModel.findOne({ _id: id });
    const hourlyRate = doctor.HourlyRate;

    const amount = (1 - discount / 100) * (hourlyRate * 1.1);

    res.status(200).json(amount);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getChatPatients = async (req, res) => {
  try {
    console.log(req.user.Username);
    // Find all appointments associated with the current doctor
    const docAppointments = await appointmentModel.find({
      DoctorUsername: req.user.Username,
      Status: { $in: ["Upcoming", "Completed"] },
    });
    const uniquePatientUsernames = new Set();

    const chatPatients = await Promise.all(
      docAppointments.map(async (appointment) => {
        const patient = await patientModel.findOne({
          Username: appointment.PatientUsername,
        });
        console.log(patient);
        // Check if the patient username is already in the set
        if (patient && !uniquePatientUsernames.has(patient.Username)) {
          // If not, add it to the set and include the patient in the result
          uniquePatientUsernames.add(patient.Username);
          const notifications = await notificationModel.find({
            senderUsername: patient.Username,
            seen: false,
          });
          // If there are any unseen notifications, set hasNotif to true
          const hasNotif = notifications.length > 0;
          console.log("hasNotif");
          console.log(hasNotif);
          // Return the doctor and hasNotif in the result
          return { ...patient._doc, hasNotif };
        }

        return null; // If the patient is already in the set, return null
      })
    );

    // Filter out null values (those are the duplicates)
    const filteredChatPatients = chatPatients.filter(
      (patient) => patient !== null
    );

    res.status(200).json(filteredChatPatients);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};
const getDocUsernameSocket = async (req, res) => {
  try {
    const username = req.user.Username;
    console.log(username);
    res.status(200).json(username);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getRequest = async (req, res) => {
  const { Username, FollowUpDate } = req.query;
  try {
    const request = await requestModel.findOne({Date: FollowUpDate, DoctorUsername: req.user.Username, PatientUsername: Username});
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await requestModel.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const acceptFollowUp = async (req, res) => {
  const { Username, FollowUpDate } = req.body;
  
  const docUsername = req.user.Username;
  console.log(Username, docUsername);
  try {
  const today = new Date();
    const request = await requestModel.findOne({
      PatientUsername: Username, DoctorUsername: docUsername, Date: FollowUpDate,
      Status: { $ne: "Accepted" },
    });
    console.log(request);
    const patient = await patientModel.findOne({ Username });
    const doctor = await doctorModel.findOne({
      Username: docUsername,
    });
    if (FollowUpDate < today) {
      res.status(400).json({ error: "invalid date" });
      return;
    } else {
      const appointment = await appointmentModel.create({
        DoctorUsername: docUsername,
        DoctorName: doctor.Name,
        PatientUsername: Username,
        PatientName: patient.Name,
        Status: "Upcoming",
        FollowUp: true,
        Date: FollowUpDate,
        BookedBy: Username,
      });
    }

    request.Status = "Accepted";
    await request.save();
    res.status(200).json(request);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

const rejectFollowUp = async (req, res) => {
  const { Username, FollowUpDate } = req.body;
  const docUsername = req.user.Username;
  try {
    const request = await requestModel.findOneAndUpdate(
      {
        PatientUsername: Username,
        DoctorUsername: docUsername,
        Status: { $ne: "Rejected" },
      },
      { $set: { Status: "Rejected" } },
      { new: true }
    );
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDoctorInfo = async (req, res) => {
  try {
    var username = req.user.Username;
    const doctor = await doctorModel.findOne({ Username: username });
    const user = await systemUserModel.findOne({ Username: username });
    res.status(200).send({ doctor, user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// TODO: REGARDING ALL FUNCTIONS MAKE SURE THEY ARE WRAPPED IN TRY CATCH,

module.exports = {
  viewAllAvailableSlotsForMe,
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
  validateBookingDateDoctor,
  filterDoctorSlotEdition,
  getDoctorByUser,
  addMySlotsDoc,
  deleteMySlotsDoc,
  updateMySlotsDoc,
  viewUpcomingAppointmentsDoc,
  viewPastAppoitmentsDoc,
  viewAllAvailableSlots,
  viewMySlotsDoc,
  payDoctor,
  validateBookingDate,
  getPaymentAmount,
  getChatPatients,
  getDocUsernameSocket,
  acceptFollowUp,
  rejectFollowUp,
  getRequest,
  getRequests,
  getDoctorInfo,
};
