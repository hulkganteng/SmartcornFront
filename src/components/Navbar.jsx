// src/components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-green-700 flex items-center space-x-2">
          <span>Smart Corn</span>
          <span role="img" aria-label="corn">🌽</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-green-600 font-semibold">
          <Link to="/deteksi-penyakit" className="hover:text-green-800">
            Deteksi Penyakit
          </Link>
          <Link to="/edukasi" className="hover:text-green-800">
            Edukasi
          </Link>
          <Link to="/forum" className="hover:text-green-800">
            Forum
          </Link>
          <Link to="/profile" className="hover:text-green-800">
            Profile
          </Link>
        </div>

        {/* Login and Register Buttons */}
        <div className="flex space-x-4">
          <Link to="/login" className="text-green-600 font-semibold hover:text-green-800">
            Masuk
          </Link>
          <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold">
            Daftar
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;