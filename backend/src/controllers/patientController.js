const { default: mongoose } = require("mongoose");
const systemUserModel = require("../models/systemusers");
const patientModel = require("../models/patients");
const userModel = require("../models/systemusers");
const subscriptionModel=require("../models/subscriptions");
const familyMemberModel = require("../models/familymembers");
const packageModel = require("../models/packages");
const doctorModel = require("../models/doctors");
const Patient = require("../models/patients");
const prescriptionModel = require("../models/prescriptions");
const { isNull } = require("util");
const { getPatients } = require("./testController");
const User = require("../models/systemusers");
const { getPackages } = require("./packageController");
const { Console } = require("console");


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
    const famMems= await familyMemberModel.find({$or:[{"PatientID":Patient},{"FamilyMem":Patient}],function(err, docs){
      if(!err) res.send(docs);
   }}).populate("PatientID").populate("FamilyMem"); 
    //check eno family mem mesh user
    const package = await Promise.all(famMems.map(async (famMember) => {
    const value= await patientModel.findOne({Username:famMember.PatientID.Username})  
    const subscription = await subscriptionModel.findOne({ Patient: famMember.FamilyMem.Username===username?value:famMember.FamilyMem}).populate('FamilyMem').populate('PackageName');
      if (subscription && subscription.Status === 'Subscribed') {
        return subscription; // Add the family member to the result if subscribed
      } // Or you can handle differently for non-subscribed members
    }));
    res.status(200).json(package);
}
catch{
     res.json(404).json({error:"No family members are subscribed"})
}}

const viewOptionPackages= async(req,res)=>{
  try { 
    const packages=await packageModel.find({})
    res.status(200).json(packages);
  } catch (error) {
    res.status(400).send("Cannot find it");
  }
}


