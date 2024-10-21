const mongoose = require("mongoose");

const CartSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    products: [
      {
        productId: {
          type: String,
        },
        img:{
          type:String
        },
        title:{
          type:String
        },
        price:{
          type:String
        },
     
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cartItem", CartSchema);
