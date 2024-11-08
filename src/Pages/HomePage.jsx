// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import FarmerImage from "../assets/farmer.png"; // Pastikan path ke gambar sesuai dengan proyek Anda

function HomePage() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-yellow-50 to-white min-h-screen py-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
        {/* Image of Farmer */}
        <div className="flex justify-center mb-6 md:mb-0 md:mr-8">
          <img src={FarmerImage} alt="Farmer" className="w-80 md:w-96 lg:w-[500px] h-auto" />
        </div>


        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-green-700">Smart Corn</h1>
          <p className="text-xl text-green-600 mt-2">Solusi Pintar untuk Petani Jagung</p>
          <p className="text-gray-700 mt-4">
            Pantau Kesehatan Tanaman, Deteksi Penyakit dan Tingkatkan Hasil Panen Anda dengan Teknologi Canggih
          </p>

          {/* Buttons */}
          <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-start space-y-3 md:space-y-0 md:space-x-4">
            <Link
              to="/register"
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded shadow-lg"
            >
              Mulai Sekarang
            </Link>
            <Link
              to="/about"
              className="bg-green-100 hover:bg-green-200 text-green-600 py-2 px-6 rounded shadow-lg"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;