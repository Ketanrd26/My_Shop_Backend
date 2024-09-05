const cart = require("../models/cart");

// create cart
const cartItem = async (req, res) => {
  const newCart = new cart(req.body);

  try {
    const savedCard = await newCart.save();
    res.status(200).json(savedCard);
  } catch (error) {
    res.status(500).json(error);
  }
};


// update cart
const updatedCart = async (req, res) => {
    const { id } = req.params;
  
    try {
      const updateCart = await cart.findByIdAndUpdate(
        id,
        {
          $set: req.body,
        },
        { new: true }
      );
  
      res.status(200).json(updateCart);
    } catch (error) {
      res.status(500).json(error);
    }
  };


// delete cart
const DeleteCart = async (req, res) => {
    const { id } = req.params;
  
    try {
      await cart.findByIdAndDelete(id);
  
      res.status(200).json({
        status: "success",
        message: "cart has been deleted",
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };


//   get user cart
const userCartItem = async (req, res) => {
    const { userId } = req.params;
  
    try {
      const cartItem = await cart.find({ userId: userId });
  
      res.status(200).json({
        status: "success",
        cartItem,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };

//   get cart
const userAllCart = async (req, res) => {

  
    try {
      const cartItem = await cart.find();
  
      res.status(200).json({
        status: "success",
        cartItem,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  };
module.exports = { cartItem,updatedCart ,DeleteCart,userCartItem, userAllCart};
