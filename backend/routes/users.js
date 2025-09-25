const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Get user profile + their posts
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const posts = await Post.find({ author: user._id });
    res.json({ user, posts });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
