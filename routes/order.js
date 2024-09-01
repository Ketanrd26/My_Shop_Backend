const express = require("express");
const { verifyAdmin, verifyTokenAuth, verifyToken } = require("../middleware/verifyToken");
const { orderItem, updatedorder, Deleteorder, userorderItem, userAllorder, orderIncome } = require("../controller/order");

const orderRoute = express.Router();
orderRoute.post("/addorder", verifyToken, orderItem );
orderRoute.put("/updateorder", verifyAdmin, updatedorder );
orderRoute.delete("/deleteorder", verifyAdmin, Deleteorder );
orderRoute.get("/userorder", verifyTokenAuth, userorderItem );
orderRoute.get("/orderList", verifyAdmin, userAllorder );
orderRoute.get("/income", verifyAdmin, orderIncome );

module.exports = orderRoute 