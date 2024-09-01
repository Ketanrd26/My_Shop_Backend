const order = require("../models/order");

// create cart
const orderItem = async (req, res) => {
  const neworder = new order(req.body);

  try {
    const savedCard = await neworder.save();
    res.status(200).json(savedCard);
  } catch (error) {
    res.status(500).json(error);
  }
};

// update order
const updatedorder = async (req, res) => {
  const { id } = req.params;

  try {
    const updateorder = await order.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updateorder);
  } catch (error) {
    res.status(500).json(error);
  }
};

// delete order
const Deleteorder = async (req, res) => {
  const { id } = req.params;

  try {
    await order.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "order has been deleted",
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//   get user order
const userorderItem = async (req, res) => {
  const { userId } = req.params;

  try {
    const orderItem = await order.find(userId);

    res.status(200).json({
      status: "success",
      orderItem,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//   get order
const userAllorder = async (req, res) => {
  try {
    const orderItem = await order.find();

    res.status(200).json({
      status: "success",
      orderItem,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

//   get monthly income

const orderIncome = async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const orderAmountIncome = await order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: previousMonth,
          },
        },
      },

      {
        $project: {
          month: {
            $month: "$createdAt",
          },
          sales: "$amount",
        },
      },

      {
        $group: {
          _id: "$month",
          total: {
            $sum: "$sales",
          },
        },
      },
    ]);

    res.status(200).json(orderAmountIncome)
  } catch (error) {
    res.status(500).json(error)
  }
};
module.exports = {
  orderItem,
  updatedorder,
  Deleteorder,
  userorderItem,
  userAllorder,
  orderIncome
};
