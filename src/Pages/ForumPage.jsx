// src/pages/ForumPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function ForumPage() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Forum</h2>
      <p className="text-gray-700 mb-6">Diskusikan masalah tanaman jagungmu!</p>

      <div className="relative mb-6">
        <img
          src="/path/to/forum-image.jpg"
          alt="Discussion group"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      <Link
        to="/forum/community"
        className="block text-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg"
      >
        Masuk ke Forum Komunitas
      </Link>
    </div>
  );
}

export default ForumPage;