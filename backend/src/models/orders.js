const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  PatientUsername: {
    type: String,
    ref: "Patient",
    required: true,
    trim: true,
  },
  Date: {
    type: Date,
    required: true,
  },
  Status: {
    type: String,
    enum: ["In Progress", "Cancelled", "Completed"],
    default: "In Progress",
    required: true,
  },
  Details: {
    type: String,
    required: false,
  },
  TotalCost: {
    type: Number,
    required: true,
  },
  PaymentMethod: {
    type: String,
    enum: ["Wallet", "Cash", "Credit Card"],
    required: true,
  },
  Medicine: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Medicine",
    required: true,
  },
  DeliveryAddress: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
