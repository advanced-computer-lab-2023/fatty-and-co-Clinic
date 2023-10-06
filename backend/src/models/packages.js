const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const packageSchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Price: {
    type: Number,
    required: true
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
  }
}, { timestamps: true });

const Package = mongoose.model('packageSchema', packageSchema);
module.exports = Package;