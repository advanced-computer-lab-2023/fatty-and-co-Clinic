const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const {
  validateEmail,
  validatePassword,
} = require("../common/utils/validators");

const requestSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
    },
    Name: {
      type: String,
      required: true,
    },
    DateOfBirth: {
      type: Date,
      required: true,
    },
    HourlyRate: {
      type: Number,
      required: true,
    },
    Affiliation: {
      type: String,
      required: true,
    },
    EducationalBackground: {
      type: String,
      required: true,
    },
    Speciality: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      required: true,
      default: "Pending",
    },
    IdFileName :{
      type: String,
    },
    MedicalLicenseName :{
      type: String,
    },
    MedicalDegreeName :{
      type: String,
    },
    Type :{
      type: String,
      enum: ["Doctor", "Pharmacist"],
    },
  },
  { timestamps: true }
);

requestSchema.statics.addEntry = async function (
  username,
  password,
  email,
  name,
  dateOfBirth,
  hourlyRate,
  affiliation,
  educationalBackground,
  speciality,
  idFileName,
  medicalLicenseName,
  medicalDegreeName
) {
  // validation done here instead of in db because password will be hashed by the time it reaches the db
  if (!validatePassword(password)) {
    throw Error(
      "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const request = await this.create({
    Username: username,
    Password: hash,
    Email: email,
    Name: name,
    DateOfBirth: dateOfBirth,
    HourlyRate: hourlyRate,
    Affiliation: affiliation,
    EducationalBackground: educationalBackground,
    Speciality: speciality,
    Status: "Pending",
    IdFileName : idFileName,
    MedicalLicenseName : medicalLicenseName,
    MedicalDegreeName : medicalDegreeName
  });

  return request;
};

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
