import React from "react";

export default function Sidebar({ onMenuSelect }) {
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
      </ul>
    </aside>
  );
}
