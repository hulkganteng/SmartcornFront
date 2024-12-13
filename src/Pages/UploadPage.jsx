import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
    setSuccess("");
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("Ukuran gambar terlalu besar. Maksimal 10MB.");
        return;
      }
      if (!["image/png", "image/jpeg", "image/jpg"].includes(file.type)) {
        setError("Hanya mendukung file PNG, JPEG, atau JPG.");
        return;
      }

      setSelectedImage(file);
      setError(""); // Reset error jika file dipilih
      setSuccess(""); // Reset success jika file dipilih
    }
  };

  const handleCancel = () => {
    setSelectedImage(null); // Hapus gambar yang telah dipilih
    setError(""); // Reset error
    setSuccess(""); // Reset success
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

      const response = await fetch("http://smartconweb.my.id/api/v1/api/disease-detection/detect", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
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

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
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
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 cursor-pointer w-full text-center"
          >
            Pilih Foto
          </label>
        </div>

        <p className="text-sm text-gray-500">Hanya mendukung png, jpeg, jpg</p>

        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={handleCancel} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400">
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className={`bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 ${loading ? "bg-yellow-300 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Mengunggah..." : "Lanjut"}
          </button>
        </div>

        {loading && (
          <div className="text-center text-gray-500 mt-4">
            <div className="spinner-border text-yellow-500" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
