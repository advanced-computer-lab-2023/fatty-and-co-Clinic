const Doctors = require("../models/doctors");
const mongoose=require("mongoose");
module.exports = {createDoctor};

const createDoctor = async(req,res) => {
   
    const { Username,Name,Email,DateOfBirth,HourlyRate,Affiliation,EducationalBackground} = req.body;
    
try {
    const doc = await Doctors.create({Username: Username, Name:Name,Email:Email,DateOfBirth:DateOfBirth,HourlyRate:HourlyRate,Affiliation:Affiliation, EducationalBackground:EducationalBackground} );

    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

