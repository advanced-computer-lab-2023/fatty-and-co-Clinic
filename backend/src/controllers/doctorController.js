const doctorModel = require("../models/doctors");
const appointmentModel = require("../models/appointments");
const prescriptionsModel = require("../models/prescriptions");
const patientModel = require("../models/patients");
const { default: mongoose } = require("mongoose");
const systemUserModel = require("../models/systemusers");
const packageModel = require("../models/packages");
const docSlotsModel = require("../models/docSlots");

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

// TODO: Make sure health record consists of appointments and prescriptions.
// View information and health records of a doctor's patient
const viewPatientInfoAndHealthRecords = async (req, res) => {
  const patientUsername = req.query.PatientUsername;
  const doctorUsername = req.query.DoctorUsername;
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

const filterDoctorSlotEdition = async (req, res) => {
  //TODO: Check if both end time and end Date required

  try {
    var filteredDoctors = new Array();

    await availableDocXSlots(req, res).then(async (elements) => {
      for (let element of elements) {
        if (await isDocAvailable(element)) filteredDoctors.push(element);
      }
    });
    res.status(200).json(filteredDoctors);
  } catch (error) {
    res.status(500).json(error);
  }
};

//this function returns the available slot(s) of all doctors
//based on the date&time range passed from the user
async function availableDocXSlots(req) {
  try {
    if (
      (req.body.startDate && req.body.endDate,
      req.body.startHour && req.body.endHour)
    ) {
      const startDate = new Date(req.body.startDate);
      const endDate = new Date(req.body.endDate);
      dayRange = findDayRangeFromDate(startDate, endDate);

      const startHour = parseInt(req.body.startHour);
      const endHour = parseInt(req.body.endHour);

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

//this function checks if A doctor in A slot is available
//by checking if he has no appointment in this slot or apt is cancelled, ..
async function isDocAvailable(docSlot) {
  try {
    const statusCheck = ["Upcoming", "Followup"];
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
      if ({ $expr: { $in: [docApts.Status, statusCheck] } }) {
        console.log("false");
        return false;
      }
    }
    console.log("true");
    return true;
  } catch (error) {
    console.log(error);
  }
}

async function checkFilterSpeciality() {}

const addMySlotsDoc = async (req, res) => {
  const { dayToAdd, startTimeToAdd } = req.body;
  const username = req.user.Username;
  const dayNumber = getDayNumberFromName(dayToAdd);
  try {
    await doctorModel.findOne({ Username: username }).then(async (value) => {
      //find the slots of this doctor that are in the same day using docId
      docSlotsModel
        .find({ DoctorId: value._id }, { WorkingDay: dayNumber })
        .then(async (elements) => {
          //check that no conflict between existing slots
          for (let element of elements) {
            //idk if this is error (status 500) or not.
            if (Math.abs(element.StartTime - startTime) <= 1);
            res.status(500).json(error);
          }
        });

      const newSlot = await docSlotsModel.create({
        WorkingDay: dayNumber,
        StartTime: startTimeToAdd,
        DoctorId: value._id,
      });
      res.status(200).json(newSlot);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//update will basically update the time on;y, if you want to update the day this
//means you delete it from the old day and insert a new one in the new day.
const updateMySlotsDoc = async (req, res) => {
  const { startTimeToUpdate, _idToUpdate } = req.body;

  try {
    const mySlot = docSlotsModel.findById(_idToUpdate);
    await docSlotsModel
      .find({ DoctorId: mySlot.DoctorId }, { WorkingDay: mySlot.WorkingDay })
      .then(async (elements) => {
        for (let element of elements) {
          if (
            Math.abs(element.StartTime - startTimeToUpdate) <= 1 &&
            element._id != _idToUpdate
          ) {
            res.status(500).json("can not update, conflict");
            return;
          }
        }
      });
    const newSlot = await docSlotsModel.findByIdAndUpdate(_idToUpdate, {
      $set: { StartTime: startTimeToUpdate },
    });
    res.status(200).json(newSlot);
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteMySlotsDoc = async (req, res) => {
  const { _idToDelete } = req.body;
  try {
    const docSlot = await docSlotsModel.findByIdAndDelete(_idToDelete);
    if (!docSlot) res.status(404).json("slot does not exist");
  } catch (error) {
    res.status(500).json(error);
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
    res.status(500).json(error);
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
    res.status(500).json(error);
  }
};

//the username of the doctor will be passed and added to the viewDoctorDetails page
const viewAllAvailableSlots = async (req, res) => {
  const { username } = req.params;
  try {
    const doctor = await doctorModel.find({ Username: username });
    const allDocSlots = await docSlotsModel.find({ DoctorId: doctor._id });
    res.status(200).json(allDocSlots);
  } catch (error) {
    res.status(500).json(error);
  }
};

//you need to pass the username as well if it is in a different page
//make the calendar thing validation greater than today
//TODO: THE ROUTE OF THIS METHOD WILL HAVE THE DOCTOR USERNAME IN THE URL;
const checkAptDateForBooking = async (req, res) => {
  //doctor Username ---> from URL
  const { username } = req.params;

  //patient Username --> from session
  const { patUsername } = req.user.Username;

  //TODO: check the local zone time thing
  //you need to pass all docSlot fields in  case it is a new page

  //the given date from the calendar
  const date = req.body;

  //slot fields from docSlot
  const { WorkingDay, startTime } = req.body;
  const curDate = new Date();

  try {
    if (date < curDate || date.getDay != WorkingDay)
      res.status(500).json("invalid date");
    else {
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
              { DoctorUsername: { $eq: username } },
              { aptDay: WorkingDay },
              { aptHour: startTime },
              { Status: { $in: ["Upcoming", "FollowUp"] } },
            ],
          },
        },
      ]);

      if (docApts.length != 0) {
        res.status(500).json("Can not book this appointment");
      } else {
        //TODO: make sure you have a create method that given a
        // patient username or doctor username it adds the right patientName & docName
        //and not the random generator
        const newApt = await appointmentModel.create({
          DoctorUsername: username,
          Date: date.setHours(startTime),
          PatientUsername: patUsername,
          Status: "Upcoming",
        });
        res.status(201).json(newApt);
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//TODO REGARDING ALL FUNCTIONS MAKE SURE THEY ARE WRAPPED IN TRY CATCH,

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
  filterDoctorSlotEdition,
  addMySlotsDoc,
  deleteMySlotsDoc,
  updateMySlotsDoc,
  viewUpcomingAppointmentsDoc,
  viewPastAppoitmentsDoc,
  viewAllAvailableSlots,
  checkAptDateForBooking,
};
