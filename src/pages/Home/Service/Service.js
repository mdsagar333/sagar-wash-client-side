import React from "react";
import ServiceItem from "./ServiceItem";
import { useSelector, useDispatch } from "react-redux";

const Service = () => {
  const { name, value, isLoading, services, isDataLoading } = useSelector(
    (state) => state.globalState
  );

  if (isDataLoading) {
    return (
      <div className="container my-5 d-flex justify-content-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="my-5">
      <div className="container">
        <h1 className="text-center my-4">Our Services</h1>
        <div className="row">
          {services.map((item) => (
            <ServiceItem key={item._id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Service;

// https://ibb.co/wYf8gK0
// https://ibb.co/hf0yCtX
// https://ibb.co/vPvZ98L
// https://ibb.co/pxsMbBy
