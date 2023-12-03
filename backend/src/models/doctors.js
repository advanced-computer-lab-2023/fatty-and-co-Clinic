const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const doctorSchema = new Schema(
  {
    Username: {
      type: String,
      required: true,
      ref: "User",
      trim: true,
      unique: true,
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
    Speciality: {
      type: String,
      lowercase: true,
      required: true,
    },
    Wallet: {
      type: Number,
      required: true,
      default: 0,
    },
    //Adding working days and working hours to doctor
    //to get available timings of sessions for patients.

    // WorkingDays: {
    //   //type is number so it's easier to compare with the getDay method
    //   //for example (0-6 ---> Sunday-Saturday)
    //   type: [Number],
    //   required: false,
    // },
    // StartTime: {
    //   type: Number,
    //   required: false,
    // },
    // EndTime: {
    //   type: Number,
    //   required: false,
    // },
  },
  { timestamps: true }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
