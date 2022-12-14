import { React, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import "./Slider.scss";
import { sliderData } from "./slider-data";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderLength = sliderData.length;

  const autoScroll = true;
  let intervalTime = 4000;
  let slideInterval;

  const prevSlide = () => {
    setCurrentSlide(currentSlide === sliderLength - 1 ? 0 : currentSlide + 1);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === 0 ? sliderLength - 1 : currentSlide - 1);
  };

    function auto() {
      slideInterval = setInterval(nextSlide, intervalTime);
    }

  // When page loads
  useEffect(() => {
    //Every time when page laod set current slide to 0
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (autoScroll) {
    
      auto();
    }

    //Cleanup function
    return () => clearInterval(slideInterval);
    // Adding dependency for making slide move more than once
  }, [currentSlide, autoScroll, slideInterval, auto]);

  return (
    <div className="slider">
      <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
      <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
      {sliderData.map((slide, index) => {
        const { image, heading, desc } = slide;
        return (
          <div
            key={index}
            className={index === currentSlide ? "slide current" : "slide"}
          >
            {index === currentSlide && (
              <>
                <img src={image} alt="image" />
                <div className="content">
                  <h2>{heading}</h2>
                  <p>{desc}</p>
                  <hr />
                  <a href="#product" className="--btn --btn-primary">
                    Shop
                  </a>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Slider;
