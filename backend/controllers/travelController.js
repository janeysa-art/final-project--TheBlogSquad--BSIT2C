const TravelBlog = require('../models/TravelBlog');

// CREATE TRAVEL BLOG
exports.createBlog = async (req, res) => {
  try {
    const blog = await TravelBlog.create(req.body);
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL TRAVEL BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await TravelBlog.find().populate('author');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE TRAVEL BLOG
exports.updateBlog = async (req, res) => {
  try {
    const blog = await TravelBlog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE TRAVEL BLOG
exports.deleteBlog = async (req, res) => {
  try {
    await TravelBlog.findByIdAndDelete(req.params.id);
    res.json({ message: "Travel blog deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};