import React, { useEffect, useState } from "react";
import api from "../api/api";
import { FaMapMarkerAlt, FaWhatsapp, FaPhoneAlt, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { formatDistanceToNowStrict } from "date-fns"; // Import function for relative time
import "./HomePage.css";

const HomePage = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/items");
        // Sort items by createdAt in descending order
        const sortedItems = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setItems(sortedItems);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="home-page bg-gray-100 dark:bg-gray-800 dark:text-white p-8 pl-32 pr-32">
      <div className="container py-6">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to SwapShop
          </h1>
        </div>
        <div className="item-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="item-card bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:cursor-pointer"
            >
              {/* Image Section */}
              <ImageCarousel images={item.images} />

              {/* Details Section */}
              <div className="p-4 flex flex-col h-40 justify-between">
                <div>
                  <h2
                    className="text-lg font-semibold text-gray-800 dark:text-gray-200 truncate"
                    title={item.title}
                  >
                    {item.title}
                  </h2>
                  <span className="text-md font-bold text-orange-500 block my-2">
                    RWF {Number(item.price).toLocaleString()}
                  </span>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <FaMapMarkerAlt className="text-orange-500 mr-2" />
                    {item.location}
                  </div>
                  {/* Time Since Posted */}
                  <div className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNowStrict(new Date(item.createdAt), { addSuffix: true })}
                  </div>
                </div>
                <div className="flex space-x-4 justify-end items-center">
                  <a
                    href={`https://wa.me/${item.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 text-2xl"
                    title="Contact via WhatsApp"
                  >
                    <FaWhatsapp />
                  </a>
                  <a
                    href={`tel:${item.phoneNumber}`}
                    className="text-blue-500 text-lg"
                    title="Call Now"
                  >
                    <FaPhoneAlt />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-container relative overflow-hidden">
      {images.length > 0 && (
        <img
          src={`http://localhost:5000${images[currentIndex]}`}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-48 object-cover dark:bg-white"
        />
      )}
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
      >
        <FaArrowLeft />
      </button>
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default HomePage;
