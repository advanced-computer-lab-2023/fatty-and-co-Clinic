const systemUserModel = require("../models/systemusers");
const requestModel = require("../models/requests");
const { default: mongoose } = require("mongoose");

const createRequest = async (req, res) => {
  const {
    Username,
    Name,
    Password,
    Email,
    DateOfBirth,
    HourlyRate,
    Affiliation,
    EducationalBackground,
  } = req.body;

  try {
    const req = await requestModel.create({
      Username: Username,
      Password: Password,
      Email: Email,
      Name: Name,
      DateOfBirth: DateOfBirth,
      HourlyRate: HourlyRate,
      Affiliation: Affiliation,
      EducationalBackground: EducationalBackground,
      Status: "Pending",
    });

    res.status(200).json(req);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { createRequest };
