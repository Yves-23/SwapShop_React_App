import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import AdminAuthContext from "./AdminAuthContext";
import api from "../Components/api/api";

const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchAdmin = useCallback(async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      if (adminToken) {
        const response = await api.get("/admin/dashboard", {
          headers: { Authorization: `Bearer ${adminToken}` },
        });
        setAdmin(response.data);
      } else {
        setAdmin(null);
      }
    } catch (error) {
      console.error("Error fetching admin:", error);
      setAdmin(null);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post("/admin/login", credentials);
      const { adminToken } = response.data;
      localStorage.setItem("adminToken", adminToken);
      // localStorage.removeItem("token");
      await fetchAdmin(); // Fetch admin immediately after login
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setAdmin(null);
  };

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  // Add a request interceptor to include the token in headers
// api.interceptors.request.use((config) => {
//   const adminToken = localStorage.getItem("adminToken");
//   if (adminToken) {
//     config.headers.Authorization = `Bearer ${adminToken}`;
//   }
//   return config;
// });

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

AdminAuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminAuthProvider;