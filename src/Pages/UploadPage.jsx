import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // State untuk status loading
  const [error, setError] = useState(""); // State untuk error
  const [success, setSuccess] = useState(""); // State untuk success message
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setError(""); // Reset error jika file dipilih
      setSuccess(""); // Reset success jika file dipilih
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      setError("Silakan pilih gambar terlebih dahulu.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      setLoading(true);
      setError(""); // Reset error saat upload dimulai
      setSuccess(""); // Reset success saat upload dimulai

      const response = await fetch("http://localhost:3000/api/disease-detection/detect", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setLoading(false); // Matikan loading setelah response diterima

      if (response.ok) {
        // Redirect ke halaman hasil jika deteksi berhasil
        setSuccess("Deteksi berhasil! Menampilkan hasil...");
        navigate("/hasil", { state: { result: result } });
      } else {
        setError(result.message || "Terjadi kesalahan saat mengunggah gambar.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error during upload:", error);
      setError("Terjadi kesalahan saat mengunggah gambar.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Deteksi Penyakit Identifikasi</h2>

      <div className="bg-green-50 border border-green-200 rounded-lg p-8 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Media Upload</h3>
        <p className="text-sm text-gray-500 mb-4">Tambahkan foto disini, maksimal 10MB</p>

        {/* Menampilkan error jika ada */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {/* Menampilkan success jika upload berhasil */}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}

        <div className="border-2 border-dashed border-yellow-500 rounded-lg p-10 text-center mb-4">
          <p className="text-gray-400">Tarik foto untuk upload masalah tumbuhan</p>
          <p className="text-gray-500 my-2">OR</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 cursor-pointer"
          >
            Pilih Foto
          </label>
        </div>

        <p className="text-sm text-gray-500">Hanya mendukung png, jpeg, jpg</p>

        <div className="flex justify-end space-x-4 mt-4">
          <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className={`bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 ${
              loading ? "bg-yellow-300 cursor-not-allowed" : ""
            }`}
            disabled={loading} // Nonaktifkan tombol saat loading
          >
            {loading ? "Mengunggah..." : "Lanjut"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;
