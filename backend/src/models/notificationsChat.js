const { ObjectId } = require("bson");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationChatSchema = new mongoose.Schema({

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
  
  const NotificationChat = mongoose.model('NotificationChat', notificationChatSchema);
  module.exports = NotificationChat;

