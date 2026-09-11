const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const PORT = 3001;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/merndb';

// Connect to MongoDB (running in the same pod = localhost)
mongoose.connect(MONGO_URI)
  .then(() => console.log('User Service connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now }
});
const User = mongoose.model('User', userSchema);

// Health check
app.get('/health', (req, res) => {
  res.json({ service: 'user-service', status: 'UP', pod: true });
});

// GET all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// GET single user
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// CREATE user
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
});