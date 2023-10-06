const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const familyMemberSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  NationalId: {
    type: String,
    required: true,
    trim: true,
    unique: true,
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
    required: true,
  },
});

const FamilyMember = mongoose.model("FamilyMember", familyMemberSchema);
module.exports = FamilyMember;
