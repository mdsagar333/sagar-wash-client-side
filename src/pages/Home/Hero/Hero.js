import React from "react";
import "./Hero.css";
import image1 from "../../../assets/images/slider_1.jpg";
import image2 from "../../../assets/images/slider_2.jpg";
import image3 from "../../../assets/images/slider_3.jpg";
import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";

const AutoplaySlider = withAutoplay(AwesomeSlider);

const Hero = () => {
  return (
    <AutoplaySlider
      play={true}
      cancelOnInteraction={false} // should stop playing on user interaction
      interval={6000}
    >
      <div data-src={image1}>
        <div className="overlay-text">
          <div className="overlay-info p-5 text-light">
            <h6 className="text-capitalize">Professional Laundry Service</h6>
            <h1 className="fw-bold text-capitalize">
              A better you start with clean clothes
            </h1>
            <p className="text-capitalize">
              Be clean be confident, we care for the cloths you wear.
            </p>
          </div>
        </div>
      </div>
      <div data-src={image2}>
        <div className="overlay-text">
          <div className="overlay-info p-5 text-light">
            <h6 className="text-capitalize">Professional Laundry Service</h6>
            <h1 className="fw-bold text-capitalize">
              A better you start with clean clothes
            </h1>
            <p className="text-capitalize">
              Be clean be confident, we care for the cloths you wear.
            </p>
          </div>
        </div>
      </div>
      <div data-src={image3}>
        <div className="overlay-text">
          <div className="overlay-info p-5 text-light">
            <h6 className="text-capitalize">Professional Laundry Service</h6>
            <h1 className="fw-bold text-capitalize">
              A better you start with clean clothes
            </h1>
            <p className="text-capitalize">
              Be clean be confident, we care for the cloths you wear.
            </p>
          </div>
        </div>
      </div>
    </AutoplaySlider>
  );
};

export default Hero;
