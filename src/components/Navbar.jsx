import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // State untuk menyimpan data user
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Untuk dropdown menu

  // Fungsi untuk memeriksa status login
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setIsLoggedIn(!!token); // Jika token ada, set isLoggedIn menjadi true
    if (storedUser) {
      setUser(storedUser); // Set data user dari localStorage
    }
  };

  useEffect(() => {
    // Periksa status login saat pertama kali render
    checkLoginStatus();

    // Tambahkan event listener untuk mendeteksi perubahan localStorage
    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storage", handleStorageChange);

    // Cleanup event listener saat komponen di-unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage")); // Trigger perubahan localStorage
    setDropdownOpen(false); // Tutup dropdown setelah logout
  };

  return (
    <nav className="bg-yellow-50 shadow-md py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Bagian Kiri: Logo */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-2xl font-bold text-black">
            Smart <span className="font-normal">Corn</span>
          </Link>

          {/* Menu Navigasi - Tampilan Desktop */}
          <div className="hidden md:flex space-x-6 text-black font-semibold">
            <Link to="/deteksi-penyakit" className="hover:text-slate-300 transition duration-200">
              Deteksi Penyakit
            </Link>
            <Link to="/edukasi" className="hover:text-slate-300 transition duration-200">
              Edukasi
            </Link>
            <Link to="/forum" className="hover:text-slate-300 transition duration-200">
              Forum
            </Link>
          </div>
        </div>

        {/* Hamburger Menu untuk Mobile */}
        <div className="md:hidden flex items-center" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="text-3xl">☰</span>
        </div>

        {/* Bagian Kanan: Tombol Login/Daftar atau Profil */}
        <div className="relative flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              {/* Tombol untuk Admin */}
              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition duration-200 font-semibold text-xs sm:text-sm"
                >
                  Halaman Admin
                </Link>
              )}

              {/* Tampilan untuk User yang Login */}
              <div className="flex items-center space-x-4">
                {/* Teks Salam dengan Gaya Tombol */}
                <div className="bg-green-600 text-white py-2 px-4 rounded-lg">
                  Hai, {user?.first_name || "Pengguna"} {user?.last_name || ""}
                </div>

                {/* Foto Profil */}
                {user?.photo ? (
                  <img
                    src={`http://localhost:3000${user.photo}`}
                    alt="Foto Profil"
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  />
                ) : (
                  <div
                    className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-white cursor-pointer"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {user?.first_name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </div>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-12 right-0 bg-white shadow-md rounded-lg py-2 w-40 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Edit Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Tampilan untuk User yang Belum Login */}
              <Link
                to="/login"
                className="hover:text-green-800 py-2 px-4 transition duration-200 font-semibold text-xs sm:text-sm"
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded transition duration-200 font-semibold text-xs sm:text-sm"
              >
                Daftar
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Menu Navigasi - Tampilan Mobile */}
      <div className={`md:hidden ${menuOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-yellow-50 shadow-md py-4 px-6 space-y-4`}>
        <Link to="/deteksi-penyakit" className="block text-green-600 font-semibold hover:text-green-800 transition duration-200">
          Deteksi Penyakit
        </Link>
        <Link to="/edukasi" className="block text-green-600 font-semibold hover:text-green-800 transition duration-200">
          Edukasi
        </Link>
        <Link to="/forum" className="block text-green-600 font-semibold hover:text-green-800 transition duration-200">
          Forum
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
