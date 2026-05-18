const mongoose = require('mongoose');

const TravelBlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  description: String,

  images: [String],

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('TravelBlog', TravelBlogSchema);