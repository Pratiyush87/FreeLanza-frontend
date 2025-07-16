import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slide.scss";

const Slide = ({ children, slidesToShow = 3, arrowsScroll = 1 }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? Math.min(slidesToShow - 2, 3) : slidesToShow,
    slidesToScroll: isMobile ? 1 : arrowsScroll,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    cssEase: "ease-in-out",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(slidesToShow, 4),
          slidesToScroll: Math.min(arrowsScroll, 3)
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(slidesToShow - 2, 2),
          slidesToScroll: 1,
          dots: false
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false
        }
      }
    ]
  };

  return (
    <div className="slide">
      <div className="container">
        <Slider {...settings}>
          {React.Children.map(children, (child, index) => (
            <div key={index} className="slide-item">
              {child}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;