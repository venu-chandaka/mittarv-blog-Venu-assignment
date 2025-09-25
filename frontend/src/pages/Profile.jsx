import React from "react";
import { useSelector } from "react-redux";

export default function Profile() {
  const { user } = useSelector((state) => state.auth);
  const { posts } = useSelector((state) => state.posts);

  if (!user) {
    return <p className="container">Please login to view your profile.</p>;
  }

  return (
    <div className="container">
      <h2>My Profile</h2>
      <p>
        <b>Name:</b> {user.name}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>

      <h3>My Posts</h3>
      {posts.filter((p) => p.author?._id === user.id).map((p) => (
        <div key={p._id} className="card">
          <h4>{p.title}</h4>
          <p>{p.content}</p>
        </div>
      ))}
    </div>
  );
}
