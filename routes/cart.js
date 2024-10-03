const express = require("express");
const cart = require("../models/cart");
const { verifyToken, verifyTokenAuth, verifyAdmin } = require("../middleware/verifyToken");
const { cartItem, updatedCart, DeleteCart, userCartItem, userAllCart, userCartItemLength } = require("../controller/cart");

const cartRoute = express.Router();
cartRoute.post("/addCart", verifyTokenAuth, cartItem );
cartRoute.put("/updateCart", verifyTokenAuth, updatedCart );
cartRoute.delete("/deleteCart", verifyTokenAuth, DeleteCart );
cartRoute.get("/userCart/:userId", verifyTokenAuth, userCartItem );
cartRoute.post("/userCartLength", verifyTokenAuth, userCartItemLength );
cartRoute.get("/CartList", verifyAdmin, userAllCart );

module.exports = cartRoute 