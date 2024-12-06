import React from "react";
import { Link } from "react-router-dom";

function ForumPage() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Forum</h2>
      <p className="text-gray-700 mb-6">Diskusikan masalah tanaman jagungmu!</p>

      <div className="relative mb-6">
        <img
          src="../assets/tani2.png"
          alt="Discussion group"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      <div className="space-y-4">
        {/* Tombol masuk ke forum komunitas */}
        <Link
          to="/forum/community"
          className="block text-center bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold shadow-lg"
        >
          Masuk ke Forum Komunitas
        </Link>

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