import React from "react";
import { Link } from "react-router-dom";

const Restaurant = ({ image, name, id, open, close, description }) => {
  return (
    <article className="restaurant">
      <div className="img-container">
        <img src={image} alt={name} />
      </div>
      <div className="restaurant-footer">
        <Link to={`/restaurant/${id}`} className="btb btn-primary btn-details">
          Reservations
        </Link>
        <h3>{name}</h3>

        <p>{description}</p>
      </div>
    </article>
  );
};

export default Restaurant;
