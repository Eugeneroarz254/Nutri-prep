const express = require("express");
const {
  createCover,
  getACover,
  getAllCovers,
  updateCover,
  deleteCover,
} = require("../controller/CoverCtrl"); 
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCover); // Use createCover

router.get("/:id", getACover); // Use getACover
router.put("/:id", authMiddleware, isAdmin, updateCover); // Use updateCover
router.delete("/:id", authMiddleware, isAdmin, deleteCover); // Use deleteCover

router.get("/", getAllCovers); // Use getAllCovers

module.exports = router;
