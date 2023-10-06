const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImportFamObject = require("./familymembers");

const patientSchema = new Schema(
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
      required: false,
    },
    FamilyMem: {
      type: [ImportFamObject.FamilyMem], //NOT SURE MEN LAW DA VALID TYPE
      required: false,
    },
    PackageName: {
      type: String,
      enum: ["Silver", "Gold", "Platinum"],
      required: false,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
