const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const requestSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      trim: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    DateOfBirth: {
      type: Date,
      required: true,
    },
    HourlyRate: {
      type: Number, //NOT SURE OF TYPE
      required: true,
    },
    Affiliation: {
      type: String,
      required: true, //ASSUMING ONE HOSPITAL LAW LA DO A SUBSCHEMA BADAL STRING ZAY FAM RELATIVES
    },
    EducationalBackground: {
      type: String, //Assuming just medicine degree aw 7aga
      required: true,
    },
    Status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      required: true,
    },
  },
  { timestamps: true }
);

const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
