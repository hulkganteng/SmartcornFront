import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown Foto Profil
  const [sidebarOpen, setSidebarOpen] = useState(false); // Sidebar Mobile

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!token);
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <>
      {/* Navbar Utama */}
      <nav className="bg-yellow-50 shadow-md py-4 px-6">
        <div className="container mx-auto flex items-center justify-between">
          {/* Kiri: Menu Navigasi */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="text-2xl font-bold text-black">
              Smart <span className="font-normal">Corn</span>
            </Link>
            <div className="hidden md:flex space-x-6 text-black font-semibold">
              <Link to="/deteksi-penyakit" className="hover:text-slate-300 transition">
                Deteksi Penyakit
              </Link>
              <Link to="/edukasi" className="hover:text-slate-300 transition">
                Edukasi
              </Link>
              <Link to="/forum" className="hover:text-slate-300 transition">
                Forum
              </Link>
            </div>
          </div>

          {/* Kanan: Hai User, Halaman Admin, Foto Profil */}
          <div className="hidden md:flex items-center space-x-6">
            {isLoggedIn ? (
              <>
                {/* Halaman Admin */}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-yellow-600 transition"
                  >
                    Halaman Admin
                  </Link>
                )}

                {/* Hai User */}
                <span className="text-green-600 font-semibold">
                  Hai, {user?.first_name || "User"}
                </span>

                {/* Foto Profil */}
                <div className="relative">
                  <img
                    src={
                      user?.photo
                        ? `https://smartconweb.my.id${user.photo}` // API Endpoint dengan HTTPS
                        : "https://smartconweb.my.id/uploads/default.png"
                    }
                    alt="Foto Profil"
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Edit Profil
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-800 font-medium"
                >
                  Masuk
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Daftar
                </Link>
              </>
            )}
          </div>

          {/* Burger Menu Mobile */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="text-3xl">
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Sidebar Mobile */}
      {sidebarOpen && (
        <div className="fixed top-0 left-0 w-3/4 h-full bg-white shadow-lg z-50">
          <div className="p-4 flex justify-between items-center border-b">
            <h2 className="text-2xl font-bold text-green-600">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-3xl text-red-500"
            >
              &times;
            </button>
          </div>

          {/* Sidebar Links */}
          <ul className="p-4 space-y-4">
            <li>
              <Link
                to="/deteksi-penyakit"
                className="text-gray-700 text-lg hover:text-green-600"
                onClick={() => setSidebarOpen(false)}
              >
                Deteksi Penyakit
              </Link>
            </li>
            <li>
              <Link
                to="/edukasi"
                className="text-gray-700 text-lg hover:text-green-600"
                onClick={() => setSidebarOpen(false)}
              >
                Edukasi
              </Link>
            </li>
            <li>
              <Link
                to="/forum"
                className="text-gray-700 text-lg hover:text-green-600"
                onClick={() => setSidebarOpen(false)}
              >
                Forum
              </Link>
            </li>
            {isLoggedIn && user?.role === "admin" && (
              <li>
                <Link
                  to="/admin"
                  className="text-gray-700 text-lg hover:text-green-600"
                  onClick={() => setSidebarOpen(false)}
                >
                  Halaman Admin
                </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <Link
                  to="/profile"
                  className="text-gray-700 text-lg hover:text-green-600"
                  onClick={() => setSidebarOpen(false)}
                >
                  Edit Profil
                </Link>
              </li>
            )}
            {isLoggedIn ? (
              <li>
                <button
                  onClick={() => {
                    handleLogout();
                    setSidebarOpen(false);
                  }}
                  className="text-red-500 text-lg hover:text-red-700"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="text-green-600 text-lg hover:text-green-800"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Masuk
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="text-green-600 text-lg hover:text-green-800"
                    onClick={() => setSidebarOpen(false)}
                  >
                    Daftar
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
