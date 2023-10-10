const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    DoctorUsername: {
      type: String,
      ref: "Doctor",
      required: true,
    },
    PatientUsername: {
      type: String,
      ref: "Patient",
      required: true,
    },
    Status: {
      type: String,
      enum: ["Upcoming", "Completed", "Rescheduled", "Cancelled"],
      default: "Upcoming",
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
