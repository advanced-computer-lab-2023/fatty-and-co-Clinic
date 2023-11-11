const { default: mongoose } = require("mongoose");

const systemUserModel = require("../models/systemusers");
const requestModel = require("../models/requests");
const patientModel = require("../models/patients");

const generateToken = require("../common/jwt/generateToken");

const User = require("../models/systemusers");

const createRequest = async (req, res) => {
  try {
    const {
      Username,
      Password,
      Email,
      Name,
      DateOfBirth,
      HourlyRate,
      Affiliation,
      EducationalBackground,
      Speciality,
    } = req.body;
    const request = await requestModel.addEntry(
      Username,
      Password,
      Email,
      Name,
      DateOfBirth,
      HourlyRate,
      Affiliation,
      EducationalBackground,
      Speciality
    );
    res.status(200).send({ request });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateRequest = async (req, res) => {
  try {
    const request = await requestModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.status(200).send({ request });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const updateEmail = async (req, res) => {
  try {
    const Username = req.user.Username;

    const isSigned = await systemUserModel.findOne({
      Email: req.body.Email,
    });
    if (isSigned) {
      res
        .status(400)
        .json({ error: "This email is already registered by another user!" }); //set status
      return;
    }
    const doc = await systemUserModel.findOneAndUpdate(
      { Username: Username },
      req.body,
      { new: true }
    );
    res.status(200).send({ doc });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};
//turn the data from the request into a doctor object using the doctor controller function createDoctor

const login = async (req, res) => {
  console.log(req.body);
  const { Username, Password } = req.body;
  try {
    const user = await systemUserModel.login(Username, Password);
    const token = generateToken(user);
    res.status(200).send({ token, userType: user.Type });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

const createPatient = async (req, res) => {
  const {
    Username,
    Name,
    Password,
    Email,
    MobileNum,
    DateOfBirth,
    Gender,
    EmergencyContactNumber,
    EmergencyContactName,
  } = req.body;
  try {
    const user = await systemUserModel.addEntry(
      Username,
      Password,
      Email,
      "Patient"
    );
    const patient = await patientModel.create({
      Username: Username,
      Name: Name,
      MobileNum: MobileNum,
      DateOfBirth: DateOfBirth,
      Gender: Gender,
      EmergencyContact: {
        FullName: EmergencyContactName,
        PhoneNumber: EmergencyContactNumber,
      },
    });
    res.status(200).send({ patient, user });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

module.exports = {
  createRequest,
  updateRequest,
  updateEmail,
  login,
  createPatient,
};
