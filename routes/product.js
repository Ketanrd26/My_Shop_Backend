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

const upload = require("../middleware/multer")



const productRoute = express.Router();



productRoute.post("/addProduct", upload.single("img"), verifyAdmin, productAdd);
productRoute.put("/updateProduct/:id", verifyAdmin, updatedProduct);
productRoute.delete("/deleteProduct/:id", verifyAdmin, DeleteProduct);
productRoute.post("/productItem/:id", ProductItem);
productRoute.get("/productList", ProductItemList);
module.exports = productRoute;
