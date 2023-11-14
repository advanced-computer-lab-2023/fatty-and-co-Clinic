const { default: mongoose } = require("mongoose");
const systemUserModel = require("../models/systemusers");
const patientModel = require("../models/patients");
const userModel = require("../models/systemusers");
const subscriptionModel = require("../models/subscriptions");
const familyMemberModel = require("../models/familymembers");
const packageModel = require("../models/packages");
const doctorModel = require("../models/doctors");
const Patient = require("../models/patients");
const prescriptionModel = require("../models/prescriptions");
const { isNull } = require("util");
const { getPatients } = require("./testController");
const User = require("../models/systemusers");
const {
  findFiles,
  findFileByFilename,
  getFileByFilename,
} = require("../common/middleware/upload");

// const createPatient = async (req, res) => {
//   const {
//     Username,
//     Name,
//     Password,
//     Email,
//     MobileNum,
//     DateOfBirth,
//     Gender,
//     EmergencyContactNumber,
//     EmergencyContactName
//   } = req.body;
//   try {
//     const user = await userModel.addEntry(Username, Password, Email, "Patient");
//     const patient = await patientModel.create({
//       Username: Username,
//       Name: Name,
//       MobileNum: MobileNum,
//       DateOfBirth: DateOfBirth,
//       Gender: Gender,
//       EmergencyContact: {
//         FullName: EmergencyContactName,
//         PhoneNumber: EmergencyContactNumber,
//       },
//     });
//     res.status(200).send({ patient, user });
//   } catch (error) {
//     res.status(400).send({ message: error.message });
//   }
// };

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find();
    res.status(200).send({ patients });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//a function to get the details of the emergency contact of a patient by patient username
