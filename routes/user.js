const express = require("express");
const { updatedUser, deleteUser, userAdmin, userList, userStats } = require("../controller/user");
const { verifyTokenAuth, verifyAdmin } = require("../middleware/verifyToken");


const userRoute = express.Router();
userRoute.put("/:id", verifyTokenAuth, updatedUser);
userRoute.delete("/:id", verifyTokenAuth, deleteUser);
userRoute.get("/find/:id", verifyAdmin, userAdmin);
userRoute.get("/userList", verifyAdmin, userList);
userRoute.get("/userStats", verifyAdmin, userStats);

module.exports = userRoute;
