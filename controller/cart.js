const cart = require("../models/cart");

// create cart
const cartItem = async (req, res) => {
  const { userId, productId, img, title, price } = req.body;

  try {
    // Find existing cart by userId
    let userCart = await cart.findOne({ userId: userId });

    if (userCart) {
      // If the user already has a cart, push the new product into the products array
      userCart.products.push({
        productId,
        img,
        title,
        price
      });
      await userCart.save(); // Save the updated cart
      res.status(200).json(userCart); // Return the updated cart
    } else {
      // If no cart exists for the user, create a new cart
      const newCart = new cart({
        userId,
        products: [
          {
            productId,
            img,
            title,
            price
          }
        ]
      });
      const savedCart = await newCart.save(); // Save the new cart
      res.status(200).json(savedCart); // Return the newly created cart
    }
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
      const cartItem = await cart.findByIdAndDelete(id);
  
      res.status(200).json({
        cartItem:cartItem,
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


  // get user cart Length
  const userCartItemLength = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const cartItem = await cart.find({ userId: userId });
  
      // Collect all productIds
      const allProductIds = cartItem.flatMap(item => item.products.map(product => product.productId));
  
      // Filter out duplicates by using a Set
      const uniqueProductIds = [...new Set(allProductIds)];
  
      res.status(200).json({
        status: "success",
        cartItem,
        cartItemLength: uniqueProductIds.length 
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
module.exports = { cartItem,updatedCart ,DeleteCart,userCartItem, userAllCart, userCartItemLength};
