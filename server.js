require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to My Deployed App');
});

// Status route
app.get('/status', (req, res) => {
  res.json({ status: 'running' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('Mongo error:', err.message));

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});