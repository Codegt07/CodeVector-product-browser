const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      index: true,
    },

    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

productSchema.index({
  updated_at: -1,
  _id: -1,
});

productSchema.index({
  category: 1,
  updated_at: -1,
  _id: -1,
});

module.exports = mongoose.model("Product", productSchema);