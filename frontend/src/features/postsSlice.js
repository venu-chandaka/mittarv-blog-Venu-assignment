import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const fetchPosts = createAsyncThunk("posts/fetch", async () => {
  const res = await API.get("/posts");
  return res.data;
});

export const createPost = createAsyncThunk("posts/create", async (postData) => {
  const res = await API.post("/posts", postData);
  return res.data;
});

const postsSlice = createSlice({
  name: "posts",
  initialState: { posts: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
    builder.addCase(createPost.fulfilled, (state, action) => {
      state.posts.push(action.payload);
    });
  },
});

export default postsSlice.reducer;
