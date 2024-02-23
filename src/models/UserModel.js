const bcrpyt = require("bcrypt");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    lastName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    userName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      trim: true,
      unique: true,
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
    refresh_token: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("fullName").get(() => {
  return `${this.firstName} ${this.lastName}`;
});

userSchema.method({
  isPasswordMatched: function (password) {
    return bcrpyt.compareSync(password, this.password);
  },
});

module.exports = mongoose.model("User", userSchema);
