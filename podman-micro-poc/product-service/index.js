const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = 3002;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/merndb';

mongoose.connect(MONGO_URI)
  .then(() => console.log('Product Service connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
const Product = mongoose.model('Product', productSchema);

app.get('/health', (req, res) => {
  res.json({ service: 'product-service', status: 'UP', pod: true });
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, count: products.length, data: products });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Product Service running on port ${PORT}`);
});