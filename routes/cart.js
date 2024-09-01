const express = require("express");
const cart = require("../models/cart");
const { verifyToken, verifyTokenAuth, verifyAdmin } = require("../middleware/verifyToken");
const { cartItem, updatedCart, DeleteCart, userCartItem, userAllCart } = require("../controller/cart");

const cartRoute = express.Router();
cartRoute.post("/addCart", verifyToken, cartItem );
cartRoute.put("/updateCart", verifyTokenAuth, updatedCart );
cartRoute.delete("/deleteCart", verifyTokenAuth, DeleteCart );
cartRoute.get("/userCart", verifyTokenAuth, userCartItem );
cartRoute.get("/CartList", verifyAdmin, userAllCart );

module.exports = cartRoute 