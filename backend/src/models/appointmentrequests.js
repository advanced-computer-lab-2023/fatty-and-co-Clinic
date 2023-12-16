const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const appointmentrequestSchema = new Schema(
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
      ref: "Patient",
      required: true,
    },
    PatientName: {
      type: String,
      required: true,
    },
    FollowUp: {
      type: Boolean,
      default: true,
    },
    Date: {
      type: Date,
      required: true,
    },
    Status: {
        type: String,
        required: true,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },
  },
  { timestamps: true }
);

const AppointmentRequest = mongoose.model("AppointmentRequest", appointmentrequestSchema);
module.exports = AppointmentRequest;
