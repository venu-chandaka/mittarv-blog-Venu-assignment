const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  // existing fields...
  title: String,
  content: String,
  tags: [String],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  comments: [commentSchema],  // New addition
});

module.exports = mongoose.model("Post", postSchema);

