const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
// Declare the Schema of the Mongo model
var otpSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
   
   
    otp: {
        type: String,
        required: true,
      },
      expiration: {
        type: Date,
        required: true,
      },
    
},
{
  timestamps: true,
}  
   
 
);


//Export the model
module.exports = mongoose.model("Otp", otpSchema);
