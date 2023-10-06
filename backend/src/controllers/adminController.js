const userModel = require("../models/systemusers.js");
const doctorModel = require("../models/doctors.js");
const requests = require("../models/requests.js");
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
  const { Username } = req.body;
  try {
    const request = await requests.find({ Username: Username });
    res.status(200).json(request);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const acceptRequest = async (req, res) => {
  const { Username } = req.body;
  try {
    const request = await requests.findOneAndUpdate({
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
    const request = await requests.findOneAndUpdate({
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
    const user = await userModel.deleteOne({ Username: Username });
    res.status(200).json(user);
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
};
