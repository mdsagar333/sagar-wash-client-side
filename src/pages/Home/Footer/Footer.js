import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <div className=" mt-5">
        <div style={{ background: "#5EBB60", color: "#fff" }} className="p-2">
          <div className="container pt-3">
            <div className="row">
              <div className="col-12 col-md-3">
                <h4 className="text-uppercase fw-bold">Sagar wash</h4>
                <p>Save time, enjoy life</p>
              </div>
              <div className="col-12 col-md-6">
                <div className="text-center">
                  <h2>Get started today</h2>
                  <h1>+8801712942637</h1>
                </div>
              </div>
              <div className="col-12 col-md-3">
                <div className="icon_container">
                  <span className="icon_wrapper">
                    <FaFacebookF />
                  </span>
                  <span className="icon_wrapper">
                    <FaTwitter />
                  </span>
                  <span className="icon_wrapper">
                    <FaInstagram />
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center">
            &copy; 2021 SAGAR WASH All rights reserved. Developed by Mahommed
            Sagar
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
