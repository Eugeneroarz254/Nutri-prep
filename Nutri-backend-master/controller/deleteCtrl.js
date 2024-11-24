// deleteCtrl.js

const mongoose = require("mongoose");
const cron = require("node-cron");
const PaymentStatusModel = require("../models/paymentStatusModel");

require("dotenv").config(); // Load environment variables from .env file

// Get the MongoDB URI from the environment variables
const mongodbUrl = process.env.MONGODB_URL;

// Connect to the MongoDB database
mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to delete payment statuses
const deletePaymentStatuses = async () => {
  try {
    const currentTime = new Date();
    console.log(`Deletion task started at ${currentTime}`);

    // Calculate the timestamp 3 minutes ago
    const threeMinutesAgo = new Date(currentTime - 60 * 60 * 1000);

    // Check if there are any payment statuses to delete
    const paymentStatusCount = await PaymentStatusModel.countDocuments({ createdAt: { $lt: threeMinutesAgo } });

    if (paymentStatusCount > 0) {
      console.log(`Deleting payment statuses created before ${threeMinutesAgo}`);

      // Delete payment statuses created before the calculated timestamp
      const deleted = await paymentStatusModel.deleteMany({ createdAt: { $lt: threeMinutesAgo } });

      console.log(`Deleted ${deleted.deletedCount} payment statuses.`);
    } else {
      console.log("No payment statuses to delete.");
    }
  } catch (error) {
    console.error("Error deleting payment statuses:", error.message);
  }
};

// Schedule a task to delete payment statuses every 3 minutes
cron.schedule("*/60 * * * *", deletePaymentStatuses);

module.exports = {
  deletePaymentStatuses, // Export the delete function
};
