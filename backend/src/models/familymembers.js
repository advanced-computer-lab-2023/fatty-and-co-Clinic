const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const relatives = new Schema({
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

const FamilyMem = mongoose.model("FamilyMem", relatives);
module.exports = FamilyMem;
