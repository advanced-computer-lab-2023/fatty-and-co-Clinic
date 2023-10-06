const doctorModel = require("../models/doctors");
const mongoose= require("mongoose")
const systemUserModel = require("../models/systemusers");


const createDoctor = async(req,res) => {
   
    const { Username, Name,DateOfBirth,HourlyRate,Affiliation,EducationalBackground } = req.body;
    
  try {
    const doc= await doctorModel.create({Username: Username, Name:Name,DateOfBirth:DateOfBirth,HourlyRate:HourlyRate,Affiliation:Affiliation,EducationalBackground:EducationalBackground} );
  
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  }


const updateDoctor = async(req,res) => {
  
  try {
    const filter={Username:"Khalkhoola"}
   // console.log(req.body.Email)
   if(req.body.HourlyRate || req.body.Affiliation ){
   const doc= await doctorModel.findOneAndUpdate(filter,req.body );
   res.status(200).json(doc);
   }
   else {
    const doc= await systemUserModel.findOneAndUpdate(filter,req.body );
    res.status(200).json(doc);
   }
 // console.log(req.body.HourlyRate);
   
  } catch (error) {
    res.status(400).json({ error: error.message });
  }}
 

  
  module.exports = {createDoctor,updateDoctor};