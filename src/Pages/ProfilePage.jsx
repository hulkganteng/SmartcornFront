import React, { useEffect, useState } from "react";
import axios from "axios";

function ProfilePage() {
  const [user, setUser] = useState(null); // State untuk menyimpan data user
  const [editData, setEditData] = useState({
    first_name: "",
    last_name: "",
  }); // State untuk form edit nama
  const [newPhoto, setNewPhoto] = useState(null); // State untuk file foto baru
  const [isEditing, setIsEditing] = useState(false); // State untuk modal edit

  // Fungsi untuk mengambil data user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) throw new Error("User not logged in");

        const parsedUser = JSON.parse(storedUser);
        const response = await axios.get(
          `http://smartconweb.my.id:3000/api/auth/profile/${parsedUser.user_id}` // Ganti endpoint sesuai backend
        );

        const userData = response.data.user;

        // Perbaiki path foto profil jika diperlukan
        if (userData.photo) {
          userData.photo = userData.photo.startsWith('/uploads/profiles/')
            ? userData.photo // Path sudah benar
            : `/uploads/profiles/${userData.photo}`; // Tambahkan prefix jika hanya nama file
        }

        setUser(userData); // Simpan data user ke state
        setEditData({
          first_name: userData.first_name,
          last_name: userData.last_name,
        });

        localStorage.setItem("user", JSON.stringify(userData)); // Simpan ke localStorage
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  // Fungsi untuk menyimpan perubahan profil
  const handleSaveProfile = async () => {
    const formData = new FormData();
    formData.append("first_name", editData.first_name);
    formData.append("last_name", editData.last_name);
    if (newPhoto) {
      formData.append("photo", newPhoto);
    }

    try {
      const response = await axios.put(
        `http://smartconweb.my.id:3000/api/auth/profile/${user.user_id}`, // Ganti endpoint sesuai backend
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedUser = response.data.user;

      // Perbaiki path foto profil jika diperlukan
      if (updatedUser.photo) {
        updatedUser.photo = updatedUser.photo.startsWith('/uploads/profiles/')
          ? updatedUser.photo // Path sudah benar
          : `/uploads/profiles/${updatedUser.photo}`; // Tambahkan prefix jika hanya nama file
      }

      setUser(updatedUser); // Perbarui state user
      localStorage.setItem("user", JSON.stringify(updatedUser)); // Simpan ke localStorage
      setIsEditing(false); // Tutup modal edit
      alert("Profil berhasil diperbarui!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Gagal memperbarui profil. Silakan coba lagi.");
    }
  };

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

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        {/* Header Profil */}
        <div className="flex items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
            {user.photo ? (
              <img
                src={`http://smartconweb.my.id:3000${user.photo}`} // Gunakan path foto yang benar
                alt="Foto Profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-green-500">
                {user.first_name[0]}
                {user.last_name[0]}
              </span>
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-200"
          >
            Edit Profil
          </button>
        </div>
      </div>

      {/* Modal Edit Profil */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Edit Profil
            </h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Nama Depan
              </label>
              <input
                type="text"
                name="first_name"
                value={editData.first_name}
                onChange={(e) => setEditData({ ...editData, first_name: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Nama Belakang
              </label>
              <input
                type="text"
                name="last_name"
                value={editData.last_name}
                onChange={(e) => setEditData({ ...editData, last_name: e.target.value })}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2">
                Foto Profil
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setNewPhoto(e.target.files[0])}
                className="border border-gray-300 rounded-lg p-2 w-full"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleSaveProfile}
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
