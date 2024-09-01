const express = require("express");
const {register,login, updatedUser} = require("../controller/user");
const authRoute = express.Router();
// register
authRoute.post("/register", register);
authRoute.post("/login", login);

module.exports = authRoute 