const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { faker } = require("@faker-js/faker");
const Product = require("../models/Product");

dotenv.config();

const categories = [
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Beauty",
  "Sports",
  "Toys",
  "Grocery",
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");
    console.log("Deleting old products...");

    await Product.deleteMany();

    const totalProducts = 200000;
    const batchSize = 5000;

    for (let i = 0; i < totalProducts; i += batchSize) {
      const products = [];

      for (let j = 0; j < batchSize; j++) {
        const index = i + j + 1;

        products.push({
          productId: `PROD-${index}`,
          name: faker.commerce.productName(),
          category: categories[Math.floor(Math.random() * categories.length)],
          price: Number(faker.commerce.price({ min: 50, max: 5000 })),
        });
      }

      await Product.insertMany(products);

      console.log(`Inserted ${i + batchSize} products`);
    }

    console.log("Seed completed successfully");
    process.exit();
  } catch (error) {
    console.error("Seed failed:", error);
    process.exit(1);
  }
};

seedProducts();