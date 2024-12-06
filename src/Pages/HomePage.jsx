// src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import FarmerImage1 from "../assets/corn farmer.png"; // Pastikan path ke gambar sesuai dengan proyek Anda
import FarmerImage2 from "../assets/petani.jpg";
import FarmerImage3 from "../assets/edukasi.png";
import FarmerImage4 from "../assets/forum.png";

function HomePage() {
  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-yellow-50 to-white min-h-screen py-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Image of Farmer */}
        <div className="flex justify-center mb-6 md:mb-0 md:mr-8">
          <img src={FarmerImage1} alt="Farmer" className="w-80 md:w-96 lg:w-[500px] h-auto" />
        </div>

        {/* Text Content */}
        <div className="text-left md:text-left">
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

      {/* Bagian Deteksi Penyakit */}
      <div className="container mx-auto p-8 mt-8">
        <Link to="/deteksi-penyakit" className="block">
          <h2 className="text-3xl font-bold text-green-700">Deteksi Penyakit</h2>
          <p className="text-gray-700 mb-2">Periksa penyakit tanaman jagung Anda!</p>

          {/* Gambar Petani */}
          <div className="relative flex items-center justify-center">
            <img
              src={FarmerImage2}
              alt="Petani"
              className="w-full lg:h-[20rem] mt-2 left-10 rounded-lg shadow-lg object-cover"
              style={{ height: "350px", objectFit: "cover" }}
            />
          </div>
        </Link>
      </div>

      {/* Bagian Edukasi */}
      <div className="container mx-auto p-8 mt-6">
        <Link to="/edukasi" className="block">
          <h2 className="text-3xl font-bold text-green-700">Edukasi</h2>
          <p className="text-gray-700 mb-2">Baca artikel seputar tanaman jagung!</p>

          {/* Gambar Petani */}
          <div className="relative flex items-center justify-center">
            <img
              src={FarmerImage3}
              alt="Petani"
              className="w-full h-80 md:h-96 lg:h-[20rem] mt-2 left-10 rounded-lg shadow-lg object-cover"
              style={{ height: "350px", objectFit: "cover" }}
            />
          </div>
        </Link>
      </div>

      {/* Bagian Forum */}
      <div className="container mx-auto p-8 mt-6">
        <Link to="/forum" className="block">
          <h2 className="text-3xl font-bold text-green-700">Forum</h2>
          <p className="text-gray-700 mb-2">Diskusikan masalah tanaman jagungmu!</p>

          {/* Gambar Petani */}
          <div className="relative flex items-center justify-center">
            <img
              src={FarmerImage4}
              alt="Petani"
              className="w-full h-80 md:h-96 lg:h-[20rem] mt-2 left-10 rounded-lg shadow-lg object-cover"
              style={{ height: "350px", objectFit: "cover" }}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
