const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return re.test(email);
};

const systemUsers = new Schema(
  {
    Username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    Password: {
      type: String,
      required: true,
    },
    Email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      validate: [validateEmail, "Please fill a valid email address"],
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
