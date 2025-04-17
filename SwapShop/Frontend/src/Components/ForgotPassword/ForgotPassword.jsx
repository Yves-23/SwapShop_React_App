import React, { useState } from "react";
import api from "../api/api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); // Unified state for messages
  const [isError, setIsError] = useState(false); // To control the message style

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address.");
      setIsError(true);
      return;
    }

    try {
      const response = await api.post("/users/forgot-password", { email });

      // Check the response
      setMessage(response.data.message);
      setIsError(false); // Reset to success style
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to send reset email. Please check the email address.");
      setIsError(true); // Error style
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md -mt-40">
        <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Reset Your Password</h2>

        {/* Display Success or Error Message */}
        {message && (
          <div className={`text-sm mb-4 ${isError ? "text-red-500 font-bold text-lg" : "text-green-500 font-bold text-lg"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleResetPassword} className="">
          {/* Email Input */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-secondary hover:bg-primary hover:text-black text-white py-2 px-4 rounded-md focus:outline-none 
              focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-150 font-bold"
          >
            Send Reset Email
          </button>
        </form>

        {/* Back to Login Link */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Remember your password?{" "}
            <a href="/login" className="text-blue-600 font-bold hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
