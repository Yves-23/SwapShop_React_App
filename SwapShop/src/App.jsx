import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import ImageSlider from "./Components/ImageSlider/ImageSlider";
import Signup from "./Components/SignUp/SignUp";
import Login from "./Components/Login/Login";
import ResetPassword from "./Components/ResetPassword/ResetPassword";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<ImageSlider />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
};

export default App;
