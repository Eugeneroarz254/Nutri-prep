const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
  cloudinaryUploadVideo,
  cloudinaryUploadDescImg,
  cloudinaryDeleteDescImg,
} = require("../utils/cloudinary");


const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files provided for upload" });
    }

    for (const file of files) {
      const { path } = file;

      try {
        const newpath = await uploader(path);
        console.log(newpath);

        urls.push(newpath);
        // Use fs.unlink asynchronously to avoid EBUSY error
        fs.unlink(path, (err) => {
          if (err) {
            console.error("Error deleting local file:", err);
          } else {
            console.log("Successfully deleted local file:", path);
          }
        });
      } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ message: "Error uploading file to Cloudinary" });
      }
    }

    const images = urls.map((file) => {
      return file;
    });

    res.json(images);
  } catch (error) {
    console.error("Error in uploadImages:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

const uploadVideos = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadVideo(path, "videos");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const videos = urls.map((file) => {
      return file;
    });
    res.json(videos);
  } catch (error) {
    throw new Error(error);
  }
});


const deleteVideos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "videos");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

/*Description*/
const uploadDescImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files provided for upload" });
    }

    for (const file of files) {
      const { path } = file;

      try {
        const newpath = await uploader(path);
        console.log(newpath);

        urls.push(newpath);
        // Use fs.unlink asynchronously to avoid EBUSY error
        fs.unlink(path, (err) => {
          if (err) {
            console.error("Error deleting local file:", err);
          } else {
            console.log("Successfully deleted local file:", path);
          }
        });
      } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return res.status(500).json({ message: "Error uploading file to Cloudinary" });
      }
    }

    const images = urls.map((file) => {
      return file;
    });

    res.json(images);
  } catch (error) {
    console.error("Error in uploadImages:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
});

const deleteDescImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteDescImg(id, "images");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

const uploadDescVideos = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadVideo(path, "videos");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log("newpath",newpath);
      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const videos = urls.map((file) => {
      return file;
    });
    res.json(videos);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteDescVideos = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "videos");
    res.json({ message: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

/*End Description*/

module.exports = {
  uploadImages,
  deleteImages,
  uploadVideos, 
  deleteVideos,
  uploadDescImages,
  deleteDescImages,
  uploadDescVideos,
  deleteDescVideos, 
};


