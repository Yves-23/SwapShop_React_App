import React from "react";
import "./Header.css";
import Logo from "../../assets/logo.jpg";
import { IoMdSearch } from "react-icons/io";
import DarkMode from "../DarkMode/DarkMode";

const Header = () => {
  return (
    <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative z-40">
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
                className="w-[200px] sm:w-[300px] group-hover:w-[300px] transition-all duration-300 rounded-full 
                border border-gray-300 dark:border-gray-600 px-3 py-1 dark:bg-white text-black dark:text-black 
                placeholder-gray-400 dark:placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <IoMdSearch className="text-black dark:text-black group-hover:text-black absolute top-1/2 -translate-y-1/2 right-3" />
            </div>
          </div>

          {/* Buttons: Sell, Login */}
          <div className="flex items-center gap-4">
            {/* Sell Button */}
            <button
              className="bg-secondary/80 hover:bg-secondary dark:bg-white dark:hover:bg-secondary/90 dark:hover:text-white transition duration-200 ease-in-out transform 
              hover:scale-105 hover:shadow-lg text-white dark:text-black py-0.5 px-3 rounded-full flex items-center gap-3 group font-bold "
            >
              <span className="group-hover:transition-all duration-200">Sell</span>
            </button>

            {/* Login Button */}
            <button
              className="bg-orange-400 text-white dark:bg-orange-500 dark:text-white hover:bg-primary/90 dark:hover:bg-orange-400 transition 
              duration-200 ease-in-out transform hover:scale-105 py-0.5 px-3 rounded-full flex items-center gap-3 group font-bold "
            >
              <span className="group-hover:transition-all duration-200">Login</span>
            </button>
            
          </div>
          {/* Dark Mode Toggle */}
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default Header;
