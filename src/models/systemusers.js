const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const systemUsers = new Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
    },
    Type: {
      type: String,
      enum: ["Admin", "Patient", "Doctor"],
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", systemUsers);
module.exports = User;