const getEmergencyContact = async (req, res) => {
  try {
    const { Username } = req.params;
    const patient = await patientModel.findOne({ Username: Username });

    if (!patient) {
      res.status(404).send({ message: "Patient not found." });
      return;
    }

    const EmergencyContact = patient.EmergencyContact;
    const Name = patient.Name;
    if (!EmergencyContact) {
      res
        .status(404)
        .send({ message: "Emergency contact not found for the patient." });
      return;
    }

    res.status(200).send({ EmergencyContact });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//find patient by id
const getPatient = async (req, res) => {
  try {
    const patient = await patientModel.findById(req.params.id);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//find patient by username
const getPatientUsername = async (req, res) => {
  try {
    const { Username } = req.params;
    const patient = await patientModel.find({ Username: Username });
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// I think this is useless?
// if not useless it needs to delete from user model, apppointments, etc just like in admin controller
const deletePatient = async (req, res) => {
  try {
    const patient = await patientModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const downloadFile = async (req, res) => {
  const { filename } = req.params;
  const downloadStream = await getFileByFilename(filename);
  downloadStream.pipe(res);
};

const removeHealthRecord = async (req, res) => {
  const { filename } = req.params;
  const user = req.user.Username;
  await patientModel.findOneAndUpdate(
    { Username: user },
    { $pull: { MedicalHistory: { filename: filename } } }
  );
  res.status(200).send({ message: "File removed successfully" });
};

// TODO: REVISE THIS IF IT'S ACTUALLY USED
const updatePatient = async (req, res) => {
  try {
    const patient = await patientModel.findOneAndUpdate(
      { Username: req.user.Username },
      req.body,
      { new: true }
    );
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// view all doctors with speciality and session price
const session_index = async (req, res) => {
  const { Name, Speciality } = req.query;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "Invalid ID" });
  // }

  try {
    const query = {
      ...(Name ? { Name: { $regex: Name.trim(), $options: "i" } } : {}),
      ...(Speciality
        ? { Speciality: { $regex: Speciality.trim(), $options: "i" } }
        : {}),
    };

    const doctors = await doctorModel.find(query);
    const discount = await getPackageDiscount(req.user.Username);
    const famDiscount = await getPackageFamDiscount((req.user.Username));

    const mySessions = doctors.map((doctor) => {
      return {
        Username: doctor.Username,
        Name: doctor.Name,
        Speciality: doctor.Speciality,
        Cost: getSessionPrice(doctor.HourlyRate, discount).toFixed(2),
        CostFam: getSessionPrice(doctor.HourlyRate, famDiscount).toFixed(2),

      };
    });

    res.status(200).json(mySessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
  if (
    subscription &&
    subscription.Status === "Subscribed" &&
    subscription.Package
  ) {
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
const viewHealthFam = async (req, res) => {
  try {
    //changed this
    const username = req.user.Username;
    const Patient = await patientModel.findOne({ Username: username });
    const famMems = await familyMemberModel
      .find({ $or: [{ Patient: Patient }, { FamilyMem: Patient }] })
      .populate("Patient")
      .populate("FamilyMem");
    //check eno family mem mesh user
    const package = await Promise.all(
      famMems.map(async (famMember) => {
        const value = await patientModel.findOne({
          Username: famMember.Patient.Username,
        });
        const subscription =
          famMember.FamilyMem != null
            ? await subscriptionModel
                .findOne({
                  Patient:
                    famMember.FamilyMem.Username === username
                      ? value
                      : famMember.FamilyMem,
                  Status: "Subscribed",
                })
                .populate("Patient")
                .populate("FamilyMem")
                .populate("Package")
            : await subscriptionModel
                .findOne({ FamilyMem: famMember, Status: "Subscribed" })
                .populate("Patient")
                .populate("FamilyMem")
                .populate("Package");
        if (subscription && subscription.Status === "Subscribed") {
          return subscription; // Add the family member to the result if subscribed
        } // Or you can handle differently for non-subscribed members
      })
    );
    res.status(200).json(package);
  } catch {
    res.json(404).json({ error: "No family members are subscribed" });
  }
};

const viewOptionPackages = async (req, res) => {
  try {
    const packages = await packageModel.find({});
    res.status(200).json(packages);
  } catch (error) {
    res.status(400).send("Cannot find it");
  }
};

const payForSubscription = async (req, res) => {
  try {
    const curr_user = req.user.Username;
    const patient = await patientModel.findOne({ Username: curr_user });
    const { PackageName } = req.body;
    const Package = await packageModel.findOne({ Name: PackageName });
    const patSubscription = await subscriptionModel
      .findOne({ Patient: patient })
      .populate("Package");
    if (!Package) {
      res.status(404).send({ error: "Invalid package name!" });
      return;
    }
    const patientRelatives = await familyMemberModel
      .find({
        $or: [
          { Patient: patient, FamilyMem: { $ne: null } },
          { FamilyMem: patient },
        ],
      })
      .populate("Patient")
      .populate("FamilyMem");
    var max = 0;
    for (let i = 0; i < patientRelatives.length; i++) {
      const value =
        patientRelatives[i].Patient.Username === curr_user
          ? await subscriptionModel
              .findOne({ Patient: patientRelatives[i].FamilyMem })
              .populate("Package")
              .populate("Patient")
          : await subscriptionModel
              .findOne({ Patient: patientRelatives[i].Patient })
              .populate("Package")
              .populate("Patient");
      if (
        value &&
        value.Status === "Subscribed" &&
        value.Package.Family_Discount > max
      ) {
        max = value.Package.Family_Discount;
      }
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`; // currentDate
    const enddate = new Date();
    const year1 = enddate.getFullYear() + 1;
    const month1 = String(enddate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day1 = String(enddate.getDate()).padStart(2, "0");
    const formattedDate1 = `${year1}-${month1}-${day1}`; //EndDate if subscribed
    const enddate1 = new Date();
    const year11 = enddate1.getFullYear() + 1;
    const month11 = String(enddate1.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day11 = String(enddate1.getDate()).padStart(2, "0");

    const formattedDate11 = `${year11}-${month11}-${day11}`; // subscribed end date awel mara

    const renewaldate = new Date();
    const year2 = renewaldate.getFullYear() + 1;
    const month2 = String(renewaldate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day2 = String(renewaldate.getDate() + 1).padStart(2, "0");
    const formattedDate2 = `${year2}-${month2}-${day2}`; // Renewal gdedd in genreal
    // formatting subscription start date to compare
    const startCheck = new Date(patSubscription.Startdate);
    const year3 = startCheck.getFullYear();
    const month3 = String(startCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day3 = String(startCheck.getDate()).padStart(2, "0");
    const formattedDate3 = `${year3}-${month3}-${day3}`; // start subscribition existeing
    const renewCheck = new Date(patSubscription.Renewaldate);
    const year4 = renewCheck.getFullYear();
    const month4 = String(renewCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day4 = String(renewCheck.getDate()).padStart(2, "0");
    const formattedDate4 = `${year4}-${month4}-${day4}`; //Renewal Date if akready subscribed
    const year5 = renewCheck.getFullYear() + 1;
    const month5 = String(renewCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day5 = String(renewCheck.getDate()).padStart(2, "0");
    const formattedDate5 = `${year5}-${month5}-${day5}`; // renewal Date el gdeda
    const amount = Package.Price - Package.Price * (max / 100);
    //  console.log(patSubscription.Status==="Unsubscribed"||patSubscription.Status==="Cancelled");
    //  console.log(patSubscription.Status==="Subscribed" && formattedDate===formattedDate4 && patSubscription.Package.Name
    //  ===Package.Name)
    if (
      patSubscription.Status === "Unsubscribed" ||
      patSubscription.Status === "Cancelled"
    ) {
      if (patient.Wallet > amount) {
        const updatePat = await patientModel.findOneAndUpdate(
          { Username: curr_user },
          { Wallet: patient.Wallet - amount }
        );

        const patient12 = await subscriptionModel.findOneAndUpdate(
          { Patient: patient },
          {
            Package: Package,
            Status: "Subscribed",
            Startdate: formattedDate,
            Renewaldate: formattedDate2,
            Enddate: formattedDate11,
          }
        );
        res.status(200).json(updatePat);
      } else {
        res.status(404).json({ error: "Not enough money" });
      }
    } else if (
      patSubscription.Status === "Subscribed" &&
      formattedDate === formattedDate4 &&
      patSubscription.Package.Name === PackageName
    ) {
      if (patient.Wallet > amount) {
        const updatePat = await patientModel.findOneAndUpdate(
          { Username: curr_user },
          { Wallet: patient.Wallet - amount }
        );
        const patient12 = await subscriptionModel.findOneAndUpdate(
          { Patient: patient },
          {
            Package: Package,
            Status: "Subscribed",
            Startdate: formattedDate,
            Renewaldate: formattedDate2,
            Enddate: formattedDate11,
          }
        );
        res.status(200).json(updatePat);
      } else {
        const updateRenewal = await subscriptionModel.findOneAndUpdate(
          { Patient: patient },
          {
            Status: "Cancelled",
            Renewaldate: formattedDate5,
            Enddate: formattedDate1,
          }
        );
        res.status(404).json({ error: "Not enough money" });
      }
    } else if (
      patSubscription.Status === "Subscribed" &&
      patSubscription.Package.Name !== PackageName
    ) {
      res.status(404).json({
        error:
          "If you want to subscribe to the " +
          PackageName +
          " package, make sure to cancel your " +
          patSubscription.Package.Name +
          " subscription first!",
      });
    } else if (
      patSubscription.Status === "Subscribed" &&
      patSubscription.Package.Name == PackageName
    ) {
      res.status(404).json({ error: "Already Paid for subscription!" });
    } else {
      res.status(404).json({ error: "Failed to subscribing " });
    }
  } catch {
    res.status(400).send({ error: "Failed to pay" });
  }
};

const getAmountSubscription = async (req, res) => {
  try {
    const curr_user = req.user.Username;
    const patient = await patientModel.findOne({ Username: curr_user });
    const { PackageName } = req.body;
    const Package = await packageModel.findOne({ Name: PackageName });
    const patSubscription = await subscriptionModel
      .findOne({ Patient: patient })
      .populate("Package");
    if (!Package) {
      res.status(404).send({ error: "Invalid package name!" });
      return;
    }
    const patientRelatives = await familyMemberModel
      .find({
        $or: [
          { Patient: patient, FamilyMem: { $ne: null } },
          { FamilyMem: patient },
        ],
      })
      .populate("Patient")
      .populate("FamilyMem");
    var max = 0;
    for (let i = 0; i < patientRelatives.length; i++) {
      const value =
        patientRelatives[i].Patient.Username === curr_user
          ? await subscriptionModel
              .findOne({ Patient: patientRelatives[i].FamilyMem })
              .populate("Package")
              .populate("Patient")
          : await subscriptionModel
              .findOne({ Patient: patientRelatives[i].Patient })
              .populate("Package")
              .populate("Patient");
      if (
        value &&
        value.Status === "Subscribed" &&
        value.Package.Family_Discount > max
      ) {
        max = value.Package.Family_Discount;
      }
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`; // currentDate
    const enddate = new Date();
    const year1 = enddate.getFullYear() + 1;
    const month1 = String(enddate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day1 = String(enddate.getDate()).padStart(2, "0");
    const formattedDate1 = `${year1}-${month1}-${day1}`; //EndDate if subscribed
    const enddate1 = new Date();
    const year11 = enddate1.getFullYear() + 1;
    const month11 = String(enddate1.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day11 = String(enddate1.getDate()).padStart(2, "0");

    const formattedDate11 = `${year11}-${month11}-${day11}`; // subscribed end date awel mara

    const renewaldate = new Date();
    const year2 = renewaldate.getFullYear() + 1;
    const month2 = String(renewaldate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day2 = String(renewaldate.getDate() + 1).padStart(2, "0");
    const formattedDate2 = `${year2}-${month2}-${day2}`; // Renewal gdedd in genreal
    // formatting subscription start date to compare
    const startCheck = new Date(patSubscription.Startdate);
    const year3 = startCheck.getFullYear();
    const month3 = String(startCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day3 = String(startCheck.getDate()).padStart(2, "0");
    const formattedDate3 = `${year3}-${month3}-${day3}`; // start subscribition existeing
    const renewCheck = new Date(patSubscription.Renewaldate);
    const year4 = renewCheck.getFullYear();
    const month4 = String(renewCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day4 = String(renewCheck.getDate()).padStart(2, "0");
    const formattedDate4 = `${year4}-${month4}-${day4}`; //Renewal Date if akready subscribed
    const year5 = renewCheck.getFullYear() + 1;
    const month5 = String(renewCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day5 = String(renewCheck.getDate()).padStart(2, "0");
    const formattedDate5 = `${year5}-${month5}-${day5}`; // renewal Date el gdeda
    const amount = Package.Price - Package.Price * (max / 100);

    if (
      patSubscription.Status === "Unsubscribed" ||
      patSubscription.Status === "Cancelled"
    ) {
      res.status(200).json({
        amount: amount,
        description: "Subscription payment",
        PackageName: PackageName,
      });
    } else if (
      patSubscription.Status === "Subscribed" &&
      formattedDate === formattedDate4 &&
      patSubscription.Package.Name === Package.Name
    ) {
      res.status(200).json({
        amount: amount,
        description: "Subscription payment",
        PackageName: PackageName,
      });
    } else if (
      patSubscription.Status === "Subscribed" &&
      patSubscription.Package.Name !== PackageName
    ) {
      res.status(404).json({
        error:
          "If you want to subscribe to the " +
          PackageName +
          " package, make sure to cancel your " +
          patSubscription.Package.Name +
          " subscription first!",
      });
    } else if (
      patSubscription.Status === "Subscribed" &&
      patSubscription.Package.Name == PackageName
    ) {
      res.status(404).json({ error: "Already Paid for subscription!" });
    } else {
      res.status(404).json({ error: "Failed to subscribing " });
    }
  } catch {
    res.status(400).send({ error: "Failed to pay" });
  }
};

const updateSubscription = async (req, res) => {
  try {
    const curr_user = req.user.Username;
    const patient = await patientModel.findOne({ Username: curr_user });
    const { PackageName } = req.body;
    const Package = await packageModel.findOne({ Name: PackageName });
    const patSubscription = await subscriptionModel
      .findOne({ Patient: patient })
      .populate("Package");
    if (!Package) {
      res.status(404).send({ error: "Invalid package name!" });
      return;
    }
    const patientRelatives = await familyMemberModel
      .find({
        $or: [
          { Patient: patient, FamilyMem: { $ne: null } },
          { FamilyMem: patient },
        ],
      })
      .populate("Patient")
      .populate("FamilyMem");
    var max = 0;
    for (let i = 0; i < patientRelatives.length; i++) {
      const value =
        patientRelatives[i].Patient.Username === curr_user
          ? await subscriptionModel
              .findOne({ Patient: patientRelatives[i].FamilyMem })
              .populate("Package")
              .populate("Patient")
          : await subscriptionModel
              .findOne({ Patient: patientRelatives[i].Patient })
              .populate("Package")
              .populate("Patient");
      if (
        value &&
        value.Status === "Subscribed" &&
        value.Package.Family_Discount > max
      ) {
        max = value.Package.Family_Discount;
      }
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`; // currentDate
    const enddate = new Date();
    const year1 = enddate.getFullYear() + 1;
    const month1 = String(enddate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day1 = String(enddate.getDate()).padStart(2, "0");
    const formattedDate1 = `${year1}-${month1}-${day1}`; //EndDate if subscribed
    const enddate1 = new Date();
    const year11 = enddate1.getFullYear() + 1;
    const month11 = String(enddate1.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day11 = String(enddate1.getDate()).padStart(2, "0");

    const formattedDate11 = `${year11}-${month11}-${day11}`; // subscribed end date awel mara

    const renewaldate = new Date();
    const year2 = renewaldate.getFullYear() + 1;
    const month2 = String(renewaldate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day2 = String(renewaldate.getDate() + 1).padStart(2, "0");
    const formattedDate2 = `${year2}-${month2}-${day2}`; // Renewal gdedd in genreal
    // formatting subscription start date to compare
    const startCheck = new Date(patSubscription.Startdate);
    const year3 = startCheck.getFullYear();
    const month3 = String(startCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day3 = String(startCheck.getDate()).padStart(2, "0");
    const formattedDate3 = `${year3}-${month3}-${day3}`; // start subscribition existeing
    const renewCheck = new Date(patSubscription.Renewaldate);
    const year4 = renewCheck.getFullYear();
    const month4 = String(renewCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day4 = String(renewCheck.getDate()).padStart(2, "0");
    const formattedDate4 = `${year4}-${month4}-${day4}`; //Renewal Date if akready subscribed
    const year5 = renewCheck.getFullYear() + 1;
    const month5 = String(renewCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day5 = String(renewCheck.getDate()).padStart(2, "0");
    const formattedDate5 = `${year5}-${month5}-${day5}`; // renewal Date el gdeda
    const amount = Package.Price - Package.Price * (max / 100);

    if (
      patSubscription.Status === "Unsubscribed" ||
      patSubscription.Status === "Cancelled"
    ) {
      const patient12 = await subscriptionModel.findOneAndUpdate(
        { Patient: patient },
        {
          Package: Package,
          Status: "Subscribed",
          Startdate: formattedDate,
          Renewaldate: formattedDate2,
          Enddate: formattedDate11,
        }
      );
      res.status(200).json("Subscription payment proceeded successfully!");
    } else if (
      patSubscription.Status === "Subscribed" &&
      formattedDate === formattedDate4 &&
      patSubscription.Package.Name === PackageName
    ) {
      const patient12 = await subscriptionModel.findOneAndUpdate(
        { Patient: patient },
        {
          Package: Package,
          Status: "Subscribed",
          Startdate: formattedDate,
          Renewaldate: formattedDate2,
          Enddate: formattedDate11,
        }
      );
      res.status(200).json("Subscription payment proceeded successfully!");
    } else {
      res.status(404).json({ error: "Failed to subscribe!" });
    }
  } catch {
    res.status(400).send({ error: "Failed to pay" });
  }
};

const payForFamSubscription = async (req, res) => {
  try {
    const curr_user = req.user.Username;
    const { PackageName, NationalId } = req.body;
    const Package = await packageModel.findOne({ Name: PackageName });
    const patient = await patientModel.findOne({ Username: curr_user });
    const relative = await familyMemberModel
      .findOne({ Patient: patient, NationalId: NationalId })
      .populate("Patient")
      .populate("FamilyMem");
    const subscription = await subscriptionModel
      .findOne({ FamilyMem: relative })
      .populate("Package")
      .populate("FamilyMem");
    const patSubscription = await subscriptionModel
      .findOne({ Patient: patient })
      .populate("Patient")
      .populate("Package");
    if (!Package) {
      res.status(404).send({ error: "Invalid package name!" });
      return;
    }
    if (relative == null) {
      res.status(400).send({ error: "Wrong National Id or not relative!" });
      return;
    } else if (relative.FamilyMem != null) {
      res
        .status(400)
        .send({ error: "Cannot subscribe for another system user!" });
    } else {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      // current Date
      const enddate = new Date();
      const year1 = enddate.getFullYear() + 1;
      const month1 = String(enddate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day1 = String(enddate.getDate()).padStart(2, "0");

      const formattedDate1 = `${year1}-${month1}-${day1}`;
      // End date lw m4 subscribed
      const renewaldate = new Date();
      const year2 = renewaldate.getFullYear() + 1;
      const month2 = String(renewaldate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day2 = String(renewaldate.getDate() + 1).padStart(2, "0");
      const formattedDate2 = `${year2}-${month2}-${day2}`;
      // Renewal date m4 subscribes
      const renewCheck = new Date(subscription.Renewaldate);
      const year4 = renewCheck.getFullYear();
      const month4 = String(renewCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day4 = String(renewCheck.getDate()).padStart(2, "0");
      const formattedDate4 = `${year4}-${month4}-${day4}`;
      const year5 = renewCheck.getFullYear() + 1;
      const formattedDate5 = `${year5}-${month4}-${day4}`;
      // Renewal data subscriubed
      const enddate2 = new Date(subscription.Enddate);
      const year12 = enddate2.getFullYear() + 1;
      const month12 = String(enddate2.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day12 = String(enddate2.getDate()).padStart(2, "0");

      const formattedDate12 = `${year12}-${month12}-${day12}`;
      const max =
        patSubscription.Package != null &&
        patSubscription.Status === "Subscribed"
          ? Package.Price * (patSubscription.Package.Family_Discount / 100)
          : 0;
      const amount = Package.Price - max;

      if (
        subscription.Status === "Subscribed" &&
        formattedDate === formattedDate4 &&
        subscription.Package.Name == PackageName
      ) {
        if (patient.Wallet > amount) {
          const patient12 = await subscriptionModel.findOneAndUpdate(
            { FamilyMem: relative },
            {
              Package: Package,
              Status: "Subscribed",
              Startdate: formattedDate,
              Renewaldate: formattedDate5,
              Enddate: formattedDate12,
            }
          );
          const updatePat = await patientModel.findOneAndUpdate(
            { Username: curr_user },
            { Wallet: patient.Wallet - amount }
          );
          res.status(200).json(updatePat);
        } else {
          const updateRenewal = await subscriptionModel.findOneAndUpdate(
            { FamilyMem: relative },
            { Status: "Cancelled", Enddate: formattedDate, Renewaldate: null }
          );
          res.status(200).json(updateRenewal);
        }
      } else if (
        subscription.Status === "Unsubscribed" ||
        subscription.Status === "Cancelled"
      ) {
        if (patient.Wallet > amount) {
          const updatePat = await patientModel.findOneAndUpdate(
            { Username: curr_user },
            { Wallet: patient.Wallet - amount }
          );

          const patient12 = await subscriptionModel.findOneAndUpdate(
            { FamilyMem: relative },
            {
              Package: Package,
              Status: "Subscribed",
              Startdate: formattedDate,
              Renewaldate: formattedDate2,
              Enddate: formattedDate1,
            }
          );
          res.status(200).json(updatePat);
        } else {
          res.status(404).json({ error: "Not enough money" });
        }
      } else if (
        subscription.Status === "Subscribed" &&
        subscription.Package.Name !== PackageName
      ) {
        res.status(404).json({
          error:
            "If you want to subscribe " +
            relative.Name +
            " to the " +
            PackageName +
            " package, make sure to cancel the " +
            subscription.Package.Name +
            " subscription first!",
        });
      } else if (
        subscription.Status === "Subscribed" &&
        subscription.Package.Name == PackageName
      ) {
        res.status(404).json({ error: "Already paid for subscription!" });
      } else {
        res.status(404).json({ error: "Failed to subscribe! " });
      }
    }
  } catch {
    res.status(400).send({ error: "Failed to subscribe!" });
  }
};

const getAmountFam = async (req, res) => {
  try {
    const curr_user = req.user.Username;
    const { PackageName, NationalId } = req.body;
    const Package = await packageModel.findOne({ Name: PackageName });
    const patient = await patientModel.findOne({ Username: curr_user });
    const relative = await familyMemberModel
      .findOne({ Patient: patient, NationalId: NationalId })
      .populate("Patient")
      .populate("FamilyMem");
    const subscription = await subscriptionModel
      .findOne({ FamilyMem: relative })
      .populate("Package")
      .populate("FamilyMem");
    const patSubscription = await subscriptionModel
      .findOne({ Patient: patient })
      .populate("Patient")
      .populate("Package");

    if (!Package) {
      res.status(404).send({ error: "Invalid package name!" });
    }
    if (!relative) {
      res.status(400).send({ error: "Wrong National Id or not relative!" });
    } else if (relative.FamilyMem) {
      res
        .status(400)
        .send({ error: "Cannot subscribe for another system user!" });
    } else {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      // current Date
      const enddate = new Date();
      const year1 = enddate.getFullYear() + 1;
      const month1 = String(enddate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day1 = String(enddate.getDate()).padStart(2, "0");

      const formattedDate1 = `${year1}-${month1}-${day1}`;
      // End date lw m4 subscribed
      const renewaldate = new Date();
      const year2 = renewaldate.getFullYear() + 1;
      const month2 = String(renewaldate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day2 = String(renewaldate.getDate() + 1).padStart(2, "0");
      const formattedDate2 = `${year2}-${month2}-${day2}`;
      // Renewal date m4 subscribes
      const renewCheck = new Date(subscription.Renewaldate);
      const year4 = renewCheck.getFullYear();
      const month4 = String(renewCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day4 = String(renewCheck.getDate()).padStart(2, "0");
      const formattedDate4 = `${year4}-${month4}-${day4}`;
      const year5 = renewCheck.getFullYear() + 1;
      const formattedDate5 = `${year5}-${month4}-${day4}`;
      // Renewal data subscriubed
      const enddate2 = new Date(subscription.Enddate);
      const year12 = enddate2.getFullYear() + 1;
      const month12 = String(enddate2.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day12 = String(enddate2.getDate()).padStart(2, "0");

      const formattedDate12 = `${year12}-${month12}-${day12}`;
      const max =
        patSubscription.Package != null &&
        patSubscription.Status === "Subscribed"
          ? Package.Price * (patSubscription.Package.Family_Discount / 100)
          : 0;
      const amount = Package.Price - max;

      if (
        subscription.Status === "Subscribed" &&
        formattedDate === formattedDate4 &&
        subscription.Package.Name == PackageName
      ) {
        res.status(200).json({
          amount: amount,
          description: "Subscription payment",
          PackageName: PackageName,
          NationalId: NationalId,
        });
      } else if (
        subscription.Status === "Unsubscribed" ||
        subscription.Status === "Cancelled"
      ) {
        res.status(200).json({
          amount: amount,
          description: "Subscription payment",
          PackageName: PackageName,
          NationalId: NationalId,
        });
      } else if (
        subscription.Status === "Subscribed" &&
        subscription.Package.Name !== Package.Name
      ) {
        res.status(404).json({
          error:
            "If you want to subscribe " +
            relative.Name +
            " to the " +
            PackageName +
            " package, make sure to cancel the " +
            subscription.Package.Name +
            " subscription first!",
        });

        s;
      } else if (
        subscription.Status === "Subscribed" &&
        subscription.Package.Name == Package.Name
      ) {
        res.status(404).json({ error: "Already paid for subscription!" });
      } else {
        res.status(404).json({ error: "Failed to subscribe! " });
      }
    }
  } catch {
    res.status(400).send({ error: "Failed to subscribe!" });
  }
};

const viewHealthPackage = async (req, res) => {
  try {
    const current_user = req.user.Username; //changed this
    const patient = await patientModel.findOne({ Username: current_user });
    const subscription = await subscriptionModel
      .findOne({ Patient: patient, Status: "Subscribed" })
      .populate("Patient")
      .populate("Package");
    if (subscription) {
      const myPackage = subscription.Package;
      res.status(200).send(myPackage);
    } else {
      res.status(404).send({ Error: "Cannot find any current subscriptions!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const viewHealthPackagewithstatus = async (req, res) => {
  try {
    const current_user = req.user.Username;
    const patient = await patientModel.findOne({ Username: current_user });

    if (!patient) {
      return res.status(404).send({ Error: "Patient not found!" });
    }

    const subscription = await subscriptionModel
      .findOne({ Patient: patient }) // Include the fields you want from the 'subscriptionModel'
      .populate("Patient")
      .populate("FamilyMem")
      .populate("Package");
    if (subscription) {
      res.status(200).send(subscription);
    } else {
      res
        .status(404)
        .send({ Error: "Cannot find any current subscribed subscription!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const viewHealthFamwithstatus = async (req, res) => {
  try {
    //changed this
    const username = req.user.Username;
    const Patient = await patientModel.findOne({ Username: username });
    const famMems = await familyMemberModel
      .find({ $or: [{ Patient: Patient }, { FamilyMem: Patient }] })
      .populate("Patient")
      .populate("FamilyMem");

    //check eno family mem mesh user
    const package = await Promise.all(
      famMems.map(async (famMember) => {
        const value = await patientModel.findOne({
          Username: famMember.Patient.Username,
        });
        const subscription =
          famMember.FamilyMem != null
            ? await subscriptionModel
                .findOne({
                  Patient:
                    famMember.FamilyMem.Username === username
                      ? value
                      : famMember.FamilyMem,
                })
                .populate("Patient")
                .populate("FamilyMem")
                .populate("Package")
            : await subscriptionModel
                .findOne({ FamilyMem: famMember })
                .populate("Patient")
                .populate("FamilyMem")
                .populate("Package");

        if (subscription) {
          return subscription; // Add the family member to the result if subscribed
        } // Or you can handle differently for non-subscribed members
      })
    );
    // console.log()
    res.status(200).json(package);
  } catch {
    res.json(404).json({ error: "No family members are subscribed" });
  }
};
//hi khalkhoola

const createFamilymember = async (req, res) => {
  const { FamilyMemberUsername, Name, NationalId, Age, Gender, Relation } =
    req.body;
  const Createparameter = req.user.Username;

  // Check if the national ID is not 16.
  if (NationalId.length !== 16) {
    // Return an error message.
    res.status(400).json({ error: "The national ID must be 16 digits long." });
    return;
  }
  // check if age are only 2 digitd
  if (Age.length === 0 || Age.length > 2 || Age == 0) {
    // Return an error message.
    res.status(400).json({ error: "The age must be 1 or 2 digits" });
    return;
  }
  try {
    const findPatientRel = await patientModel.findOne({
      Username: FamilyMemberUsername,
    });
    const findPatientMain = await patientModel.findOne({
      Username: Createparameter,
    });
    const newFamilymember = await familyMemberModel.create({
      Patient: findPatientMain,
      FamilyMem: findPatientRel,
      FamilyMemberUsername: FamilyMemberUsername,
      Name: Name,
      NationalId: NationalId,
      Age: Age,
      Gender: Gender,
      Relation: Relation,
    });

    //test de tany
    if (findPatientRel == null) {
      await subscriptionModel.addEntry1(newFamilymember);
      res.status(200).json(newFamilymember);
    } else {
      res.status(200).json(newFamilymember);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateFamCredit = async (req, res) => {
  try {
    const curr_user = req.user.Username;
    const { PackageName, NationalId } = req.body;
    const Package = await packageModel.findOne({ Name: PackageName });
    const patient = await patientModel.findOne({ Username: curr_user });
    const relative = await familyMemberModel
      .findOne({ Patient: patient, NationalId: NationalId })
      .populate("Patient")
      .populate("FamilyMem");
    const subscription = await subscriptionModel
      .findOne({ FamilyMem: relative })
      .populate("Package")
      .populate("FamilyMem");
    const patSubscription = await subscriptionModel
      .findOne({ Patient: patient })
      .populate("Patient")
      .populate("Package");
    if (!Package) {
      res.status(404).send({ error: "Invalid package name!" });
    }
    if (relative == null) {
      res.status(400).send({ error: "Wrong National Id or not relative!" });
    } else if (relative.FamilyMem != null) {
      res
        .status(400)
        .send({ error: "Cannot subscribe for another system user!" });
    } else {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(currentDate.getDate()).padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      // current Date
      const enddate = new Date();
      const year1 = enddate.getFullYear() + 1;
      const month1 = String(enddate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day1 = String(enddate.getDate()).padStart(2, "0");

      const formattedDate1 = `${year1}-${month1}-${day1}`;
      // End date lw m4 subscribed
      const renewaldate = new Date();
      const year2 = renewaldate.getFullYear() + 1;
      const month2 = String(renewaldate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day2 = String(renewaldate.getDate() + 1).padStart(2, "0");
      const formattedDate2 = `${year2}-${month2}-${day2}`;
      // Renewal date m4 subscribes
      const renewCheck = new Date(subscription.Renewaldate);
      const year4 = renewCheck.getFullYear();
      const month4 = String(renewCheck.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day4 = String(renewCheck.getDate()).padStart(2, "0");
      const formattedDate4 = `${year4}-${month4}-${day4}`;
      const year5 = renewCheck.getFullYear() + 1;
      const formattedDate5 = `${year5}-${month4}-${day4}`;
      // Renewal data subscriubed
      const enddate2 = new Date(subscription.Enddate);
      const year12 = enddate2.getFullYear() + 1;
      const month12 = String(enddate2.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day12 = String(enddate2.getDate()).padStart(2, "0");

      const formattedDate12 = `${year12}-${month12}-${day12}`;
      const max =
        patSubscription.Package != null &&
        patSubscription.Status === "Subscribed"
          ? Package.Price * (patSubscription.Package.Family_Discount / 100)
          : 0;
      const amount = Package.Price - max;

      if (
        subscription.Status === "Subscribed" &&
        formattedDate === formattedDate4 &&
        subscription.Package.Name == Package.Name
      ) {
        const patient12 = await subscriptionModel.findOneAndUpdate(
          { FamilyMem: relative },
          {
            Package: Package,
            Status: "Subscribed",
            Renewaldate: formattedDate5,
            Enddate: formattedDate12,
          }
        );

        res
          .status(200)
          .json("Payment for subscription completed successfully!");
      } else if (
        subscription.Status === "Unsubscribed" ||
        subscription.Status === "Cancelled"
      ) {
        const patient12 = await subscriptionModel.findOneAndUpdate(
          { FamilyMem: relative },
          {
            Package: Package,
            Status: "Subscribed",
            Startdate: formattedDate,
            Renewaldate: formattedDate2,
            Enddate: formattedDate1,
          }
        );
        res
          .status(200)
          .json("Payment for subscription completed successfully!");
      }
    }
  } catch {
    res.status(400).send({ error: "Failed to subscribe!" });
  }
};

const getWalletAmount = async (req, res) => {
  try {
    var patient = await patientModel.findOne({ Username: req.user.Username });
    if (!patient) {
      var patient = await doctorModel.findOne({ Username: req.user.Username });
    }
    if (patient) {
      res.status(200).json({ Wallet: patient.Wallet });
    } else {
      res.status(404).json({ error: "Cannot find wallet" });
    }
  } catch {
    res.status(404).json({ error: "Error occured while fetching amount" });
  }
};

const getFamilymembers = async (req, res) => {
  try {
    const Username = req.user.Username;
    const patient = await patientModel.findOne({ Username: Username }); //changed this
    const fam = await familyMemberModel
      .find({ $or: [{ Patient: patient }, { FamilyMem: patient }] })
      .populate("Patient")
      .populate("FamilyMem");
    res.status(200).send(fam);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const selectPatient = async (req, res) => {
  const id = req.query.id;

  // Get the patient.
  const patient = await patientModel.findById(id);

  // If the patient is not found, return a 404 error.
  if (!patient) {
    res.status(404).send("Patient not found.");
    return;
  }

  // Remove the timestamp from the patient object.
  delete patient.createdAt;
  delete patient.updatedAt;

  // Return the patient object.
  res.status(200).send(patient);
};

// Get prescriptions of a given patient. Can also be filtered
// using `DoctorUsername` or `Date` or `Status`.
const getPrescriptions = async (req, res) => {
  const query = req.query;
  // console.log(query);
  const patientUsername = query.PatientUsername; // Extract patientUsername
  // console.log(req.params.patientUsername);

  try {
    const baseQuery = { PatientUsername: patientUsername };
    const regexQuery = {};

    if (query.DoctorName) {
      regexQuery.DoctorName = new RegExp(query.DoctorName, "i");
    }
    if (query.Date) {
      const date = new Date(query.Date);
      const nextDay = date.addDays(1);
      regexQuery.Date = {
        $gte: date,
        $lt: nextDay,
      };
    }
    if (query.Status) {
      regexQuery.Status = query.Status;
    }

    const patientPrescriptions = await prescriptionModel.find({
      ...baseQuery,
      ...regexQuery,
    });

    res.status(200).send(patientPrescriptions);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// Use prescription Id to select a prescription.
const selectPrescription = async (req, res) => {
  const prescriptionId = req.query.id;
  try {
    const prescription = await prescriptionModel.findById(prescriptionId);
    res.status(200).send(prescription);
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const subscribepackagefamilymem = async (req, res) => {
  try {
    const Startdate = new Date();

    const year = Startdate.getFullYear();
    const month = String(Startdate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(Startdate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    const enddate = new Date();

    const year1 = enddate.getFullYear() + 1;
    const month1 = String(enddate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day1 = String(enddate.getDate()).padStart(2, "0");

    const formattedDate1 = `${year1}-${month1}-${day1}`;
    const day3 = String(enddate.getDate() + 1).padStart(2, "0");
    const formattedDate3 = `${year1}-${month1}-${day3}`;
    const PatientUsername = req.user.Username; //changed this
    const Patient = await patientModel.findOne({ Username: PatientUsername });
    // console.log(Patient) //changed this
    const { NationalId, PackageName } = req.body;
    const Package = await packageModel.findOne({ Name: PackageName });
    const fam = await familyMemberModel.findOne({ NationalId: NationalId });
    const famrelated = await familyMemberModel.find({
      Patient: Patient.id,
      NationalId: NationalId,
    });
    const subscribedcheck = await subscriptionModel.findOne({ FamilyMem: fam });

    if (famrelated == null || fam == null) {
      res.status(400).send({ error: "Wrong national id " });
    } else if (fam.FamilyMem != null) {
      res
        .status(400)
        .send({ error: "This family member is a already a user " });
    }
    if (subscribedcheck == null) {
      res.send({ error: "Error" });
    }
    // why it doesn't ente here
    else if (subscribedcheck.Status == "Subscribed") {
      res.status(400).send({ error: "You are already subscribed" });
    } else {
      const subscribtion = await subscriptionModel.findOneAndUpdate(
        { FamilyMem: fam },
        {
          Package: Package,
          Status: "Subscribed",
          Startdate: formattedDate,
          Renewaldate: formattedDate3,
          Enddate: formattedDate1,
        },
        { new: true }
      );
      res.status(200).send({ subscribtion });
    }
  } catch (error) {
    // console.log("HII");
    res.status(400).send({ message: error.message });
  }
};

const cancelSubscription = async (req, res) => {
  try {
    const Startdate = new Date();
    const signedIn = req.user.Username;
    const year = Startdate.getFullYear();
    const month = String(Startdate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(Startdate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const patient = await patientModel.findOne({ Username: signedIn });
    const subscribed = await subscriptionModel.findOne({ Patient: patient });
    //  console.log()
    if (subscribed) {
      if (subscribed.Status === "Cancelled") {
        res
          .status(400)
          .send({ Error: "You have already cancelled your prescription" });
      } else {
        const subscribedUpdate = await subscriptionModel.findOneAndUpdate(
          { Patient: patient },
          { Status: "Cancelled", Enddate: formattedDate }
        );
        res.status(200).json({ subscribedUpdate });
      }
    } else {
      res.status(400).send({ Error: "You're not subscribed!" });
    }
  } catch {
    res
      .status(400)
      .send({ Error: "Error occurred while cancelling subscription" });
  }
};

const linkPatient = async (req, res) => {
  const { Id, Relation } = req.body;
  var familyMember = null;
  if (!isNaN(parseFloat(Id))) {
    familyMember = await patientModel.findOne({ MobileNum: Id });
  } else {
    const familyMemberUser = await userModel.findOne({ Email: Id });
    if (!familyMemberUser) {
      res.status(404).send({ message: "Patient not found" });
      return;
    } else {
      familyMember = await patientModel.findOne({
        Username: familyMemberUser.Username,
      });
    }
  }
  if (!familyMember) {
    res.status(404).send({ message: "Patient not found" });
    return;
  } else {
    const currentUser = await patientModel.findOne({
      Username: req.user.Username,
    });
    if (currentUser.LinkedPatients.includes(familyMember._id)) {
      res.status(202).send({ message: "Patient already linked to you" });
    } else if (currentUser.MobileNum == familyMember.MobileNum) {
      res.status(204).send({ message: "Can't link yourself" });
    } else {
      const formerlyLinked = await familyMemberModel.findOne({
        NationalId: familyMember.NationalId,
      });
      var newFamilymember = null;
      if (!formerlyLinked) {
        currentUser.LinkedPatients.push(familyMember._id);
        await currentUser.save();
        const currentDate = new Date();
        const dob = new Date(familyMember.DateOfBirth);
        newFamilymember = await familyMemberModel.create({
          Patient: currentUser,
          FamilyMem: familyMember,
          FamilyMemberUsername: familyMember.Username,
          Name: familyMember.Name,
          NationalId: familyMember.NationalId,
          Age: Math.floor(
            Math.abs(currentDate.getTime() - dob.getTime()) / 31557600000
          ),
          Gender: familyMember.Gender,
          Relation: Relation,
        });
      } else {
        res.status(206).send({ message: "Patient already linked to another user" });
      }
      if (!newFamilymember) {
        res.status(200).json({ familyMember });
      } else {
        await subscriptionModel.addEntry1(newFamilymember);
        res.status(200).json({ newFamilymember });
      }
    }
  }
};

const uploadFile = async (req, res) => {
  var user = req.user.Username;
  if (req.user.Type === "Doctor") {
    user = req.params.username;
  }
  const filename = req.file.filename;
  const originalname = req.file.originalname;

  await patientModel.findOneAndUpdate(
    { Username: user },
    {
      $push: {
        MedicalHistory: {
          filename: filename,
          originalname: originalname,
          note: req.body.note,
        },
      },
    }
  );
  res
    .status(200)
    .send({ file: req.file, message: "File uploaded successfully" });
};

const getMedicalHistory = async (req, res) => {
  var user = req.user.Username;
  if (req.user.Type === "Doctor") {
    user = req.params.username;
  }
  const patient = await patientModel.findOne({ Username: user });
  if (!patient) {
    res.status(404).send({ message: "Patient not found." });
    return;
  }
  const { MedicalHistory } = patient;
  res.status(200).send({ MedicalHistory });
};

const cancelSubscriptionfamilymember = async (req, res) => {
  try {
    const Startdate = new Date();
    const { NationalId } = req.body;
    const signedIn = req.user.Username;
    const year = Startdate.getFullYear();
    const month = String(Startdate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(Startdate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    const patient = await patientModel.findOne({ Username: signedIn });
    const fam = await familyMemberModel.findOne({ NationalId: NationalId });
    const subscribed = await subscriptionModel.findOne({
      FamilyMem: fam,
      FamilyMem: fam.id,
    });
    const famrelated = await familyMemberModel.find({
      Patient: patient.id,
      NationalId: NationalId,
    });
    if (famrelated == null) {
      res.status(400).send({ error: "Family member not related to you " });
    } else if (fam.FamilyMem != null) {
      res.status(400).send({ error: "He is already a system user" });
    } else if (subscribed) {
      if (subscribed.Status === "Cancelled") {
        res
          .status(400)
          .send({ error: "You have already cancelled your prescription" });
      } else {
        const subscribedUpdate = await subscriptionModel.findOneAndUpdate(
          { FamilyMem: fam },
          { Status: "Cancelled", Enddate: formattedDate }
        );
        res.status(200).json({ subscribedUpdate });
      }
    } else {
      res.send({ Error: "You're not subscribed!" });
    }
  } catch {
    res.send({ Error: "Error occurred while cancelling subscription" });
  }
};

const viewUpcomingAppointmentsPat = async (req, res) => {
  const username = req.user.Username;
  //put in mind the string thing if the (Status) condition in the find query does not work
  try {
    const pastAppointments = await appointmentModel.find(
      { PatientUsername: username },
      { Status: "Upcoming" }
    );
    //maybe for usability add smth that says no appointments in case length of pastAppointments == 0
    res.status(200).json(pastAppointments);
  } catch (error) {
    res.status(500).json(error);
  }
};

//make sure from the ta that past appointments is completed bas
const viewPastAppoitmentsPat = async (req, res) => {
  const username = req.user.Username;
  try {
    const pastAppointments = await appointmentModel.find(
      { PatientUsername: username },
      { Status: "Completed" }
    );
    //maybe for usability add smth that says no appointments in case length of pastAppointments == 0
    res.status(200).json(pastAppointments);
  } catch (error) {
    res.status(500).json(error);
  }
};

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};


const getFamSessionCost = async (req,res) => {
  const username = req.user.Username;
  const famName = req.query.FamName;
try
  {const patient = await patientModel.findOne({Username: username});

  const famMember = await familyMemberModel.findOne({Patient: patient , Name:famName});
  const subscription = await subscriptionModel.findOne({FamilyMem: famMember}).populate("Package");

  const myDiscount = sunscription.Package.Session_Discount;
  res.status(200).json(myDiscount);
  }
catch(error){
  res.status(500).send({message: error.message});
}
}
module.exports = {
  uploadFile,
  getMedicalHistory,
  downloadFile,
  removeHealthRecord,
  updateFamCredit, //updates status fam
  updateSubscription, //updates status leya
  getAmountSubscription, //gets amount to be paid for self
  getAmountFam, //gets amount to be paid for fam
  cancelSubscription,
  viewHealthFam,
  viewOptionPackages,
  viewHealthPackage,
  session_index,
  createFamilymember,
  getFamilymembers,
  selectPatient,
  getPrescriptions,
  getPatientUsername,
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
  selectPrescription,
  getEmergencyContact,
  subscribepackagefamilymem,
  linkPatient,
  uploadFile,
  getMedicalHistory,
  downloadFile,
  removeHealthRecord,
  payForFamSubscription,
  cancelSubscriptionfamilymember,
  payForSubscription,
  viewHealthPackagewithstatus,
  viewHealthFamwithstatus,
  viewUpcomingAppointmentsPat,
  viewPastAppoitmentsPat,
  getWalletAmount,
};
