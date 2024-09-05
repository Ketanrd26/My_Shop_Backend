const express = require("express");
const {
  productAdd,
  updatedProduct,
  DeleteProduct,
  ProductItem,
  ProductItemList,
} = require("../controller/product");
const { verifyAdmin } = require("../middleware/verifyToken");

const productRoute = express.Router();

productRoute.post("/addProduct", verifyAdmin, productAdd);
productRoute.put("/updateProduct/:id", verifyAdmin, updatedProduct);
productRoute.delete("/deleteProduct/:id", verifyAdmin, DeleteProduct);
productRoute.post("/productItem/:id", ProductItem);
productRoute.post("/productList", ProductItemList);
module.exports = productRoute;
