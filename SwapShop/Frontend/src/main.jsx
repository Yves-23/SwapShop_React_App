import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthProvider from "./Context/AuthProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./App";
// import AuthProvider from "./Context/AuthProvider";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <AuthProvider>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </AuthProvider>
// );

