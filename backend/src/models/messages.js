const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  // user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  //   timestamp: { type: Date, default: Date.now },

  receiverUsername:{
    type: String,
  },
  senderUsername:{
    type: String,
  },
  text: {
    type: String,
  }
  },
  {timestamps: true});
  
  const Message = mongoose.model('Message', messageSchema);
  module.exports = Message;
