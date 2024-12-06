import React, { useEffect, useState } from "react";

function ProfilePage() {
  const [user, setUser] = useState(null); // State untuk menyimpan data user

  // Ambil data user dari localStorage saat komponen di-mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Parsing data user dari string JSON
    }
  }, []);

  // Jika user belum login, tampilkan pesan
  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <p className="text-red-500 text-center text-lg">
          Anda belum login. Silakan login terlebih dahulu.
        </p>
      </div>
    );
  }

  // Jika user sudah login, tampilkan data profil
  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        {/* Header Profil */}
        <div className="flex items-center mb-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            <span className="text-3xl font-bold text-green-500">
              {user.first_name[0]}{user.last_name[0]} {/* Inisial Nama */}
            </span>
          </div>
          {/* Informasi Nama dan Email */}
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        {/* Informasi Detail User */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Informasi Pribadi</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500 text-sm">Nama Depan</p>
              <p className="text-gray-800">{user.first_name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Nama Belakang</p>
              <p className="text-gray-800">{user.last_name}</p>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-gray-800">{user.email}</p>
            </div>
            {user.city && (
              <div>
                <p className="text-gray-500 text-sm">Kota</p>
                <p className="text-gray-800">{user.city}</p>
              </div>
            )}
            {user.province && (
              <div>
                <p className="text-gray-500 text-sm">Provinsi</p>
                <p className="text-gray-800">{user.province}</p>
              </div>
            )}
            {user.country && (
              <div>
                <p className="text-gray-500 text-sm">Negara</p>
                <p className="text-gray-800">{user.country}</p>
              </div>
            )}
            {user.age && (
              <div>
                <p className="text-gray-500 text-sm">Umur</p>
                <p className="text-gray-800">{user.age}</p>
              </div>
            )}
          </div>
        </div>

        {/* Tombol Aksi */}
        <div className="flex justify-end">
          <button
            onClick={() => alert("Fitur edit profil sedang dalam pengembangan.")}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Edit Profil
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;