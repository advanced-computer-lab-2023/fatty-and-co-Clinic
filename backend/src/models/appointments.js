const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicine = new Schema({
  Name: {
    type: String,
    required: true,
  },
});

const prescription = new Schema({
  Diagnosis: {
    type: String,
    required: true,
  },
  Advised: {
    type: medicine,
    required: true,
  },
});

const appointmentSchema = new Schema(
  {
    DoctorUsername: {
      //Doctor's USERNAME
      type: String,
      required: true,
    },
    PatientUsername: {
      type: String,
      required: true,
    },
    Status: {
      type: Boolean,
      default: 0, //Check if cancelling is an option ----Note: 0= not yet made    AND   1= appointment is made
    },
    Prescription: {
      type: prescription,
      required: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
