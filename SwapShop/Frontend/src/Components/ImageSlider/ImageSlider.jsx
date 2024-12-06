import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Image1 from "../../assets/Slider/Electronic.jpg";
import Image2 from "../../assets/Slider/Fashion.jpg";
import Image3 from "../../assets/Slider/Home.jpg";
import { FaLaptop, FaTshirt, FaCouch, FaFutbol, FaCar } from "react-icons/fa";
import "./ImageSlider.css"; 

const ImageSlider = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  const slides = [
    {
      id: 1,
      image: Image1,
      title: "Best Deals on Electronics",
      description: "Find the best deals on electronics at SwapShop.",
    },
    {
      id: 2,
      image: Image2,
      title: "Latest Trends in Fashion",
      description: "Discover trendy fashion for all seasons.",
    },
    {
      id: 3,
      image: Image3,
      title: "Modern Home & Furniture",
      description: "Upgrade your home with furniture you'll love.",
    },
  ];

  const categories = [
    { name: "Electronics", icon: <FaLaptop />, link: "/category/electronics" },
    { name: "Fashion", icon: <FaTshirt />, link: "/category/fashion" },
    { name: "Furniture", icon: <FaCouch />, link: "/category/furniture" },
    { name: "Sports", icon: <FaFutbol />, link: "/category/sports" },
    { name: "Vehicles", icon: <FaCar />, link: "/category/vehicles" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch gap-4 py-6 px-4 md:px-0">
      {/* Categories Section */}
      <div className="w-full md:w-1/6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-4">
          Categories
        </h2>
        <div className="flex flex-col gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-primary/90 transition"
              title={`Explore ${category.name}`} 
            >
              <span className="text-2xl text-secondary">{category.icon}</span>
              <span className="text-lg font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Slider Section */}
      <div className="w-60% md:w-3/4">
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="slider-item relative">
              <img
                src={slide.image}
                alt={slide.title}
                className="slider-image rounded-lg"
              />
              <div className="slider-caption absolute inset-0  text-white flex flex-col justify-center items-center p-4">
                <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                <p className="text-lg">{slide.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
