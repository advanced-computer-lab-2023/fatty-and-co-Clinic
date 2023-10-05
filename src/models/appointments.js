const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const manyMeds = new Schema({
  Medicine: {
    type: String,
    required: true,
  },
});

const prescriptionMade = new Schema({
  Diagnosis: {
    type: String,
    required: true,
  },
  Advised: {
    type: [manyMeds],
    required: true,
  },
});
const appointments = new Schema(
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
      type: [prescriptionMade],
      required: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointments);
module.exports = Appointment;
