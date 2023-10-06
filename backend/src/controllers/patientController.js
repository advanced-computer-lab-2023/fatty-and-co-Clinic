const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");

const createFamilymember = async (req, res) => {
    const { UserName,Name, NationalId, Age, Gender,Relation } = req.body;
    try {
      const newFamilymember = await familyMemberModel.create({
        UserName,
        Name,
        NationalId,
        Age,
        Gender,
        Relation
      });
      res.status(200).json(newFamilymember);
    
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
   
  }
 const UpdateFamilymember = async (req, res) => {
    try {
        const filter={Username:"Khalkhoola"}
       // console.log(req.body.Email)
       const doc= await patientModel.findOneAndUpdate(filter,newFamilymember );
       res.status(200).json(doc);
     
     // console.log(req.body.HourlyRate);
       
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
   
  }

  
module.exports = {createFamilymember,UpdateFamilymember};
