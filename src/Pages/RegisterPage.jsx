// src/pages/RegisterPage.jsx
import React from "react";
import FarmerImage from "../assets/farmer.png"; // Pastikan path ke gambar benar

function RegisterPage() {
  return (
    <div className="flex min-h-screen">
      {/* Gambar Petani */}
      <div className="hidden md:flex flex-1 bg-green-600 items-center justify-center">
        <div className="w-3/4">
          <img src={FarmerImage} alt="Farmer" className="rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Form Register */}
      <div className="flex-1 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <form className="space-y-4">
            <h2 className="text-3xl font-semibold text-green-700 text-center mb-4">Daftar</h2>
            
            <div>
              <label className="block text-gray-600 mb-1">Nama Depan</label>
              <input
                type="text"
                placeholder="Nama Depan"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Nama Belakang</label>
              <input
                type="text"
                placeholder="Nama Belakang"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Alamat email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Kota</label>
              <input
                type="text"
                placeholder="Asal Kota"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Provinsi</label>
              <input
                type="text"
                placeholder="Asal Provinsi"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Negara</label>
              <input
                type="text"
                placeholder="Asal Negara"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Umur</label>
              <input
                type="number"
                placeholder="Umur"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Tombol Daftar */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
            >
              Selanjutnya
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;