const multer = require ("multer")
const path = require("path")

const storage = multer.diskStorage({
    destination: "./productImages/", // Directory where the file will be saved
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    },
  });
  
  const upload = multer({
    storage: storage,
  });

  module.exports = upload