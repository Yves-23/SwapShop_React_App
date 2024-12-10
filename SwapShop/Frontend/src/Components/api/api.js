import axios from "axios";

// Create an instance of axios with default settings
const api = axios.create({
  baseURL: "http://localhost:5000/api/users", // Replace with your backend URL
  timeout: 10000, // Timeout in milliseconds (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
