const Product = require("../models/Product");
const mongoose = require("mongoose");

const getProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 20;
    const { category, cursor } = req.query;

    const query = {};

    if (category) {
      query.category = category;
    }

    if (cursor) {
      const parsedCursor = JSON.parse(cursor);

      query.$or = [
        {
          updated_at: {
            $lt: new Date(parsedCursor.updated_at),
          },
        },
        {
          updated_at: new Date(parsedCursor.updated_at),
          _id: {
            $lt: new mongoose.Types.ObjectId(parsedCursor._id),
          },
        },
      ];
    }

    const products = await Product.find(query)
      .sort({
        updated_at: -1,
        _id: -1,
      })
      .limit(limit);

    const lastProduct = products[products.length - 1];

    const nextCursor = lastProduct
      ? JSON.stringify({
          updated_at: lastProduct.updated_at,
          _id: lastProduct._id,
        })
      : null;

    res.status(200).json({
      count: products.length,
      nextCursor,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

module.exports = {
  getProducts,
};