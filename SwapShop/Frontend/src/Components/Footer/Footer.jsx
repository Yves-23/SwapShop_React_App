import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaArrowUp,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      {/* Get Notified Section */}
      <section className="dark:bg-gray-900 bg-primary/40 text-gray-700 dark:text-gray-300 py-8">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Get Notified About New Products</h2>
          <p className="text-gray-400 mb-6">
            Stay updated with the latest items and offers! Subscribe now.
          </p>
          <form className="flex justify-center space-x-4">
            <input
              type="email"
              className="px-4 py-2 text-gray-900 rounded-md w-1/3"
              placeholder="Enter your email"
              required
            />
            <button
              type="submit"
              className="bg-primary text-black font-bold py-2 px-4 rounded-md hover:bg-secondary transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-white dark:bg-gray-700 text-black dark:text-white py-8 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {/* About SwapShop */}
            <div>
              <h3 className="font-bold text-lg mb-4">About SwapShop</h3>
              <p className="text-gray-400 text-sm font-medium">
                SwapShop is your eco-friendly marketplace for buying and selling
                used items. Join us in reducing waste and building sustainable
                communities!
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold text-lg mb-4">Quick Links</h3>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>
                  <a href="/about-us" className="hover:text-primary transition font-medium">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/contact-us" className="hover:text-primary transition font-medium">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="/terms-and-conditions"
                    className="hover:text-primary transition font-medium"
                  >
                    Terms & Conditions
                  </a>
                </li>
                <li>
                  <a
                    href="/privacy-policy"
                    className="hover:text-primary transition font-medium"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/categories" className="hover:text-primary transition font-medium">
                    Browse Categories
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="font-bold text-lg mb-4">Contact Us</h3>
              <p className="text-gray-400 text-sm font-medium">
                Email:{" "}
                <a
                  href="mailto:support@swapshop.com"
                  className="hover:text-primary transition font-medium"
                >
                  support@swapshop.com
                </a>
              </p>
              <p className="text-gray-400 text-sm mt-2 font-medium">
                Phone:{" "}
                <a
                  href="tel:+123456789"
                  className="hover:text-primary transition font-medium"
                >
                  +250 789 128 345
                </a>
              </p>
              <div className="mt-4 flex space-x-4">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-primary transition"
                >
                  <FaFacebook size={30} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-primary transition"
                >
                  <FaTwitter size={30} />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-primary transition"
                >
                  <FaInstagram size={30} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-700 hover:text-primary transition"
                >
                  <FaLinkedin size={30} />
                </a>
              </div>
            </div>

            {/* Get the App */}
            <div>
              <h3 className="font-bold text-lg mb-4">Get the App</h3>
              <p className="text-gray-400 text-sm font-medium">
                Download our app for a seamless experience.
              </p>
              <div className="mt-4 space-y-4">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-primary text-black font-bold py-2 px-4 rounded-md hover:bg-secondary transition"
                >
                  <FaGooglePlay className="mr-2" />
                  Google Play
                </a>
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-primary text-black font-bold py-2 px-4 rounded-md hover:bg-secondary transition"
                >
                  <FaApple className="mr-2" />
                  App Store
                </a>
              </div>
            </div>
          </div>

          {/* Back to Top Button */}
          <button
            onClick={scrollToTop}
            className="fixed bottom-5 right-5 bg-primary text-black p-3 rounded-full shadow-lg hover:bg-secondary transition"
          >
            <FaArrowUp size={20} />
          </button>

          {/* Copyright */}
          <div className="mt-8 text-center text-gray-500 text-sm font-bold">
            &copy; {new Date().getFullYear()} SwapShop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
