const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionschema = new Schema(
  {
    Patient: {
    type:  mongoose.Schema.Types.ObjectId,
    ref:"Patient",
      required: true,
    },
    Status: {
        type: String,
        enum: ["Subscribed", "Unsubscribed","Cancelled"],
        default:"Unsubscribed",
        required:false,
    },
    Startdate: {
      type: Date,
      required: false,
     // default:timestamps, // does it get current time 
    },
    Enddate: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("subscription", subscriptionschema);
module.exports = Package;
