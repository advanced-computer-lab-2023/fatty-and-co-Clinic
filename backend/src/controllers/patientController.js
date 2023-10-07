const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");

const createFamilymember = async (req, res) => {
    const  {Name, NationalId, Age, Gender,Relation } = req.body;
    const current_user="Mariam";
    console.log(Age);
    try {
      const newFamilymember = await familyMemberModel.create({
        PatientUserName:current_user,
        Name:Name,
        NationalId:NationalId,
        Age:Age,
        Gender:Gender,
        Relation:Relation
      });
      res.status(200).json(newFamilymember);
    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
   
  }



  const GetFamilymembers = async (req, res) => {
    try {
        
       const currentPatientuser="Mariam";
       const fam= await familyMemberModel.find({PatientUserName:currentPatientuser});
       res.status(200).json(fam);
      } catch (error) {
        res.status(400).json({error:error.message});
      }}
     
 
  
module.exports = {createFamilymember,GetFamilymembers};
