const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  validateEmail,
  validatePassword,
} = require("../common/utils/validators");

const systemUsersSchema = new Schema(
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
      validate: [
        validatePassword,
        "Password needs to have at least 1 uppercase character, 1 lowercase character, 1 number, and 1 special character.",
      ],
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
    JwtToken: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", systemUsersSchema);
module.exports = User;
