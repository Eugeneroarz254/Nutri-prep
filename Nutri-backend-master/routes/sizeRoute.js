const express = require("express");
const {
  createSize,
  updateSize,
  deleteSize,
  getSize,
  getAllSizes,
} = require("../controller/sizeCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createSize);
router.put("/:id", authMiddleware, isAdmin, updateSize);
router.delete("/:id", authMiddleware, isAdmin, deleteSize);
router.get("/:id", getSize);
router.get("/", getAllSizes);




module.exports = router;
;