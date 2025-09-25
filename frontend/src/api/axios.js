import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // your backend base URL
});

// Attach token if present
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
