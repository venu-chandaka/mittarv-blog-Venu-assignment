import React, { useState } from "react";
import axios from "../api/axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CommentForm({ postId, onCommentAdded }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useSelector((state) => state.auth); // get login token from redux
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    if (!token) {
      // Not logged in, redirect to login page
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      await axios.post(`/posts/${postId}/comments`, { content });
      setContent("");
      onCommentAdded(); // refresh comments list
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <textarea
        rows={3}
        placeholder="Write your comment here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="textarea"
      />
      <button
        type="submit"
        className="button"
        disabled={loading}
        style={{ marginTop: "0.5rem" }}
      >
        {loading ? "Posting..." : "Post Comment"}
      </button>
    </form>
  );
}
