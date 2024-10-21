const cart = require("../models/cart");

// create cart
// const cartItem = async (req, res) => {
 

//   try {
//     const newCart = new cart(req.body);

//     const savedCard = await newCart.save();

 
  
//     res.status(200).json(savedCard);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

const cartItem = async (req, res) => {
  const { userId, productId, quantity, img, title, price } = req.body;

  try {
    // Find the user's cart
    let userCart = await cart.findOne({ userId });

    if (userCart) {
      // Check if the product already exists in the cart
      const productIndex = userCart.products.findIndex(
        (product) => product.productId === productId
      );

      if (productIndex > -1) {
        // Product exists in the cart, update the quantity
        userCart.products[productIndex].quantity += quantity || 1;
      } else {
        // Product doesn't exist in the cart, add it with all details
        userCart.products.push({
          productId,
          img,
          title,
          price,
          quantity: quantity || 1
        });
      }

      // Save the updated cart
      const updatedCart = await userCart.save();
      res.status(200).json(updatedCart);
    } else {
      // No cart exists for the user, create a new one with full product details
      const newCart = new cart({
        userId,
        products: [
          {
            productId,
            img,
            title,
            price,
            quantity: quantity || 1
          }
        ]
      });
      const savedCart = await newCart.save();
      res.status(200).json(savedCart);
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
