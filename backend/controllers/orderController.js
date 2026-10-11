import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

export const placeOrder = async (req, res) => {
  try {
    const { products, address } = req.body || {};

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Your cart is empty." });
    }

    const quantities = new Map();
    for (const item of products) {
      if (
        !item?._id ||
        !mongoose.isValidObjectId(item._id) ||
        !Number.isInteger(item.quantity) ||
        item.quantity < 1
      ) {
        return res.status(400).json({ message: "The cart contains an invalid product or quantity." });
      }
      quantities.set(
        item._id,
        (quantities.get(item._id) || 0) + item.quantity
      );
    }

    const catalogProducts = await Product.find({
      _id: { $in: [...quantities.keys()] },
    });

    if (catalogProducts.length !== quantities.size) {
      return res.status(400).json({
        message: "One or more products are no longer available.",
      });
    }

    const unavailableProduct = catalogProducts.find(
      (product) => quantities.get(product._id.toString()) > product.stock
    );
    if (unavailableProduct) {
      return res.status(400).json({
        message: `${unavailableProduct.name} does not have enough stock.`,
      });
    }

    let subtotal = 0;
    const orderProducts = catalogProducts.map((product) => {
      const quantity = quantities.get(product._id.toString());
      subtotal += product.price * quantity;
      return { product: product._id, quantity };
    });

    const order = await Order.create({
      user: req.user._id,
      products: orderProducts,
      totalAmount: subtotal + Math.floor(subtotal * 0.18),
      address: address || undefined,
    });

    res.status(201).json({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    console.error("Order placement failed:", error.message);

    res.status(500).json({
      message: error.message,
    });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate(
      "products.product"
    );

    res.json(orders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};