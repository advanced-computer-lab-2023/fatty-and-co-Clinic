const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  AppointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  DoctorUsername: {
    type: String,
    ref: "Doctor",
    required: true,
  },
  DoctorName: {
    type: String,
    ref: "Doctor",
    required: true,
  },
  PatientUsername: {
    type: String,
    ref: "Patient",
    required: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Diagnosis: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    enum: ["Filled", "Unfilled"],
    default: "Unfilled",
  },
  Medicine: [
    {
      Name: {
        type: String,
        required: true,
      },
    },
  ],
});

const Prescription = mongoose.model("Prescription", prescriptionSchema);
module.exports = Prescription;
