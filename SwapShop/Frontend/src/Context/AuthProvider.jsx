import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";
import api from "../Components/api/api";

// AuthProvider Component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fetch user details
  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await api.get("/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  }, []);

  // Login and fetch user details
  const login = async (credentials) => {
    try {
      const response = await api.post("/users/login", credentials);
      const { token } = response.data;
      localStorage.setItem("token", token); // Save token locally
      // localStorage.removeItem("adminToken");
      await fetchUser(); // Fetch and set user state
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  // Logout and clear user state
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // Fetch user on app initialization
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <AuthContext.Provider value={{ user, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Prop validation
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
