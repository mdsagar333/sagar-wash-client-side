import React from "react";
import { Link } from "react-router-dom";

const ServiceItem = ({ _id, servieTitle, image, text, perItem, perKg }) => {
  return (
    <div className="col-12 col-md-3 d-flex align-items-stretch">
      <div className="card">
        <img
          src={image}
          className="card-img-top"
          alt="..."
          style={{ maxHeight: "170px" }}
        />
        <div className="card-body">
          <h5 className="card-title text-uppercase mb-4">{servieTitle}</h5>
          <div className="d-flex justify-content-between mb-3">
            <p className="text-muted fw-bold">Per Item</p>
            <p className="badge bg-primary">${perItem}</p>
          </div>
          <p className="card-text">{text}</p>
        </div>
        <Link to={`service/${_id}`} className="btn btn-primary">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ServiceItem;
