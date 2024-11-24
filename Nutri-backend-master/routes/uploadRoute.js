const express = require("express");
const { uploadImages, uploadVideos, deleteImages, deleteVideos, uploadDescImages, uploadDescVideos } = require("../controller/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize, uploadVideo, uploadDescPhoto, uploadDescVideo } = require("../middlewares/uploadImage");
const router = express.Router();

// Upload Images Route
router.post(
  "/images",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 10),
  productImgResize,
  uploadImages
);

//Upload Description Images Route
router.post(
  "/desc/images",
  authMiddleware,
  isAdmin,
  uploadDescPhoto.array("images", 10),
  productImgResize,
  uploadDescImages
);

// Upload Videos Route
router.post(
  "/videos",
  authMiddleware,
  isAdmin,
  uploadVideo.array("videos", 10), // Adjust the field name and limit as needed
  uploadVideos
);


router.post(
  "/desc/videos",
  authMiddleware,
  isAdmin,
  uploadDescVideo.array("videos", 10), // Adjust the field name and limit as needed
  uploadDescVideos
);

// Delete Images Route
router.delete("/images/:id", authMiddleware, isAdmin, deleteImages);
router.delete("/desc/images/:id", authMiddleware, isAdmin, deleteImages);

// Delete Videos Route
router.delete("/video/:id", authMiddleware, isAdmin, deleteVideos);
router.delete("/desc/video/:id", authMiddleware, isAdmin, deleteVideos);


module.exports = router;
