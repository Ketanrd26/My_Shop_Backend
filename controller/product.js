const product = require("../models/product");

// add product

const productAdd = async (req, res) => {
  const productList = new product(req.body);

  try {
    const newProduct = await productList.save();

    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// updated product

const updatedProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const updateProduct = await product.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete product
const DeleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    await product.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "product has been deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get product by id
const ProductItem = async (req, res) => {
  const { id } = req.params;

  try {
    const productItem = await product.findById(id);

    res.status(200).json({
      status: "success",
      productItem,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

// get all product
const ProductItemList = async (req, res) => {
  //   const { id } = req.params;
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;

    if(qNew){
        products = await product.find().sort({createdAt:-1}).limit(5);

    }else if(qCategory){
        products = await product.find({
            categories:{
                $in:[
                    qCategory
                ]
            }
        })
    }else{
        products = await product.find()
    }

    res.status(200).json({
      status: "success",
      products,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  productAdd,
  updatedProduct,
  DeleteProduct,
  ProductItem,
  ProductItemList,
};
