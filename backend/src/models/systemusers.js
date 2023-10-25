const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
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

systemUsersSchema.statics.addEntry = async function (
  username,
  password,
  email,
  type
) {
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    Username: username,
    Password: hash,
    Email: email,
    Type: type,
  });

  return user;
};

systemUsersSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("Please fill in all fields!");
  }

  const user = await this.findOne({ Username: username });

  if (!user) {
    throw Error("Username does not exist");
  }

  const passwordMatch = await bcrypt.compare(password, user.Password);

  if (!passwordMatch) {
    throw Error("Incorrect Password");
  }

  return user;
};

const User = mongoose.model("User", systemUsersSchema);
module.exports = User;
