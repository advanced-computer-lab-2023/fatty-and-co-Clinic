const systemUserModel = require("../models/systemusers");
const requestModel = require("../models/requests");

const createRequest = async (req, res) => {
  try {
    const request = await requestModel.create({
      Username: req.body.Username,
      Password: req.body.Password,
      Email: req.body.Email,
      Name: req.body.Name,
      DateOfBirth: req.body.DateOfBirth,
      HourlyRate: req.body.HourlyRate,
      Affiliation: req.body.Affiliation,
      EducationalBackground: req.body.EducationalBackground,
      Speciality: req.body.Speciality,
      Status: "Pending",
    });
    res.status(200).send({ request });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateRequest = async (req, res) => {
  try {
    const request = await requestModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).send({ request });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateEmail= async(req,res)=>{
  try{
    const {Username} = req.params;
    const isUser= await systemUserModel.find({Username:Username})
    const isSigned=await systemUserModel.find({Username:Username,Email:req.body.Email})
    if(!isUser){
      res.status(404).send("User not registered")
    }
    else if(isSigned!=""  && isSigned.Username!=Username ){
      res.json({error:"This email is already registered by another user!"})  //set status
    }
    else {
    const doc = await systemUserModel.findOneAndUpdate({Username:Username}, req.body);
    const doc1 = await systemUserModel.findOneAndUpdate({Username:Username}, req.body); 
    
  }
}
catch(error){
  res.status(400).send({message:error.message})
}}
//turn the data from the request into a doctor object using the doctor controller function createDoctor

module.exports = {
  createRequest,
  updateRequest,
  updateEmail
};
