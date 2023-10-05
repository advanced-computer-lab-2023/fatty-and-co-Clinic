const users = require("../models/systemusers.js");
const doctors = require('../models/doctors.js');
const { default: mongoose } = require('mongoose');

const createAdmin = async(req,res) => {
   
    const { Username, Password } = req.body;
    
try {
    const admin = await users.create({Username: Username, Password: Password, Type: "Admin"} );

    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getRequests = async (req, res) => {
 
 try{
    const doctors = await doctors.find();

    res.status(200).json(doctors);
 } catch (error){
    res.status(400).json({ error: error.message });
 }
 

}


const deleteUser = async (req, res) => {
  const { Username} = req.body;
    
  try {
      const user = await users.deleteOne({Username: Username} );
  
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    } 
 
}


module.exports = {createAdmin, getRequests, deleteUser};
