require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

// =====================
// MIDDLEWARE
// =====================
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// =====================
// DATABASE
// =====================
const connectDB = require('./config/db');
connectDB();

// =====================
// ROUTES
// =====================
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const travelRoutes = require('./routes/travelRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/comments', commentRoutes);

// =====================
// SIMPLE POSTS (MERGED FROM OLD SERVER)
// =====================
let posts = [];

app.post('/api/posts', (req, res) => {
  posts.push(req.body);

  res.json({
    success: true,
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res) => {
  res.json(posts);
});

// =====================
// TEST ROUTE
// =====================
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// =====================
// SERVER
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});