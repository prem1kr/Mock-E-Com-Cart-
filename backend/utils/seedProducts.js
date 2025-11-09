import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

const dummyProducts = [
  { name: "Wireless Headphones", price: 59.99 },
  { name: "Bluetooth Speaker", price: 29.99 },
  { name: "Smartwatch", price: 129.99 },
  { name: "Yoga Mat", price: 19.99 },
  { name: "Gaming Mouse", price: 49.99 },
  { name: "LED Desk Lamp", price: 24.99 },
  { name: "Portable Charger", price: 39.99 },
  { name: "USB-C Hub", price: 34.99 },
  { name: "Noise Cancelling Earbuds", price: 89.99 },
  { name: "Fitness Tracker", price: 69.99 }
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('DB connected for seeding');

    // Clear existing products to avoid duplicates
    await Product.deleteMany({});
    console.log('Existing products cleared');

    // Insert dummy products
    await Product.insertMany(dummyProducts);
    console.log('Dummy products inserted');

    process.exit();
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedProducts();
