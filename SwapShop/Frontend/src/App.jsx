import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import ImageSlider from "./Components/ImageSlider/ImageSlider";
import Signup from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import Sell from "./Components/Sell/Sell";
import Footer from "./Components/Footer/Footer";
import ResetPasswordForm from "./Components/ResetPasswordForm/ResetPasswordForm";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import HomePage from "./Components/HomePage/HomePage";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ImageSlider />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sell" element={<Sell />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPasswordForm />} />
        
      </Routes>
      <Routes>
        <Route path="/items" element={<HomePage />} />
      </Routes>
      <HomePage/>

      <Footer />
    </Router>
  );
};

export default App;
