import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import Hero from "./Hero/Hero";
import HowWork from "./HowWork/HowWork";
import Service from "./Service/Service";
import WhyChoose from "./WhyChoose/WhyChoose";

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <HowWork />
      <Service />
      <WhyChoose />
      <Footer />
    </>
  );
};

export default Home;
