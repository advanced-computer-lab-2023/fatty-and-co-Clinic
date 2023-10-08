const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
  AppointmentId: {
    type: Number,
    required: true,
  },
  DoctorUsername: {
    type: String,
    required: true,
  },
  PatientUsername: {
    type: String,
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
