const express = require("express");
const {
  createProperty, // Update import to use createProperty
  getProperty, // Update import to use getProperty
  getAllProperties, // Update import to use getAllProperties
  updateProperty, // Update import to use updateProperty
  deleteProperty, // Update import to use deleteProperty
  addToWishlist,
  rating,
} = require("../controller/propertyCtrl"); // Update controller import to use propertyCtrl
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProperty); // Update route handler to use createProperty

router.get("/:id", getProperty); // Update route handler to use getProperty
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);

router.put("/:id", authMiddleware, isAdmin, updateProperty); // Update route handler to use updateProperty
router.delete("/:id", authMiddleware, isAdmin, deleteProperty); // Update route handler to use deleteProperty

router.get("/", getAllProperties); // Update route handler to use getAllProperties

module.exports = router;
