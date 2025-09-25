import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../api/axios";

export const registerUser = createAsyncThunk("auth/register", async (formData) => {
  const res = await API.post("/auth/register", formData);
  return res.data;
});

export const loginUser = createAsyncThunk("auth/login", async (formData) => {
  const res = await API.post("/auth/login", formData);
  return res.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: localStorage.getItem("token") || null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
