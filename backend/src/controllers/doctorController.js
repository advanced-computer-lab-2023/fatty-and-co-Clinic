const doctorModel = require("../models/doctors");
const mongoose= require("mongoose")


const createDoctor = async(req,res) => {
   
    const { Username, Name,DateOfBirth,HourlyRate,Affiliation,EducationalBackground } = req.body;
    
  try {
    const doc= await doctorModel.create({Username: Username, Name:Name,DateOfBirth:DateOfBirth,HourlyRate:HourlyRate,Affiliation:Affiliation,EducationalBackground:EducationalBackground} );
  
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  }
module.exports = {createDoctor};
