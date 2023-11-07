const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionschema = new Schema(
  {
    Patient: {
      type: mongoose.Schema.Types.ObjectId ,
      ref:"Patient",
      required: true,
    },
      PackageName: {
        type: String ,
      //  ref: "Package",
        required: false,
      },
    Status: {
        type: String,
        enum: ["Subscribed", "Unsubscribed","Cancelled"],
        default:"Subscribed",
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
