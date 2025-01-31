import React from "react";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ onMenuSelect }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminToken"); // Clear authentication token
    navigate("/admin-login"); // Redirect to admin login
  };

  const menuItems = ["Overview", "Products", "Users", "Settings"];

  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen shadow-lg">
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold">SwapShop Admin</h2>
      </div>
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li
            key={item}
            className="py-2 px-4 cursor-pointer hover:bg-gray-700 transition"
            onClick={() => onMenuSelect(item)}
          >
            {item}
          </li>
        ))}
        {/* Logout Button */}
        <li
          className="py-2 px-4 cursor-pointer hover:bg-red-600 transition text-red-400"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </aside>
  );
}
