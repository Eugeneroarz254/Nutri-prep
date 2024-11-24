const mongoose = require("mongoose"); // Make sure mongoose is imported

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

    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    shop: {
      type: String,
    },
    stock: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    abv: {
      type: Number,
    },
 
    pricePerSize: [
      {
        size: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Size', 
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    sold: {
      type: Number,
      default: 0,
    },
    shipping: {
      type: String,
    },
    youtubeLink: {
      type: String,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    descImages: [
      {
        public_id: String,
        url: String,
      },
    ],
    descVideo: [
      {
        public_id: String,
        url: String,
      },
    ],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        name: String,
        postedby: { type: String, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

// Export the model
module.exports = mongoose.model("Product", productSchema);
