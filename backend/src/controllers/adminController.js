const userModel = require("../models/systemusers.js");
const requestModel = require("../models/requests");
const doctorModel = require("../models/doctors");
const patientModel = require("../models/patients");
const appointmentModel = require("../models/appointments");
const familyMemberModel = require("../models/familymembers");
const prescriptionModel = require("../models/prescriptions");
const { default: mongoose } = require("mongoose");

const createAdmin = async (req, res) => {
  const { Username, Password, Email } = req.body;
  try {
    const admin = await userModel.create({
      Username: Username,
      Password: Password,
      Email: Email,
      Type: "Admin",
    });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRequest = async (req, res) => {
  const { Username } = req.query;
  try {
    const request = await requestModel.find({ Username: Username });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests = await requestModel.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const acceptRequest = async (req, res) => {
  const { Username } = req.body;
  try {
    const request = await requestModel.findOneAndUpdate({
      Username: Username,
      Status: "Accepted",
    });
    const doc = await doctorModel.create({
      Username: Username,
      Name: request.Name,
      DateOfBirth: request.DateOfBirth,
      HourlyRate: request.HourlyRate,
      Affiliation: request.Affiliation,
      EducationalBackground: request.EducationalBackground,
      Speciality: request.Speciality,
    });
    const user = await userModel.create({
      Username: Username,
      Password: request.Password,
      Email: request.Email,
    });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const rejectRequest = async (req, res) => {
  const { Username } = req.body;
  try {
    const request = await requestModel.findOneAndUpdate({
      Username: Username,
      Status: "Rejected",
    });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { Username } = req.body;
  try {

    const user = await userModel.findOneAndDelete({ Username: Username });
      if (user && user.Type === "Patient") {
        const patient = await patientModel.findOneAndDelete({ Username: Username });
        const appointments = await appointmentModel.find({ PatientUsername: Username });
        if (appointments.length > 0) {
          await appointmentModel.deleteMany({ PatientUsername: Username });
        }
        const prescriptions = await prescriptionModel.find({ PatientUsername: Username });
        if (prescriptions.length > 0) {
          await prescriptionModel.deleteMany({ PatientUsername: Username });
        }
        const familymembers = await familyMemberModel.find({ PatientUserName: Username });
        if (familymembers.length > 0) {
          await familyMemberModel.deleteMany({ PatientUserName: Username });
        }
        res.status(200).json({ user, patient });
      } else if (user && user.Type == "Doctor") {
      const doctor = await doctorModel.findOneAndDelete({ Username: Username });
      const appointments = await appointmentModel.find({
        DoctorUsername: Username,
      });
      if (appointments.length > 0) {
        await appointmentModel.deleteMany({ DoctorUsername: Username });
      }
      const prescriptions = await prescriptionModel.find({
        DoctorUsername: Username,
      });
      if (prescriptions.length > 0) {
        await prescriptionModel.deleteMany({ DoctorUsername: Username });
      }
      res.status(200).json({user, doctor});
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createAdmin,
  getRequest,
  deleteUser,
  acceptRequest,
  rejectRequest,
  getRequests,
};
