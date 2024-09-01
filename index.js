const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors")





const app = express();
app.use(cors())
app.use(express.json());
dotenv.config();


const mongoDbShell = process.env.MONGO_URI;
const port = process.env.PORT || 5000

app.get("/",(req,res)=>{
    res.send("hello world")
})

app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/product", productRoute)
app.use("/cart", cartRoute)
app.use("/orders", orderRoute)
mongoose
  .connect(
    mongoDbShell
  )
  .then(()=>{
    console.log("your database connected")
  }).catch((error)=>{
console.log(error)
  })
app.listen(port, () => {
  console.log(`your app running on ${port}`);
});
