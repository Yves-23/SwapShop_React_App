import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import ImageSlider from "./Components/ImageSlider/ImageSlider";
import Signup from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import Sell from "./Components/Sell/Sell";
import Footer from "./Components/Footer/Footer";
import ResetPasswordForm from "./Components/ResetPasswordForm/ResetPasswordForm";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import HomePage from "./Components/HomePage/HomePage";
import ProfilePage from "./Components/ProfilePage/ProfilePage";
import Dashboard from "./Components/Admin/Dashboard"; // Import the dashboard component
import AuthProvider from "./Context/AuthProvider"; // Ensure you import the provider and hook

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </Router>
  );
};

const Main = () => {
  const location = useLocation();

  // Routes where the header, footer, and homepage are not shown
  const fullScreenRoutes = [
    "/signup",
    "/login",
    "/sell",
    "/forgot-password",
    "/reset-password/:resetToken",
    "/dashboard", // Dashboard is full screen
  ];
  const isFullScreenPage = fullScreenRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <>
      {!isFullScreenPage && <Header />}
      <Routes>
        <Route path="/" element={<><ImageSlider /><HomePage /></>} />
        <Route path="/items" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPasswordForm />} />
        <Route 
          path="/dashboard" element={<Dashboard />} 
        />
      </Routes>
      {!isFullScreenPage && <Footer />}
    </>
  );
};

export default App;
