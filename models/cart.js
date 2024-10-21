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
        title:{
          type:String
        },
        img:{
          type:String
        },
        price:{
          type:String
        }

        // qantity: {
        //   type: Number,
        //   default: 1,
        // },
      },
    ],
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("cartItem", CartSchema);
