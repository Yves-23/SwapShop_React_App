import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import DarkMode from "../DarkMode/DarkMode";
import Logo from "../../assets/logo.jpg";
import "./Header.css";

const Header = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown

  const auth = getAuth();

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup on unmount
  }, [auth]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    };
  
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);
  

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setDropdownOpen(false); // Close dropdown on logout
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="sticky top-0 shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 z-50">
      {/* Main Header */}
      <div className="bg-primary/40 dark:bg-gray-800 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link
              to="/"
              className="font-bold text-2xl sm:text-3xl flex gap-2 items-center"
            >
              <img src={Logo} alt="Logo" className="w-10" />
              <span className="dark:text-white">SwapShop</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div>
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full 
                border border-gray-300 dark:border-gray-600 px-3 py-1 dark:bg-white text-black dark:text-black 
                placeholder-gray-400 dark:placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <IoMdSearch className="text-black dark:text-black group-hover:text-black absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
          </div>

          {/* Buttons and Dark Mode */}
          <div className="flex items-center gap-4">
            {/* Sell Button */}
            <Link to="/sell">
              <button
                className="bg-secondary/80 hover:bg-secondary dark:bg-white dark:hover:bg-secondary/90 dark:hover:text-white transition duration-200 ease-in-out transform 
                hover:scale-105 hover:shadow-lg text-white dark:text-black py-1 px-5 rounded-full font-bold"
              >
                Sell
              </button>
            </Link>

            {/* User Icon or Login Button */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <FaUserCircle
                  className="text-3xl cursor-pointer hover:text-primary"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div className="dropdown absolute right-0 mt-2 w-70 bg-white dark:bg-gray-800 text-gray-700 dark:text-white rounded-md shadow-lg z-50">
                    <ul className="flex flex-col">
                      {/* Personalized Welcome */}
                      <li className="px-4 py-2 font-medium text-sm bg-gray-100 dark:bg-gray-700">
                        Welcome, {user.displayName || user.email.split("@")[0]}
                      </li>
                      <hr className="border-gray-300 dark:border-gray-600 my-1" />
                      {/* Profile */}
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link to="/profile">Profile</Link>
                      </li>
                      {/* Settings */}
                      <li className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Link to="/settings">Settings</Link>
                      </li>
                      {/* Logout */}
                      <li
                        className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login">
                <button
                  className="bg-orange-500 text-white dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-500 transition 
                  duration-200 ease-in-out transform hover:scale-105 py-1 px-5 rounded-full font-bold"
                >
                  Login
                </button>
              </Link>
            )}

            {/* Dark Mode Toggle */}
            <div className="ml-6">
              <DarkMode />
            </div>
          </div>
        </div>
      </div>

      {/* SubHeader */}
      <div className="bg-gray-100 dark:bg-gray-800 py-2">
        <div className="container flex justify-center gap-10">
          {/* Category Links */}
          <Link
            to="/"
            className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition"
          >
            Home
          </Link>
          <a
            href="#why"
            className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition"
          >
            Why SwapShop
          </a>
          <a
            href="#contact"
            className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
