const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  PatientUsername: {
    type: String,
    ref: "Patient",
    required: true,
    trim: true,
  },
  TotalCost: {
    type: Number,
    required: true,
  },
  Medicine: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "Medicine",
  },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
