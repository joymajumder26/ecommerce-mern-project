const { Schema, Model, model } = require("mongoose");
const bcrypt = require("bcrypt");
const { defaultImagePath } = require("../secret");

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "User name is required"],
    trim: true,
    maxlength: [31, "The Length of User name can be maximum 31 characters"],
    minlength: [3, "The Length of User name can be maximum 3 characters"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "User password is required"],
    minlength: [6, "The Length of User password can be maximum 6 characters"],
    set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
  },
  image: {
    type: String,
    default:
      defaultImagePath,
  },
  address: {
    type: String,
    required: [true, "User address is required"],
  },
  phone: {
    type: String,
    required: [true, "User phone is required"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isBanned: {
    type: Boolean,
    default: false,
  },
 
},
{
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
}
);

const User = model("Users", userSchema);
module.exports = User;
