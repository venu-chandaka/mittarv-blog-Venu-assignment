import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../features/postsSlice";

export default function CreatePost() {
  const [form, setForm] = useState({ title: "", content: "", tags: "" });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: form.title,
      content: form.content,
      tags: form.tags.split(",").map((t) => t.trim()),
    };
    dispatch(createPost(payload));
    setForm({ title: "", content: "", tags: "" });
  };

  return (
    <div className="container">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          className="textarea"
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        />
        <input
          className="input"
          placeholder="Tags (comma separated)"
          value={form.tags}
          onChange={(e) => setForm({ ...form, tags: e.target.value })}
        />
        <button type="submit" className="button">
          Publish
        </button>
      </form>
    </div>
  );
}
