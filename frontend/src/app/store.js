import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import postsReducer from "../features/postsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});
