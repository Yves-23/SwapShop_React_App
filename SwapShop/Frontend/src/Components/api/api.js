import axios from "axios";

// Create an instance of axios with default settings
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Replace with your backend URL
  timeout: 10000, // Timeout in milliseconds (optional)
  headers: {
    "Content-Type": "application/json",
  },
  
});

// Add a request interceptor to include the token in headers
api.interceptors.request.use((config) => {
  const isAdminRoute = config.url.startsWith("/admin"); // Check if the route is for admin
  const token = isAdminRoute
    ? localStorage.getItem("adminToken") // Use adminToken for admin routes
    : localStorage.getItem("token"); // Use userToken for other routes

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
