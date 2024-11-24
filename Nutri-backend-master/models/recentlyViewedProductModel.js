const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var RecentlyViewedProductSchema = new mongoose.Schema(
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
    previousPrice: {
      type: Number,
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
    
      type: String,
    
    brand: {
      type: String,
    },
    
    shop:{
      type: String
    },
    team:{
      type: String
    },
    size: [{
      type: mongoose.Schema.Types.ObjectId,
     ref: 'Size'
    }],

      quantity: {
      type: Number,
      required: true,
    },
    abv: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
      mutable: true,
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
 color: [{type:mongoose.Schema.Types.ObjectId,ref:"Color"}],
    tags: String,
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
module.exports = mongoose.model("RecentlyViewedProduct", RecentlyViewedProductSchema);
