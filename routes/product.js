const express = require("express");
const {
  productAdd,
  updatedProduct,
  DeleteProduct,
  ProductItem,
  ProductItemList,
} = require("../controller/product");
const { verifyAdmin } = require("../middleware/verifyToken");
const multer = require("multer");
const path = require("path")
const productRoute = express.Router();

const storage = multer.diskStorage({
  destination: "./productImages/",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage: storage,
});

productRoute.post("/addProduct", upload.single("img"), verifyAdmin, productAdd);
productRoute.put("/updateProduct/:id", verifyAdmin, updatedProduct);
productRoute.delete("/deleteProduct/:id", verifyAdmin, DeleteProduct);
productRoute.post("/productItem/:id", ProductItem);
productRoute.post("/productList", ProductItemList);
module.exports = productRoute;
