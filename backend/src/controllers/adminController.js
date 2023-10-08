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

module.exports = {createAdmin};
