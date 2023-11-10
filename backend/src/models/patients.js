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
      type: Number,
      required: false,
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
      type: { FullName: String, PhoneNumber: Number },
      required: true,
    },
    PackageName: {
      type: String,
      ref: "Package",
      required: false,
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
  },
  { timestamps: true }
);

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
