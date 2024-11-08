// src/pages/LoginPage.jsx
import React from "react";
import FarmerImage from "../assets/farmer.png"; // Pastikan path ke gambar benar

function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Gambar Petani */}
      <div className="hidden md:flex flex-1 bg-green-600 items-center justify-center">
        <div className="w-3/4">
          <img src={FarmerImage} alt="Farmer" className="rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Form Login */}
      <div className="flex-1 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <form className="space-y-6">
            <h2 className="text-3xl font-semibold text-green-700 text-center mb-4">Login</h2>
            
            <div>
              <label className="block text-gray-600 mb-1">No Hp</label>
              <input
                type="text"
                placeholder="Masukkan No Hp"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-600 mb-1">Kata Sandi</label>
              <input
                type="password"
                placeholder="Masukkan kata sandi"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
              />
            </div>

            {/* Checkbox and Forgot Password */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-green-600" />
                <span className="ml-2">Selalu Ingat</span>
              </label>
              <a href="#" className="text-green-600 hover:underline">Lupa Kata Sandi?</a>
            </div>

            {/* Tombol Masuk */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
            >
              Masuk
            </button>

            {/* Link ke halaman register */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Jika belum punya akun? <a href="/register" className="text-green-600 hover:underline">Daftar</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;