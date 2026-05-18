const router = require('express').Router();
const TravelBlog = require('./TravelBlog');
const auth = require('../middleware/authMiddleware');
const mongoose = require('mongoose');


// 🟢 CREATE POST
router.post('/', auth, async (req, res) => {
  try {
    const { title, destination, description, images } = req.body;

    if (!title || !destination) {
      return res.status(400).json({ message: "Title and destination required" });
    }

    const post = await TravelBlog.create({
      title,
      destination,
      description,
      images: images || [],
      author: req.user.id,
      likes: []
    });

    res.status(201).json(post);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 📥 GET ALL POSTS
router.get('/', async (req, res) => {
  try {
    const posts = await TravelBlog.find()
      .populate('author', 'username avatar')
      .sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// 📄 GET SINGLE POST (SAFE VERSION)
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const post = await TravelBlog.findById(req.params.id)
      .populate('author', 'username avatar');

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ❌ DELETE POST (OWNER ONLY)
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await TravelBlog.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await post.deleteOne();

    res.json({ message: "Post deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// ❤️ LIKE / UNLIKE
router.put('/:id/like', auth, async (req, res) => {
  try {
    const post = await TravelBlog.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id;

    if (!post.likes) post.likes = [];

    const index = post.likes.indexOf(userId);

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes.splice(index, 1);
    }

    await post.save();

    res.json(post);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;