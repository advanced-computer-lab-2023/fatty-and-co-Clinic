const doctorModel = require("../models/doctors");
const getDoctor =async(req,res) => {
    const patients = await doctorModel.find();
    res.status(200).send(patients) 
}

module.exports = {getDoctor};
