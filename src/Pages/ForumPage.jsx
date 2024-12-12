import React from "react";
import { Link } from "react-router-dom";
import Forum from "../assets/forum.png";

function ForumPage() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Forum</h2>
      <p className="text-gray-700 mb-6">Diskusikan masalah tanaman jagungmu!</p>

      <div className="relative mb-6">
      <img
          src={Forum}
          alt="forum"
          className="w-full h-80 md:h-96 lg:h-[20rem] mt-10 left-10 rounded-lg shadow-lg object-cover"
        />
      </div>

      <div className="space-y-4">

        {/* Tombol masuk ke halaman chat */}
        <Link
          to="/chat"
          className="block text-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg"
        >
          Buka Fitur Chat
        </Link>
      </div>
    </div>
  );
}

export default ForumPage;