const payForSubscription= async(req,res)=>{
  try{
    const curr_user= req.user.Username
    console.log(curr_user)
    const patient= await patientModel.findOne({Username:curr_user})
    const patSubscription= await subscriptionModel.findOne({Patient:patient}).populate('PackageName')
    const patientRelatives= await familyMemberModel.find({FamilyMem:patient}).populate('PatientID').populate('FamilyMem')//check eno family mem mesh user
    var max=0
    for (let i=0;i<patientRelatives.length;i++) {
      const subscription = await subscriptionModel.findOne({ Patient: patientRelatives[i].PatientID }).populate("PackageName")
      console.log(subscription)
      if (subscription && subscription.Status === 'Subscribed' && subscription.PackageName.Family_Discount > max) {
        max = subscription.PackageName.Family_Discount;
        
      }
    }
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(currentDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const enddate = new Date();
    const year1 = (enddate.getFullYear())+1;
    const month1 = String(enddate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day1 = String(enddate.getDate()).padStart(2, '0');
    
    const formattedDate1 = `${year1}-${month1}-${day1}`;
    const renewaldate = new Date();
    const year2 = (renewaldate.getFullYear())+1;
    const month2 = String(renewaldate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day2 = String(renewaldate.getDate()+1).padStart(2, '0');
    const formattedDate2 = `${year2}-${month2}-${day2}`;
// formatting subscription start date to compare
    const startCheck = new Date(patSubscription.Startdate)   
    const year3 = (startCheck.getFullYear());
    const month3 = String(startCheck.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day3 = String(startCheck.getDate()).padStart(2, '0');
    const formattedDate3 = `${year3}-${month3}-${day3}`; 
    const renewCheck = new Date(patSubscription.Renewaldate)   
    const year4 = (renewCheck.getFullYear());
    const month4 = String(renewCheck.getMonth() +1).padStart(2, '0'); // Months are zero-based
    const day4 = String(renewCheck.getDate()).padStart(2, '0');
    const formattedDate4 = `${year4}-${month4}-${day4}`;
    const amount=patSubscription.PackageName.Price -max;
    if(patSubscription.Status==="Subscribed" && formattedDate===formattedDate3 ){
      console.log(patient.Wallet)
      if(patient.Wallet>amount ){
      const updatePat= await patientModel.findOneAndUpdate({Username:curr_user},{Wallet:patient.Wallet-amount})
      res.status(200).json(updatePat)
      }
      else{
        const updateRenewal= await subscriptionModel.findOneAndUpdate({Patient:patient},{Status:"Cancelled", Enddate:formattedDate})
        res.status(404).json(updateRenewal)
      }
    }}
  
  catch{
    res.status(400).send({ message: "Failed to pay" });
  }
}

const viewHealthPackage= async (req, res) => {
  try {
    const current_user = req.user.Username;  //changed this
    const patient= await patientModel.findOne({Username:current_user});
    const subscription = await subscriptionModel.findOne({Patient:patient, Status:"Subscribed"}).populate('PackageName')
    if(subscription){
    const myPackage= subscription.PackageName
    res.status(200).send(myPackage);}
    else {
      res.status(404).send({Error:"Cannot find any current subscriptions!"})
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
      .findOne({ Patient:patient })
      .select('Status Startdate Renewaldate Enddate') // Include the fields you want from the 'subscriptionModel'
      .populate({
      path: "Patient",
        select: "Username" // Include the fields you want from the 'Patient' model
      })
      .populate({
       path: "PackageName",
        select: "Name" // Include the fields you want from the 'PackageName' model
      });
     // console.log(subscription.Patient.Username);

    if (subscription) {
      res.status(200).send(subscription);
    } else {
      res.status(404).send({ Error: "Cannot find any current subscribed subscription!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
const viewHealthFamwithstatus= async(req,res)=>{
  try {//changed this
    const username=req.user.Username;
    const Patient= await patientModel.findOne({Username:username});
    const famMems= await familyMemberModel.find({$or:[{"PatientID":Patient},{"FamilyMem":Patient}],function(err, docs){
      if(!err) res.send(docs);
   }}).populate("PatientID").populate("FamilyMem"); 
    //check eno family mem mesh user
    const package = await Promise.all(famMems.map(async (famMember) => {
    const value= await patientModel.findOne({Username:famMember.PatientID.Username})  
    const subscription = await subscriptionModel.findOne({ Patient: famMember.FamilyMem.Username===username?value:famMember.FamilyMem}).populate('FamilyMem').populate('PackageName');
      if (subscription ) {
        return subscription; // Add the family member to the result if subscribed
      } // Or you can handle differently for non-subscribed members
    }));
    res.status(200).json(package);
}
catch{
     res.json(404).json({error:"No family members are subscribed"})
}
}
//hi khalkhoola



const createFamilymember = async (req, res) => {
  const { FamilyMemberUsername,Name, NationalId, Age, Gender, Relation } = req.body;
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
    const findPatientRel= await patientModel.findOne({Username:FamilyMemberUsername});
    const findPatientMain= await patientModel.findOne({Username:Createparameter});
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


    //test de tany
    if(findPatientRel==null){
    await subscriptionModel.addEntry1(newFamilymember);
    res.status(200).json(newFamilymember);}
    else{
      res.status(200).json(newFamilymember);
    }

   
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
     console.log("entered");
  try {
    console.log("entered try");
    const Startdate = new Date();

    const year = Startdate.getFullYear();
    const month = String(Startdate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(Startdate.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}-${month}-${day}`;
    const enddate = new Date();
    
    const year1 = (enddate.getFullYear())+1;
    const month1 = String(enddate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day1 = String(enddate.getDate()).padStart(2, '0');
    
    const formattedDate1 = `${year1}-${month1}-${day1}`;
    const PatientUsername  = req.user.Username;  //changed this
    const Patient = await patientModel.findOne({Username:PatientUsername});
   // console.log(Patient) //changed this
    const {NationalId,PackageName}=req.body;
    const Package = await  packageModel.findOne({Name:PackageName});
  const fam = await familyMemberModel.findOne({NationalId:NationalId});
  const famrelated=await familyMemberModel.find({PatientID:Patient.id,NationalId:NationalId});
  console.log("Familymem") 
 // console.log(fam) 
  console.log("Package") 
  //console.log(Package) 
  const subscribedcheck= await subscriptionModel.findOne({FamilyMem:fam});
console.log(subscribedcheck.Status);
console.log(subscribedcheck.Status=="Subscribed");

  if (famrelated==null || fam==null){
    res.status(400).send( {error :"Wrong national id "} );
  }
  else if (fam.FamilyMem !=null){
    res.send( {error:"This family member is a already a user " });
  }
  if (subscribedcheck==null){
    res.send({error:"Error"});
   }
   // why it doesn't ente here
   else if (subscribedcheck.Status=="Subscribed"){
    console.log("Entered here if subs");
    res.send({error:"You are already subscribed"});
   }
  else {
   const subscribtion=await subscriptionModel.findOneAndUpdate({FamilyMem:fam},{
    PackageName:Package,
    Status:"Subscribed",
    Startdate:formattedDate,
    Enddate:formattedDate1
   },
   { new: true }
   )
    res.status(200).send({ subscribtion });
  }
  } catch (error) {
   // console.log("HII");
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
    
    const year1 = (enddate.getFullYear())+1;
    const month1 = String(enddate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day1 = String(enddate.getDate()).padStart(2, '0');
    
    const formattedDate1 = `${year1}-${month1}-${day1}`;
    const { PackageName,Status} = req.body;
    const Package = await  packageModel.findOne({Name:PackageName});
    const PatientUserName=req.user.Username;
    const Patient  = await patientModel.findOne({Username:PatientUserName}); 
   // console.log(PatientUserName);
   // console.log(Patient) //changed this
   const subscribtion = await subscriptionModel.findOne({Patient:Patient});
   console.log(subscribtion);

   if (subscribtion==null){
    res.send({error:"Error"});
   }
   else if (subscribtion.Status=="Subscribed"){
    res.status(400).send({error:"You are already subscribed"});
   }

   else if (subscribtion.Status!="Subscribed"){
    console.log("Entered the if");
    
    const patient12 = await subscriptionModel.findOneAndUpdate({Patient:Patient},
      { 
        PackageName:Package,
        Status:"Subscribed",
        Startdate:formattedDate,
        Enddate:formattedDate1
      }

    );
    console.log(patient12)
    res.status(200).send(patient12);
    }
 else {
  res.status(400).send({error:"Sorry already subscribed"});
 }
  } catch (error) {
    res.status(400).send({ Error:"Error occurred while  subscribing" });
  }
  
}




const cancelSubscription=async(req,res) =>{
  try {
    const Startdate = new Date();
    const signedIn= req.user.Username
    const year = Startdate.getFullYear();
    const month = String(Startdate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(Startdate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const patient= await patientModel.findOne({Username:signedIn})
    const subscribed= await subscriptionModel.findOne({Patient:patient})
    if(subscribed){
      console.log("Here")
    if(subscribed.Status==="Cancelled"){
      res.send({error:"You have already cancelled your prescription"})
    }
    else{
      const subscribedUpdate=await subscriptionModel.findOneAndUpdate({Patient:patient,},{Status:"Cancelled",Enddate:formattedDate})
      res.json({subscribedUpdate});
    }}

    else{
      res.send({Error:"You're not subscribed!"})
    }
}
catch{
  res.send({Error:"Error occurred while cancelling subscription"})
}}
const cancelSubscriptionfamilymember=async(req,res) =>{
  try {
    const Startdate = new Date();
    const{NationalId}=req.body;
    const signedIn= req.user.Username
    const year = Startdate.getFullYear();
    const month = String(Startdate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const day = String(Startdate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const patient= await patientModel.findOne({Username:signedIn})
    const fam = await familyMemberModel.findOne({NationalId:NationalId});
    const subscribed= await subscriptionModel.findOne({FamilyMem:fam, FamilyMem:fam.id})
    const famrelated=await familyMemberModel.find({PatientID:patient.id,NationalId:NationalId});
    if (famrelated ==null){
      res.send({error:"Family member not related to you "})
    }
    if (fam.FamilyMem!=null){
      res.send({error:"He is already a system user"})
    }
    if(subscribed){
      console.log("Here")
    if(subscribed.Status==="Cancelled"){
      res.send({error:"You have already cancelled your prescription"})
    }
    else{
      const subscribedUpdate=await subscriptionModel.findOneAndUpdate({FamilyMem:fam},{Status:"Cancelled",Enddate:formattedDate})
      res.json({subscribedUpdate});
    }}

    else{
      res.send({Error:"You're not subscribed!"})
    }
}
catch{
  res.send({Error:"Error occurred while cancelling subscription"})
}}

/* const cancelSubscriptionFam=async(req,res) =>{
//   try {
//     const Startdate = new Date();
//     const signedIn= req.user.Username
    
//     const year = Startdate.getFullYear();
//     const month = String(Startdate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
//     const day = String(Startdate.getDate()).padStart(2, '0');
//     const formattedDate = `${year}-${month}-${day}`;
//     const patient= await patientModel.findOne({Username:signedIn})
//     const subscribed= await subscriptionModel.findOne({Patient:patient})
//     if(subscribed){
//       console.log("Here")
//     if(subscribed.Status==="Cancelled"){
//       res.send({error:"You have already cancelled your prescription"})
//     }
//     else{
//       const subscribedUpdate=await subscriptionModel.findOneAndUpdate({Patient:patient},{Status:"Cancelled",Enddate:formattedDate})
//       res.json({subscribedUpdate});
//     }}

//     else{
//       res.send({Error:"You're not subscribed!"})
//     }
// }
// catch{
//   res.send({Error:"Error occurred while cancelling subscription"})
// }}

// Date.prototype.addDays = function (days) {
//   var date = new Date(this.valueOf());
//   date.setDate(date.getDate() + days);
//   return date;
// };
*/
module.exports = {
  cancelSubscription,
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
  subscribepackagefamilymem,
  cancelSubscriptionfamilymember,
  payForSubscription,
  viewHealthPackagewithstatus,
  viewHealthFamwithstatus
};
