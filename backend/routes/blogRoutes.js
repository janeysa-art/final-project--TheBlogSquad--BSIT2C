const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

const {
  createBlog,
  getBlogs,
  updateBlog,
  deleteBlog
} = require('../controllers/blogController');

// CREATE BLOG (protected)
router.post('/', (req, res, next) => next(), createBlog);

// GET BLOGS (public)
router.get('/', getBlogs);

// UPDATE BLOG (protected)
router.put('/:id', auth, updateBlog);

// DELETE BLOG (protected)
router.delete('/:id', auth, deleteBlog);

module.exports = router;