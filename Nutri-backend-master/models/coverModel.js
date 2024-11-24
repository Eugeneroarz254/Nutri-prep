const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var coverSchema = new mongoose.Schema(
  {

    category: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],


  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Cover", coverSchema);
