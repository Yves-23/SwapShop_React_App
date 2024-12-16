import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const ResetPasswordForm = () => {
    const { resetToken } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/users/reset-password/${resetToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ password }),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Password reset successfully");
                navigate("/login");
            } else {
                setError(data.message || "Something went wrong");
            }
        } catch (err) {
            setError("Server error");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
          <div className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md -mt-40">
            <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">Reset Your Password</h2>
      
            {/* Display Error Message */}
            {error && (
              <div className="text-red-500 text-sm font-bold mb-4 text-center">
                {error}
              </div>
            )}
      
            <form onSubmit={handleSubmit}>
              {/* New Password Input */}
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter new password"
                  required
                />
              </div>
      
              {/* Confirm Password Input */}
              <div className="mb-6">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-primary focus:border-primary dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Confirm new password"
                  required
                />
              </div>
      
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-secondary hover:bg-primary hover:text-black text-white py-2 px-4 rounded-md focus:outline-none 
                  focus:ring-2 focus:ring-primary focus:ring-offset-2 transition duration-150 font-bold"
              >
                Reset Password
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

export default ResetPasswordForm;
