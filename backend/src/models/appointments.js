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
