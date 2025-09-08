// backend/src/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from './models/Item.js';


dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedItems = async () => {
  await Item.deleteMany();

await Item.insertMany([
  { name: "iPhone 15", category: "Mobiles", price: 79999, image: "https://via.placeholder.com/150" },
  { name: "MacBook Air", category: "Laptops", price: 109999, image: "https://via.placeholder.com/150" },
  { name: "Sony Headphones", category: "Accessories", price: 4999, image: "https://via.placeholder.com/150" },
]);


  console.log("Sample items added ✅");
  process.exit();
};

seedItems();
