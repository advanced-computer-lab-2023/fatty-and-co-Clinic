const docSlotsModel = require("../models/docSlots");
const { default: mongoose } = require("mongoose");


const testDocSlotRef = async (req, res) => {
    try{
        const docSlots = await docSlotsModel.find().populate("DoctorId");
        res.status(201).json(docSlots);
      }catch(error){
        res.status(500).json({ error: error.message });
      }
};

module.exports = {testDocSlotRef};

