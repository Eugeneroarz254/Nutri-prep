const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    specifications: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
      propertyRef: {
        type: String,
        required: true,
      },
    
      type: String,

      
      location: {
        type: String,
        required: true,
      },

      bathtubs: {
        type: Number,
        required: true,
      },
    
      bedrooms: {
        type: Number,
        required: true,
      },
    
      firstName: {
        type: String,
        required: true,
      },
    
      lastName: {
        type: String,
        required: true,
      },
    
      phoneNumber: {
        type: Number,
        required: true,
      },
    

    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    videos: [
        {
          public_id: String,
          url: String,
        },
      ],
    ratings: [
      {
        star: Number,
        comment: String,
        name: String,
        postedby: { type: String, ref: "User" },
      }
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Property", productSchema);
