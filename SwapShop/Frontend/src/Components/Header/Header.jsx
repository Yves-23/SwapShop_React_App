import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import DarkMode from "../DarkMode/DarkMode";
import Logo from "../../assets/logo.jpg";
import "./Header.css";
import AuthContext from "../../Context/AuthContext";

const Header = () => {
  const { user, logout, fetchUser } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    fetchUser(); // Ensure the user state is updated on mount
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="sticky top-0 shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-50">
      <div className="bg-primary/40 dark:bg-gray-800 py-2">
        <div className="container flex justify-between items-center">
          <Link to="/" className="font-bold text-2xl flex gap-2 items-center">
            <img src={Logo} alt="Logo" className="w-10" />
            <span>SwapShop</span>
          </Link>
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full 
                border px-3 py-1 text-black placeholder-gray-400 focus:outline-none focus:ring-2"
            />
            <IoMdSearch className="absolute top-1/2 -translate-y-1/2 right-3" />
          </div>
          <div className="flex items-center gap-4">
            <Link to="/sell">
              <button className="bg-secondary hover:bg-secondary-dark text-white py-1 px-5 rounded-full font-bold">
                Sell
              </button>
            </Link>
            {user ? (
              <div className="relative" onBlur={closeDropdown}>
                <FaUserCircle
                  className="text-3xl cursor-pointer"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="dropdown absolute right-0 mt-2 w-60 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-md shadow-lg z-50"
                  >
                    <ul className="flex flex-col">
                      <li className="px-4 py-2 font-medium text-sm bg-gray-100 dark:bg-gray-700">
                        Welcome, {user.username || "User"}
                      </li>
                      <hr className="border-gray-300 dark:border-gray-600" />
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link to="/settings">Settings</Link>
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={logout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-orange-500 text-white py-1 px-5 rounded-full font-bold">
                  Login
                </button>
              </Link>
            )}
            <DarkMode />
          </div>
        </div>
      </div>
      {/* SubHeader */}
      <div className="bg-gray-100 dark:bg-gray-800 py-2">
        <div className="container flex justify-center gap-10">
          <Link
            to="/"
            className="text-sm font-medium hover:text-primary transition"
          >
            Home
          </Link>
          <a href="#why" className="text-sm font-medium hover:text-primary">
            Why SwapShop
          </a>
          <a href="#contact" className="text-sm font-medium hover:text-primary">
            Contact Us
          </a>
          <Link
            to="/items"
            className="text-sm font-medium hover:text-primary transition"
          >
            Items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
