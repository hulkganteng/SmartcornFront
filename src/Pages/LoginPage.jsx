import React, { useState } from "react";
import api from "../api";
import FarmerImage from "../assets/corn farmer.png";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data;

      // Simpan token dan data user ke localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Trigger perubahan localStorage secara manual
      window.dispatchEvent(new Event("storage"));

      alert("Login berhasil!");
      window.location.href = "/"; // Redirect ke halaman utama
    } catch (err) {
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
            
            {/* Tampilkan Error */}
            {error && <p className="text-red-600 text-sm">{error}</p>}
            
            {/* Input Email */}
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Masukkan Email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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