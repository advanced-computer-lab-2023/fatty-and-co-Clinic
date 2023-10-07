const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const packageSchema = new Schema(
  {
    Name: {
      type: String,
      enum: ["Silver", "Gold", "Platinum"],
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Session_Discount: {
      type: Number,
      required: true,
    },
    Medicine_Discount: {
      type: Number,
      required: true,
    },
    Family_Discount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Package = mongoose.model("Package", packageSchema);
module.exports = Package;
