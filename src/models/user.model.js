const { number } = require("joi");
const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const config = require("../config/config");
const bcrypt = require("bcryptjs");


// TODO: CRIO_TASK_MODULE_UNDERSTANDING_BASICS - Complete userSchema, a Mongoose schema for "users" collection
const userSchema = mongoose.Schema(
  {
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true, unique: true, lowercase: true,
      validate: (email)=>{
        return validator.isEmail(email)
      }
    },
    password: {
      type: String,
      validate: (value) =>{
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    walletMoney: {type: Number, required: true, default: config.default_wallet_money},
    address: { type: String, default: config.default_address },
  },
  // Create createdAt and updatedAt fields automatically
  {
    timestamps: true,
  }
);


userSchema.statics.isEmailTaken = async function (email) {
  const emailFound = await this.findOne({email: email});
  if(emailFound){
    return true;
  }
  else{
    return false;
  }
};


userSchema.methods.isPasswordMatch = async function (password) {
  const isValid = await bcrypt.compare(password, this.password)
  return isValid;
};

userSchema.methods.hasSetNonDefaultAddress = async function () {
  const user = this;
   return user.address !== config.default_address;
};

const User = mongoose.model("user", userSchema);

module.exports = {User};
