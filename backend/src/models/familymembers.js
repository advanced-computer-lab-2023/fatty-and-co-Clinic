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

const FamilyMember = mongoose.model("FamilyMem", familyMemberSchema);
module.exports = FamilyMember;
