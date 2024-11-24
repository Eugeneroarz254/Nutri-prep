const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shippingInfo: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      county: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      other: {
        type: String,
      },
      area: {
        type: String,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      additionalNumber: {
        type: String,
      },
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"Product"
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
 
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },

        trackingInfo: {
          trackingNumber: {
            type: String,
          },

          status: {
            type: String,
          },
          startDate: { type: Date, required: true },
          endDate: { type: Date, required: true },
 
        },
      },
    ],
    paidAt: {
      type: Date,
      default: Date.now,
    },
    month: {
      type: String,
      default: new Date().getMonth(),
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    totalPriceAfterDiscount: {
      type: Number,
      required: true,
    },
    orderStatus: {
      type: String,
      default: "Ordered",
    },
    viewed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("Order", orderSchema);
