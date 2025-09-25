import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import CommentForm from "../components/CommentForm";

export default function PostDetail() {
  const { id } = useParams(); // get post ID from route params
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch post by ID including comments
  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/posts/${id}`);
      setPost(res.data);
    } catch (err) {
      console.error("Failed to fetch post", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (loading) return <p>Loading post...</p>;
  if (!post) return <p>Post not found.</p>;

  return (
    <div className="container">
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <h3>Comments</h3>
      {post.comments && post.comments.length > 0 ? (
        post.comments.map((comment) => (
          <div key={comment._id} className="card" style={{ marginBottom: "0.75rem" }}>
            <p><strong>{comment.author?.name || "Anonymous"}</strong>:</p>
            <p>{comment.content}</p>
          </div>
        ))
      ) : (
        <p>No comments yet. Be the first!</p>
      )}

      <CommentForm postId={id} onCommentAdded={fetchPost} />
    </div>
  );
}
