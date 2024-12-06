// src/components/Card.jsx
import React from "react";
import { Link } from "react-router-dom";

function Card({ title, description, imageSrc, link }) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer">
      <Link to={link}>
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-80 md:h-96 lg:h-[20rem] object-cover"
        />
        <div className="absolute bottom-0 bg-black bg-opacity-50 text-white w-full p-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default Card;
