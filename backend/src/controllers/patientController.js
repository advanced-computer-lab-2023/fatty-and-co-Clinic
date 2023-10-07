const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");

const getPatients =async(req,res) => {
    const patients = await patientModel.find();
    res.status(200).send(patients) 
}
module.exports = {getPatients};
