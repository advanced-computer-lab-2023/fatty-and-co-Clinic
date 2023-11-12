const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionschema = new Schema(
  {
    Patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: false,
    },
    FamilyMem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FamilyMember",
      required: false,
    },
    Package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: false,
    },
    Status: {
      type: String,
      enum: ["Subscribed", "Unsubscribed", "Cancelled"],
      default: "Unsubscribed",
      required: false,
    },
    Startdate: {
      type: Date,
      required: false,
      // default:timestamps, // does it get current time
    },
    Renewaldate: {
      type: Date,
      required: false,
    },
    Enddate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

subscriptionschema.statics.addEntry = async function (patient) {
  const unSubscribed = await this.create({
    Patient: patient,
    Status: "Unsubscribed",
  });
  return unSubscribed;
};

subscriptionschema.statics.addEntry1 = async function (newFamilymember) {
  const unSubscribed = await this.create({
    FamilyMem: newFamilymember,
    Status: "Unsubscribed",
  });
  return unSubscribed;
};

const Package = mongoose.model("subscription", subscriptionschema);
module.exports = Package;
