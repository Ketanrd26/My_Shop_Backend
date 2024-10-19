const multer = require ("multer")
const path = require("path")
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require("../utils/cloudinary")



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    folder: 'productImages', // Name of the folder in Cloudinary
    allowedFormats: ['jpg', 'png', 'jpeg'], // Allowed file formats
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
});
  const upload = multer({
    storage: storage,
  });

  module.exports = upload