const express = require('express');
const app = express();

// =====================
// STATIC FILES (IMPORTANT)
// =====================
app.use(express.static('public'));

// routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const travelRoutes = require('./routes/travelRoutes');
const commentRoutes = require('./routes/commentRoutes');

// DEBUG (optional)
console.log('auth:', authRoutes);
console.log('user:', userRoutes);
console.log('travel:', travelRoutes);
console.log('comment:', commentRoutes);

// middleware
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/travel', travelRoutes);
app.use('/api/comments', commentRoutes);

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});