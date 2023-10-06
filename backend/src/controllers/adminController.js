const userModel = require("../models/systemusers.js");
const requestModel = require("../models/requests");
const doctorModel = require("../models/doctors");
const { default: mongoose } = require('mongoose');

const createAdmin = async (req, res) => {
  const { Username, Password } = req.body;
  try {
    const admin = await userModel.create({ Username: Username, Password: Password, Type: "Admin" });
    res.status(200).json(admin);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getRequests = async (req, res) => {
  try {
    const requests = await requests.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const acceptRequest = async (req, res) => {
  try {
    const request = await requestModel.findById(req.params.id);
    const doctor = await doctorModel.createDoctor(request);
    res.status(200).send({ doctor });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const declineRequest = async (req, res) => {
  try {
    const request = await requestModel.findByIdAndDelete(req.params.id);
    res.status(200).send({ request });
  } catch (error) {
    res.status(400).send({ message: error.message });
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
}

module.exports = { createAdmin, getRequests, deleteUser };
