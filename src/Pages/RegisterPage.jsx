import React, { useState } from "react";
import api from "../api"; // Import utility Axios
import FarmerImage from "../assets/corn farmer.png";

function RegisterPage() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    city: "",
    province: "",
    country: "",
    age: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = "Nama depan harus diisi";
    if (!formData.last_name) newErrors.last_name = "Nama belakang harus diisi";
    if (!formData.email) {
      newErrors.email = "Email harus diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Kata sandi minimal 6 karakter";
    }
    if (!formData.city) newErrors.city = "Kota harus diisi";
    if (!formData.province) newErrors.province = "Provinsi harus diisi";
    if (!formData.country) newErrors.country = "Negara harus diisi";
    if (!formData.age || formData.age <= 0) newErrors.age = "Umur harus diisi dan valid";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors({});

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setLoading(true);
    try {
      const response = await api.post("/auth/register", formData); // Kirim data ke backend
      setSuccessMessage(response.data.message);
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        city: "",
        province: "",
        country: "",
        age: "",
      });

      // Redirect user to login page
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registrasi gagal. Coba lagi.";
      setErrors({ global: errorMessage });
    } finally {
      setLoading(false);
    }
  };

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
          <form className="space-y-4" onSubmit={handleSubmit}>
            <h2 className="text-3xl font-semibold text-green-700 text-center mb-4">Daftar</h2>

            {/* Global Error */}
            {errors.global && (
              <p className="text-center text-red-600 text-sm mb-4">{errors.global}</p>
            )}

            {/* Success Message */}
            {successMessage && (
              <p className="text-center text-green-600 text-sm mb-4">{successMessage}</p>
            )}

            {/* Input Fields */}
            <div>
              <label className="block text-gray-600 mb-1">Nama Depan</label>
              <input
                type="text"
                name="first_name"
                placeholder="Nama Depan"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={formData.first_name}
                onChange={handleChange}
              />
              {errors.first_name && (
                <p className="text-red-500 text-xs mt-1">{errors.first_name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Nama Belakang</label>
              <input
                type="text"
                name="last_name"
                placeholder="Nama Belakang"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={formData.last_name}
                onChange={handleChange}
              />
              {errors.last_name && (
                <p className="text-red-500 text-xs mt-1">{errors.last_name}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                placeholder="Alamat Email"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Kata Sandi"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Kota</label>
              <input
                type="text"
                name="city"
                placeholder="Kota"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={formData.city}
                onChange={handleChange}
              />
              {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Provinsi</label>
              <input
                type="text"
                name="province"
                placeholder="Provinsi"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={formData.province}
                onChange={handleChange}
              />
              {errors.province && (
                <p className="text-red-500 text-xs mt-1">{errors.province}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Negara</label>
              <input
                type="text"
                name="country"
                placeholder="Negara"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={formData.country}
                onChange={handleChange}
              />
              {errors.country && (
                <p className="text-red-500 text-xs mt-1">{errors.country}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-600 mb-1">Umur</label>
              <input
                type="number"
                name="age"
                placeholder="Umur"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-500"
                value={formData.age}
                onChange={handleChange}
              />
              {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded transition duration-200"
              disabled={loading}
            >
              {loading ? "Mendaftarkan..." : "Daftar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;