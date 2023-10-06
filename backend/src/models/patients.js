const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImportFamObject = require("./familymembers");

const patients = new Schema(
  {
    Username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    MobileNum: {
      type: Number,
      required: true,
    },
    DateOfBirth: {
      type: Date,
      required: true,
    },
    EmergencyContact: {
      type: { FullName: String, PhoneNumber: Number }, //NOT SURE OF THIS SYNTAX
    },
    FamilyMem: {
      type: [ImportFamObject.FamilyMem], //NOT SURE MEN LAW DA VALID TYPE
      required: false,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patients);
module.exports = Patient;
