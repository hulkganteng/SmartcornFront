import React, { useState } from "react";
import api from "../api"; // Mengimpor instance axios dari api.js
import FarmerImage from "../assets/corn farmer.png";

function LoginPage() {
  const [email, setEmail] = useState(""); // State untuk menyimpan email
  const [password, setPassword] = useState(""); // State untuk menyimpan password
  const [error, setError] = useState(""); // State untuk menangani error

  // Fungsi untuk menangani login
  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    try {
      // Mengirim request login menggunakan axios instance
      const response = await api.post("/auth/login", { email, password });

      // Mendapatkan token dan user dari response API
      const { token, user } = response.data;

      // Menyimpan token dan data user ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Memicu event 'storage' untuk memberi tahu perubahan data localStorage
      window.dispatchEvent(new Event("storage"));

      alert("Login berhasil!");
      window.location.href = "/"; // Redirect ke halaman utama setelah login berhasil
    } catch (err) {
      // Menangani error jika login gagal dan menampilkan pesan error
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Bagian Kiri - Gambar */}
      <div className="hidden md:flex flex-1 bg-green-600 items-center justify-center">
        <div className="w-3/4">
          <img src={FarmerImage} alt="Farmer" className="rounded-lg shadow-lg" />
        </div>
      </div>

      {/* Bagian Kanan - Form Login */}
      <div className="flex-1 flex items-center justify-center bg-white p-10">
        <div className="w-full max-w-md">
          <form className="space-y-6" onSubmit={handleLogin}>
            <h2 className="text-3xl font-semibold text-green-700 text-center mb-4">Login</h2>

            {/* Tampilkan Error jika ada */}
            {error && <p className="text-red-600 text-sm">{error}</p>}

            {/* Input Email */}
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Masukkan Email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Menyimpan nilai input email
                required
              />
            </div>

            {/* Input Password */}
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="Masukkan Kata Sandi"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Menyimpan nilai input password
                required
              />
            </div>

            {/* Tombol Login */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
            >
              Masuk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
