import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import products from "./data/products.js";

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    const result = await Product.bulkWrite(
      products.map((product) => {
        const { image, ...productFields } = product;
        return {
          updateOne: {
            filter: { name: product.name },
            update: {
              $set: { image },
              $setOnInsert: productFields,
            },
            upsert: true,
          },
        };
      })
    );

    console.log(
      `✅ Product seed complete (${result.upsertedCount} new products added).`
    );
  } catch (error) {
    console.error("❌ Product seed failed:", error.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

await importData();