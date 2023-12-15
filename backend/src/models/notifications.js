const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new mongoose.Schema({

  receiverUsername:{
    type: String,
  },
  senderUsername:{
    type: String,
  },
  seen: {
    type: Boolean,
  }
  },
  {timestamps: true});
  
  const Notification = mongoose.model('Notification', notificationSchema);
  module.exports = Notification;
