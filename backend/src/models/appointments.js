const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentSchema = new Schema(
  {
    DoctorUsername: {
      type: String,
      required: true,
    },
    DoctorName: {
      type: String,
      required: true,
    },
    PatientUsername: {
      type: String,
      required: true,
    },
    PatientName: {
      type: String,
      required: true,
    },
    Status: {
      type: String,
      enum: ["Upcoming", "Completed", "Rescheduled", "Cancelled"],
      default: "Upcoming",
    },
    FollowUp: {
      type: Boolean,
      default: false,
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
