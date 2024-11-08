// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md py-4 px-6">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo and Navigation Links */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-700 flex items-center space-x-2">
            <span>Smart Corn</span>
            <span role="img" aria-label="corn">🌽</span>
          </Link>
          
          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex space-x-6 text-green-600 font-semibold">
            <Link to="/deteksi-penyakit" className="hover:text-green-800 transition duration-200">
              Deteksi Penyakit
            </Link>
            <Link to="/edukasi" className="hover:text-green-800 transition duration-200">
              Edukasi
            </Link>
            <Link to="/forum" className="hover:text-green-800 transition duration-200">
              Forum
            </Link>
            <Link to="/profile" className="hover:text-green-800 transition duration-200">
              Profile
            </Link>
          </div>
        </div>

        {/* Burger Icon */}
        <button 
          className="text-green-600 md:hidden focus:outline-none" 
          onClick={() => setOpen(!open)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
          </svg>
        </button>

        {/* Login and Register Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link to="/login" className="text-green-600 font-semibold hover:text-green-800 transition duration-200">
            Masuk
          </Link>
          <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold transition duration-200">
            Daftar
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white shadow-md py-4 px-6 space-y-4 text-center">
          <Link to="/deteksi-penyakit" className="block text-green-600 hover:text-green-800 font-semibold transition duration-200">
            Deteksi Penyakit
          </Link>
          <Link to="/edukasi" className="block text-green-600 hover:text-green-800 font-semibold transition duration-200">
            Edukasi
          </Link>
          <Link to="/forum" className="block text-green-600 hover:text-green-800 font-semibold transition duration-200">
            Forum
          </Link>
          <Link to="/profile" className="block text-green-600 hover:text-green-800 font-semibold transition duration-200">
            Profile
          </Link>
          <Link to="/login" className="block text-green-600 font-semibold hover:text-green-800 transition duration-200">
            Masuk
          </Link>
          <Link to="/register" className="block bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold transition duration-200">
            Daftar
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;