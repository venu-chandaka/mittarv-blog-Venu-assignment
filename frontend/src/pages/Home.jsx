import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../features/postsSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (post.tags && post.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())))
      );
      setFilteredPosts(filtered);
    }
  }, [searchTerm, posts]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container">
      <h2>All Blog Posts</h2>

      <input
        type="text"
        placeholder="Search by title or tags"
        value={searchTerm}
        onChange={handleSearchChange}
        className="input"
        style={{ marginBottom: "1rem" }}
      />

      {filteredPosts.length === 0 ? (
        <p>No posts found matching your search.</p>
      ) : (
        filteredPosts.map((p) => (
          <Link
            key={p._id}
            to={`/posts/${p._id}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div className="card" style={{ cursor: "pointer" }}>
              <h3>{p.title}</h3>
              <p>{p.content.substring(0, 100)}...</p>
              <small>By {p.author?.name || "Unknown"}</small>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}
