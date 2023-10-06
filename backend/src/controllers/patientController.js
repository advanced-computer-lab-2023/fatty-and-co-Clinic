const patientModel = require("../models/patients");
const familyMemberModel = require("../models/familymembers");
const { getPatients } = require("./testController");

const createPatient = async (req, res) => {
  const {} = req.body;
  try {
    const patient = await patientModel.create({
      Username: req.body.Username,
      Name: req.body.Name,
      MobileNum: req.body.MobileNum,
      DateOfBirth: req.body.DateOfBirth,
      EmergencyContact: req.body.EmergencyContact,
      FamilyMem: req.body.FamilyMem,
      PackageName: req.body.PackageName,
    });
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patients = await patientModel.find();
    res.status(200).send({ patients });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const getPatient = async (req, res) => {
  try {
    const patient = await patientModel.findById(req.params.id);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const deletePatient = async (req, res) => {
  try {
    const patient = await patientModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ patient });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};


module.exports = {
  createPatient,
  getAllPatients,
  deletePatient,
  getPatient
};
