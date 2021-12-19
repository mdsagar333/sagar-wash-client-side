import React from "react";
import { HiOutlineLightBulb, HiOutlineBadgeCheck } from "react-icons/hi";
import { RiPriceTag2Fill } from "react-icons/ri";
import { FaBed, FaTruck } from "react-icons/fa";
import { BsCardChecklist } from "react-icons/bs";
const WhyChoose = () => {
  return (
    <div className="container-fluid my-5">
      <h1 className="text-center mb-4">Why Choose Us</h1>
      <div className="row g-4 mt-4">
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-2">
              <HiOutlineLightBulb
                style={{
                  color: "#5ebb60",
                  fontSize: "65px",
                  marginRight: "8px",
                }}
              />
            </div>
            <div className="col-9">
              <h5 style={{ color: "#5ebb60" }}>Persionalized Experience</h5>
              <p>
                We take utmost care of your clothes, segregating based on the
                cloth type and giving you instant clothes to make a statement.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-2">
              <RiPriceTag2Fill
                style={{
                  color: "#5ebb60",
                  fontSize: "65px",
                  marginRight: "8px",
                }}
              />
            </div>
            <div className="col-9">
              <h5 style={{ color: "#5ebb60" }}>Affordable Pricing</h5>
              <p>
                Prices that suits your pocket is one of our USP. An option of
                choosing between 2 types of pricing is available.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-2">
              <FaBed
                style={{
                  color: "#5ebb60",
                  fontSize: "65px",
                  marginRight: "8px",
                }}
              />
            </div>
            <div className="col-9">
              <h5 style={{ color: "#5ebb60" }}>Convenience</h5>
              <p>
                With just a tap of a button, your laundry gets done, giving your
                leisure time to spend with family and friends.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-2">
              <HiOutlineBadgeCheck
                style={{
                  color: "#5ebb60",
                  fontSize: "65px",
                  marginRight: "8px",
                }}
              />
            </div>
            <div className="col-9">
              <h5 style={{ color: "#5ebb60" }}>Quality</h5>
              <p>
                We use the best in class products, to assure that your favorite
                clothes are always there for you to wear.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-2">
              <FaTruck
                style={{
                  color: "#5ebb60",
                  fontSize: "65px",
                  marginRight: "8px",
                }}
              />
            </div>
            <div className="col-9">
              <h5 style={{ color: "#5ebb60" }}>Instant Order Update</h5>
              <p>
                Regular updates of your order, to help you keep a track of your
                laundry and plan accordingly.
              </p>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="row">
            <div className="col-2">
              <BsCardChecklist
                style={{
                  color: "#5ebb60",
                  fontSize: "65px",
                  marginRight: "8px",
                }}
              />
            </div>
            <div className="col-9">
              <h5 style={{ color: "#5ebb60" }}>Persionalized Experience</h5>
              <p>
                We take utmost care of your clothes, segregating based on the
                cloth type and giving you instant clothes to make a statement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
