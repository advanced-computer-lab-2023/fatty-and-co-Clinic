const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { validateEmail } = require("../common/utils/validators");

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
