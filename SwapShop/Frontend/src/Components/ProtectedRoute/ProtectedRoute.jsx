import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AdminAuthContext from "../../Context/AdminAuthContext";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AdminAuthContext);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!admin) {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
};

export default ProtectedRoute;