const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const familyMemberSchema = new Schema(
  {
    Patient: {
      type: mongoose.Schema.Types.ObjectId, //Changed this to id ref
      ref: "Patient",
      required: true,
    },
    FamilyMem: {
      //ID of family member in table patient (in case he was a logged in user as well)
      type: mongoose.Schema.Types.ObjectId, //Changed this to id ref
      ref: "Patient",
      required: false,
    },
    Name: {
      type: String,
      required: true,
    },
    NationalIdFam: {
      type: String,
      required: true,  

    },
    Age: {
      type: Number,
      required: true,
    },
    Gender: {
      type: String,
      enum: ["M", "F"],
      required: true,
    },
    Relation: {
      type: String,
      enum: ["Spouse", "Child","Father"],
      required: false,
    },
  },
  { timestamps: true }
);

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);
module.exports = FamilyMember;
