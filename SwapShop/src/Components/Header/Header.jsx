import React from "react";
import "./Header.css";
import Logo from "../../assets/logo.jpg";
import { IoMdSearch } from "react-icons/io";
import DarkMode from "../DarkMode/DarkMode";

const Header = () => {
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
      {/* Main Header */}
      <div className="bg-primary/40 dark:bg-gray-800 py-2">
        <div className="container flex justify-between items-center">
          {/* Logo */}
          <div>
            <a href="#" className="font-bold text-2xl sm:text-3xl flex gap-2 items-center">
              <img src={Logo} alt="Logo" className="w-10" />
              <span className="dark:text-white">SwapShop</span>
            </a>
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
            <button
              className="bg-secondary/80 hover:bg-secondary dark:bg-white dark:hover:bg-secondary/90 dark:hover:text-white transition duration-200 ease-in-out transform 
              hover:scale-105 hover:shadow-lg text-white dark:text-black py-1 px-5 rounded-full font-bold"
            >
              Sell
            </button>

            {/* Login Button */}
            <button
              className="bg-orange-500 text-white dark:bg-orange-600 hover:bg-orange-600 dark:hover:bg-orange-500 transition 
              duration-200 ease-in-out transform hover:scale-105 py-1 px-5 rounded-full font-bold"
            >
              Login
            </button>

            {/* Dark Mode Toggle */}
            <div className="ml-6">
              <DarkMode />
            </div>
          </div>
        </div>
      </div>

      {/* SubHeader */}
      <div className="bg-gray-100 dark:bg-gray-800 py-5">
        <div className="container flex justify-center gap-10">
          {/* Category Links */}
          <a
            href="#electronics"
            className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition"
          >
            Electronics
          </a>
          <a
            href="#fashion"
            className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition"
          >
            Fashion
          </a>
          <a
            href="#property"
            className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition"
          >
            Property
          </a>
          <a
            href="#home-furniture"
            className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition"
          >
            Home & Furniture
          </a>
          <a
            href="#books"
            className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition"
          >
            Books
          </a>
          <a
            href="#sports"
            className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-secondary transition"
          >
            Sports
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
