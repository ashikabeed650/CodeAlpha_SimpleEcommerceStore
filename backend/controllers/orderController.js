import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const order = await Order.create({
      user: req.user._id,

      products: req.body.products.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      })),

      totalAmount: req.body.totalAmount,
    });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("products.product");

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};