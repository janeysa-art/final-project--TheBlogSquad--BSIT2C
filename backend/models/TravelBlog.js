const mongoose = require('mongoose');

const TravelBlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  description: String,
  images: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TravelBlog', TravelBlogSchema);