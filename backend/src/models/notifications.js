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
    Date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
