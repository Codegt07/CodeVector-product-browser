const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const Product = require("../models/Product");

dotenv.config();

const addTestProduct = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const products = [];

    for (let i = 0; i < 50; i++) {
      products.push({
        productId: `TEST-${Date.now()}-${i}`,
        name: faker.commerce.productName(),
        category: "Electronics",
        price: Number(faker.commerce.price({ min: 50, max: 5000 })),
      });
    }

    await Product.insertMany(products);

    console.log("50 test products added successfully");
    process.exit();
  } catch (error) {
    console.error("Failed to add test products:", error);
    process.exit(1);
  }
};

addTestProduct();