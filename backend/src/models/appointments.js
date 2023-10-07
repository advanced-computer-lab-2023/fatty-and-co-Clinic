const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    DoctorUsername: {
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

    Date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
