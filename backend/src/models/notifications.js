const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Message: {
      type: String,
      required: true,
    },
    Username: {
      type: String,
      required: true,
    },
    Clicked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
