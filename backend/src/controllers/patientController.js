const { default: mongoose } = require("mongoose");
const systemUserModel = require("../models/systemusers");
const patientModel = require("../models/patients");
const userModel = require("../models/systemusers");
//const subscriptionModel=require("../models/subscriptions");
const familyMemberModel = require("../models/familymembers");
const packageModel = require("../models/packages");
const doctorModel = require("../models/doctors");
const Patient = require("../models/patients");
const prescriptionModel = require("../models/prescriptions");
const { isNull } = require("util");
const { getPatients } = require("./testController");
const User = require("../models/systemusers");
const { getPackages } = require("./packageController");
const subscriptionModel =require ("../models/subscriptions");


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

    console.log(patient);

    if (!patient) {
      res.status(404).send({ message: "Patient not found." });
      return;
    }

    const EmergencyContact = patient.EmergencyContact;
    const Name = patient.Name;
    console.log(Name);
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

const deletePatient = async (req, res) => {
  try {
    const patient = await patientModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updatePatient = async (req, res) => {
  try {
    const patient = await patientModel.findByIdAndUpdate(req.user.id, req.body);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

// view all doctors with speciality and session price
const session_index = async (req, res) => {
  const username = req.user.Username;
  const { Name, Speciality } = req.query;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "Invalid ID" });
  // }

  try {
    const patient = await patientModel.findOne({ Username: username });
    let packageDis = 0;

    if (patient.PackageName) {
      const package = await packageModel.findOne({ Name: patient.PackageName });
      packageDis = package.Session_Discount;
    }

    const query = {
      ...(Name ? { Name: { $regex: Name.trim(), $options: "i" } } : {}),
      ...(Speciality
        ? { Speciality: { $regex: Speciality.trim(), $options: "i" } }
        : {}),
    };

    const doctors = await doctorModel.find(query);

    const mySessions = doctors.map((doctor) => {
      const calcCost = (1 - packageDis / 100) * (doctor.HourlyRate * 1.1);
      return {
        Username: doctor.Username,
        Name: doctor.Name,
        Speciality: doctor.Speciality,
        Cost: calcCost,
      };
    });

    res.status(200).json(mySessions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const viewHealthFam= async(req,res)=>{
  try {//changed this
    const username=req.user.Username;
    const Patient= await patientModel.findOne({Username:username});
    const famMems= await familyMemberModel.find({PatientID:Patient,FamilyMem:{$ne:null}}).populate("FamilyMem");
    const package = await Promise.all(famMems.map(async (famMember) => {
    const subscription = await subscriptionModel.findOne({ Username: famMember.FamilyMem.Username });

      if (subscription && subscription.Status === 'subscribed') {
        return famMember.FamilyMem; // Add the family member to the result if subscribed
      }
      return null; // Or you can handle differently for non-subscribed members
    }));
    const subscribedFamilyMembers = package.filter(member => member !== null);
    res.status(200).json(subscribedFamilyMembers);
}
catch{
     res.json()
}}

const viewOptionPackages= async(req,res)=>{
  try { 
    const packages=await packageModel.find({})
    res.status(200).json(packages);
  } catch (error) {
    res.status(400).send("Cannot find it");
  }
}


const viewHealthPackage= async (req, res) => {
  try {
    const current_user = req.user.Username;  //changed this
    const healthPackage= await patientModel.findOne({Username:current_user});
    const package = await packageModel.find({Name:healthPackage.PackageName})
    res.status(200).json(package);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

//hi khalkhoola



const createFamilymember = async (req, res) => {
  const { FamilyMemberUsername,Name, NationalId, Age, Gender, Relation } = req.body;
  const { Createparameter } = req.params;
  const Createpatameter = req.user.Username;
  console.log(Createpatameter);

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
  console.log(Createparameter);
  try {
    const findPatientRel= await patientModel.findOne({Username:FamilyMemberUsername});
    const findPatientMain= await patientModel.findById(Createparameter);
    const newFamilymember = await familyMemberModel.create({
      PatientID: findPatientMain,
      FamilyMem:findPatientRel,
      FamilyMemberUsername:FamilyMemberUsername,
      Name: Name,
      NationalId: NationalId,
      Age: Age,
      Gender: Gender,
      Relation: Relation,
    });

    res.status(200).json(newFamilymember);
   
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
};

const GetFamilymembers = async (req, res) => {
  try {
    const {PatientUserName}=req.user.username;
    const { Patient } = await patientModel.find(PatientUserName);  //changed this
    const fam = await familyMemberModel.find({PatientID:Patient.id}).populate("PatientID").populate("FamilyMem");
   // const PatientUserName = req.user.Username;
    //console.log(PatientID);
    //  console.log(fam)
    res.status(200).json(fam);
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
      console.log(date);
      console.log(nextDay);
      console.log(regexQuery.Date);
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

const subscribepackagefamilymem=async(req,res) =>{
  try {
    
    const { PatientUsername } = req.user.username;  //changed this
    const { Patient} = patientModel.findOne(PatientUsername);
  const fam = await familyMemberModel.find({PatientID:Patient.id}).populate("PatientID").populate("FamilyMem");
    const {FamilyMemberUsername,PackageName}=req.body;
  if (FamilyMemberUsername!=fam.username){
    res.status(400).send( "Error" );
  }
  else {
    const patient = await patientModel.findOneAndUpdate({
      Username:FamilyMemberUsername},{PackageName:PackageName });
   // const status =await subscriptionModel.findOneAndUpdate()
    res.status(200).send({ patient });
  }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
  
}

const subscribehealthpackage=async(req,res) =>{
console.log("Entered");
  try {
    const Startdate = new Date();

    const year = Startdate.getFullYear();
    const month = String(Startdate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(Startdate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    const enddate = new Date();
    
    const year1 = enddate.getFullYear()+1;
    const month1 = String(enddate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day1 = String(enddate.getDate()).padStart(2, '0');
    
    const formattedDate1 = `${year}-${month}-${day}`;
    const { PackageName,Status} = req.body;
    const PatientUserName=req.user.Username;
    const Patient  = await patientModel.findOne({Username:PatientUserName}); 
   // console.log(PatientUserName);
   // console.log(Patient) //changed this
   const subscribtion = await subscriptionModel.find({Patient:Patient});
   if (subscribtion){
    console.log("Entered the if");
    
    const patient12 = await subscriptionModel.findOneAndUpdate(
      {Patient:Patient.id},
      { 
        PackageName:PackageName,
       Status:"Subscribed",
        Startdate:formattedDate,
        Enddate:formattedDate1
      }

    
    );
    console.log(patient12)
    res.status(200).send(patient12);
    }
  else{
      const subscription1 = await subscriptionModel.create(
      { Patient:Patient,
        PackageName:PackageName,
       Status:"Subscribed",
        Startdate:formattedDate,
        Enddate:formattedDate1
      }
      )
      
    res.status(200).send(subscription1 );
    }  
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
  
}

Date.prototype.addDays = function (days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

module.exports = {
  viewHealthFam,
  viewOptionPackages,
  viewHealthPackage,
  subscribehealthpackage,
  session_index,
  createFamilymember,
  GetFamilymembers,
  selectPatient,
  getPrescriptions,
  getPatientUsername,
  getAllPatients,
  deletePatient,
  getPatient,
  updatePatient,
  selectPrescription,
  getEmergencyContact,
  subscribepackagefamilymem
};
