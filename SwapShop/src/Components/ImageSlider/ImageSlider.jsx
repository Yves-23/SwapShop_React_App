import React from "react";
import Slider from "react-slick";
import Image1 from "../../assets/Slider/Electronic.jpg";
import Image2 from "../../assets/Slider/Fashion.jpg";
import Image3 from "../../assets/Slider/Home.jpg";
import "./ImageSlider.css"; // Optional, for custom styles

const ImageSlider = () => {
  const settings = {
    dots: true,
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

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="slider-item">
            <img
              src={slide.image}
              alt={slide.title}
              className="slider-image"
            />
            <div className="slider-caption">
              <div className="slider-caption1">
                <h2>{slide.title}</h2>
              </div>
              <div className="slider-caption2">
                <h2>{slide.description}</h2>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
