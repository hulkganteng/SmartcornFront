// src/pages/DiseaseDetectionPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import FarmerImage from "../assets/petani.jpg"; // Pastikan path gambar benar

function DiseaseDetectionPage() {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold text-green-700 mb-2">Deteksi Penyakit</h2>
      <p className="text-gray-700 mb-2">Periksa penyakit tanaman jagung Anda!</p>

      {/* Gambar Petani dengan Tombol Riwayat */}
      <div className="relative flex items-center justify-center mb-6">
        <img
          src={FarmerImage}
          alt="Petani"
          className="w-full h-80 md:h-96 lg:h-[20rem] mt-10 left-10 rounded-lg shadow-lg object-cover"
        />
        {/* Tombol Riwayat */}
        <div className="absolute top-0 right-4 md:right-0">
          <Link
            to="/riwayat"
            className="bg-yellow-400 text-white py-2 px-4 rounded-lg hover:bg-yellow-500"
          >
            Riwayat
          </Link>
        </div>
      </div>

      {/* Tombol Cek Sekarang */}
      <Link
        to="/identifikasi"
        className="block text-center bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg mx-auto w-1/2 md:w-1/3 lg:w-1/4"
      >
        Cek Sekarang!
      </Link>
    </div>
  );
}

export default DiseaseDetectionPage;
