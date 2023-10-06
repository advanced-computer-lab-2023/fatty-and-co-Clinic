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
    },
    FamilyMem: [
      {
        Name: {
          type: String,
          required: true,
        },
        NationalId: {
          type: String,
          required: true,
          trim: true,
          unique: true,
        },
        Age: {
          type: Number,
          required: true,
        },
        Gender: {
          type: String,
          enum: ["M", "F"],
          required: true,
        },
        Relation: {
          type: String,
          required: true,
        },
      },
    ],
    PackageName: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
