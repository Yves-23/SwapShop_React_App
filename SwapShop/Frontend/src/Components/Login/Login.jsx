import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use login from AuthContext

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phoneNumber || !password) {
      setError("Both phone number and password are required.");
      return;
    }

    try {
      // Authenticate user and update AuthContext state
      await login({ phoneNumber, password });
      navigate("/"); // Redirect to home page on success
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      setError(
        err.response?.data?.message || "Invalid phone number or password. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="flex flex-wrap w-full max-w-3xl bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden mb-20">
        {/* Left Side: Info Section */}
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-900 to-blue-950 text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Why Do You Need an Account?</h2>
          <p className="text-lg leading-relaxed">
            To sell your used products on our platform, you need an account. Logging in allows you to:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Manage your listings</li>
            <li>Track sales</li>
            <li>Connect with buyers easily</li>
          </ul>
          <p className="mt-4 font-semibold">
            Don't have an account?{" "}
            <a href="/signup" className="underline text-orange-500 hover:text-orange-700">
              Sign up now
            </a>
          </p>
          <p>
            <Link to="/admin-login">I am Admin</Link>
          </p>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Login to Your Account</h2>

          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <form onSubmit={handleLogin}>
            {/* Phone Number */}
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                  focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Enter your Phone Number"
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
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Forgot your password?{" "}
              <a
                href="/forgot-password"
                className="text-blue-600 font-bold hover:underline"
              >
                Reset it here
              </a>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 font-bold hover:underline"
              >
                Create one now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
