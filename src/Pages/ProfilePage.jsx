// src/pages/ProfilePage.jsx
import React from "react";

function ProfilePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        {/* Header Profil */}
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            {/* Inisial jika tidak ada gambar */}
            <span className="text-3xl font-bold text-green-500">U</span>
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">Nama Pengguna</h2>
            <p className="text-gray-600">user@example.com</p>
          </div>
        </div>

        {/* Informasi Profil */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Informasi Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Nama Depan</p>
              <p className="text-gray-800">Nama</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Nama Belakang</p>
              <p className="text-gray-800">Pengguna</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Nomor Telepon</p>
              <p className="text-gray-800">+62 123-4567-890</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Alamat</p>
              <p className="text-gray-800">Jl. Mawar No. 123, Jakarta</p>
            </div>
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end">
          <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200">
            Edit Profil
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;