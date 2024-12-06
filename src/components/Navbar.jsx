import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // Fungsi untuk memeriksa status login dan role
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.role) {
      setUserRole(user.role); // Set role dari data user
    }
    setIsLoggedIn(!!token); // Jika token ada, set isLoggedIn menjadi true
  };

  useEffect(() => {
    // Periksa status login dan role saat pertama kali render
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
  };

  return (
    <nav className="bg-yellow-50 shadow-md py-4 px-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Bagian Kiri: Logo dan Menu */}
        <div className="flex items-center space-x-8">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-green-700 flex items-center space-x-2">
            <span>Smart Corn</span>
            <span role="img" aria-label="corn">🌽</span>
          </Link>

          {/* Menu Navigasi - Tampilan Desktop */}
          <div className="hidden md:flex space-x-6 text-green-600 font-semibold">
            <Link to="/deteksi-penyakit" className="hover:text-green-800 transition duration-200">
              Deteksi Penyakit
            </Link>
            <Link to="/edukasi" className="hover:text-green-800 transition duration-200">
              Edukasi
            </Link>
            <Link to="/forum" className="hover:text-green-800 transition duration-200">
              Forum
            </Link>
          </div>
        </div>

        {/* Hamburger Menu untuk Mobile */}
        <div className="md:hidden flex items-center" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="text-3xl">☰</span>
        </div>

        {/* Bagian Kanan: Tombol Login/Daftar atau Profile/Logout */}
        <div className="flex items-center space-x-6">
          {isLoggedIn ? (
            <>
              {/* Tombol untuk Admin */}
              {userRole === "admin" && (
                <Link
                  to="/admin"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded transition duration-200 font-semibold text-xs sm:text-sm"
                >
                  Halaman Admin
                </Link>
              )}
              <Link
                to="/profile"
                className="hover:text-green-800 transition duration-200 font-semibold text-xs sm:text-sm"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-800 font-semibold text-xs sm:text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
