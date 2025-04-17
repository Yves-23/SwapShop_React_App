import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AdminAuthContext from "../../Context/AdminAuthContext"; // Use AdminAuthContext
// import api from "../api/api";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AdminAuthContext); // Use AdminAuthContext

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !phone || !password) {
      setError("Email, phone number, and password are required.");
      return;
    }

    try {
      // Call the admin login API
      await login({ email, phone, password });

      // Redirect to the dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Invalid credentials. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-wrap w-full max-w-sm bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-20">
        <div className="w-full p-6">
          <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Login into the Dashboard</h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter Email"
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter Phone Number"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-secondary hover:bg-primary hover:text-black text-white font-bold py-2 px-4 rounded-md focus:outline-none 
                focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-150"
            >
              Login
            </button>
          </form>

          {/* Forgot Password and Signup Links */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              If you aren't an admin, please login as {" "}
              <a
                href="/login"
                className="text-blue-600 font-bold hover:underline"
              >
                User
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;