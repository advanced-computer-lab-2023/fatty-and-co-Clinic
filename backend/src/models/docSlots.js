const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const docSlotSchema = new Schema({
  // DoctorUsername: {
  //   type: String,
  //   required: true,
  // },
  DoctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor"
  
  },
  WorkingDay: {
    type: Number,
    required: true,
  },
  //if you know the unwind thing do it with an array of numbers
  StartTime:{ 
    type: Number,
    required: false,
  },
},
{ timestamps : true });

const DocSlot = mongoose.model("DocSlot", docSlotSchema);
module.exports = DocSlot;
