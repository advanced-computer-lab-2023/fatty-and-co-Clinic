const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const patientSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      trim: true,
      ref: "User",
      unique: true,
    },
    Name: {
      type: String,
      required: true,
    },
    MobileNum: {
      type: Number,
      required: true,
      unique: true,
    },
    NationalId: {
      type: String,
      required: true,
      unique: true,
    },
    DateOfBirth: {
      type: Date,
      required: true,
    },
    Gender: {
      type: String,
      enum: ["M", "F"],
      required: true,
    },
    EmergencyContact: {
      type: { FullName: String, PhoneNumber: Number, Relation: String }, //NOT SURE OF THIS SYNTAX
      required: true,
    },
    Wallet: {
      type: Number,
      required: false,
      default: 5000,
    },
    LinkedPatients: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "Patient",
        },
      ],
      required: true,
    },
    MedicalHistory: {
      // i want medical history to be a array of pairs of strings
      type: [{ filename: String, originalname: String, note: String }],
      required: false,
    },
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
