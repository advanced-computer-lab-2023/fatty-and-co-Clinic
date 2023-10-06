const Doctors = require("../models/doctors");
const mongoose=require("mongoose");


const createDoctor = async(req,res) => {
   
  const { Username, Name,DateOfBirth,HourlyRate,Affiliation,EducationalBackground } = req.body;
  
try {
  const admin = await Doctors.create({Username: Username, Name:Name,DateOfBirth:DateOfBirth,HourlyRate:HourlyRate,Affiliation:Affiliation,EducationalBackground:EducationalBackground} );

  res.status(200).json(admin);
} catch (error) {
  res.status(400).json({ error: error.message });
}
}
module.exports = {createDoctor};