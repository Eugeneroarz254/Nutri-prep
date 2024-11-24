const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    
    // Determine the file extension based on the mimetype
    let fileExtension = ".jpeg"; // Default to .jpeg
    if (file.mimetype === 'image/webp') {
      fileExtension = ".webp";
    } else if (file.mimetype === 'image/png') {
      fileExtension = ".png";
    }
  
    cb(null, file.fieldname + "-" + uniquesuffix + fileExtension);
  }
  
});


const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/videos/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".mp4");
  },
});

const videoDescStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/videos/desc/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".mp4");
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else if (file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};


const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 }, // 1MB file size limit for images
});

const uploadVideo = multer({
  storage: videoStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 50000000 }, // 50MB file size limit for videos
});

const productImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
      fs.unlinkSync(`public/images/products/${file.filename}`);
    })
  );
  next();
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/blogs/${file.filename}`);
      fs.unlinkSync(`public/images/blogs/${file.filename}`);
    })
  );
  next();
};

/*Description*/
const descStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/description/"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniquesuffix + ".jpeg");
  },
});

const uploadDescPhoto = multer({
  storage: descStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 }, // 1MB file size limit for images
});

const uploadDescVideo = multer({
  storage: videoDescStorage,
  fileFilter: multerFilter,
  limits: { fileSize: 50000000 }, // 50MB file size limit for videos
});
/*End Description*/


module.exports = { uploadPhoto,uploadDescPhoto,uploadDescVideo, uploadVideo, productImgResize, blogImgResize };
