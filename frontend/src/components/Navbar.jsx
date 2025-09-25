import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <nav className="navbar">
      <Link to="/" style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
        MittArv Blog
      </Link>
      <div>
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/create">Create Post</Link>
            <Link to="/profile">Profile</Link>
            <button
              className="button"
              onClick={() => dispatch(logout())}
              style={{ marginLeft: "1rem" }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
}
