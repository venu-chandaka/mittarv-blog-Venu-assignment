const router = require('express').Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Create Post
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, tags, imageUrl } = req.body;
    const newPost = new Post({ title, content, tags, imageUrl, author: req.userId });
    const saved = await newPost.save();
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts with optional search filter
router.get('/', async (req, res) => {
  try {
    const { search } = req.query;
    let filter = {};
    if (search) {
      const regex = new RegExp(search, "i"); // case-insensitive search
      filter = { $or: [{ title: regex }, { tags: regex }] };
    }
    const posts = await Post.find(filter).populate('author', 'name avatarUrl');
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name avatarUrl');
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update post
router.put('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.author.toString() !== req.userId)
      return res.status(403).json({ msg: 'Not your post' });

    const { title, content, tags, imageUrl } = req.body;
    post.title = title || post.title;
    post.content = content || post.content;
    post.tags = tags || post.tags;
    post.imageUrl = imageUrl || post.imageUrl;

    const updated = await post.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.author.toString() !== req.userId)
      return res.status(403).json({ msg: 'Not your post' });

    await post.deleteOne();
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /posts/:id/comments - add comment to a post
router.post("/:id/comments", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found");

    const comment = {
      author: req.userId,
      content: req.body.content,
      createdAt: new Date(),
    };

    post.comments.push(comment);
    await post.save();

    res.status(201).json(post.comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
