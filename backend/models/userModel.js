const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.methods.checkPassword = async function (enteredPass) {
  return await bcrypt.compare(enteredPass, this.password);
};

const User = (module.exports = mongoose.model("User", userSchema));
module.exports.get = (callback, limit) => {
  User.find(callback).limit(limit);
};
