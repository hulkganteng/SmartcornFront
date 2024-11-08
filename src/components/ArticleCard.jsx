// src/components/ArticleCard.jsx
import React from "react";
import { Link } from "react-router-dom";

function ArticleCard({ image, title, author, date, categories }) {
  return (
    <div className="flex items-start bg-gray-100 rounded-lg p-4 shadow-lg mb-4">
      <img src={image} alt={title} className="w-24 h-24 rounded-lg mr-4 object-cover" />
      <div className="flex-1">
        <Link to="/education/detail" className="text-lg font-semibold text-green-700 hover:underline">
          {title}
        </Link>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <div className="mt-2">
          {categories.map((category, index) => (
            <span
              key={index}
              className="inline-block bg-green-100 text-green-600 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;