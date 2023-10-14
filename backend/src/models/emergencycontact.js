const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencyContactSchema = new Schema({
  EmergencyContactName: {
    type: String,
    required: true,
  },
  EmergencyContactNumber: {
    type: Number,
    required: true,
  },
});

const EmergencyContact = mongoose.model(
  "EmergencyContact",
  emergencyContactSchema
);
module.exports = EmergencyContact;
