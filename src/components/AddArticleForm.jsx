import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate untuk navigasi programatik
import api from "../api"; // Pastikan Anda memiliki instance API untuk menangani request
import ReactQuill from "react-quill"; // Mengimpor React Quill
import "react-quill/dist/quill.snow.css"; // Impor stylesheet untuk Quill

function AddArticleForm() {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
    categories: "",
    image: null,
  });

  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Fungsi untuk menangani perubahan input
  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] }); // Menangani input file
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value }); // Menangani input teks
    }
  };

  // Fungsi untuk menangani perubahan konten dengan React Quill
  const handleEditorChange = (value) => {
    setFormData({ ...formData, content: value }); // Update konten dengan nilai dari Quill
  };

  // Fungsi untuk menangani submit formulir
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("author", formData.author);
    data.append("categories", formData.categories);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      // API Endpoint yang benar (untuk unggah artikel)
      await api.post("/articles/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Pastikan token valid
        },
      });

      alert("Artikel berhasil diunggah!");

      // Reset form setelah berhasil
      setFormData({
        title: "",
        content: "",
        author: "",
        categories: "",
        image: null,
      });

      // Navigasi kembali ke halaman EducationPage setelah artikel di-upload
      navigate("/edukasi"); // Menggunakan useNavigate untuk kembali ke halaman EducationPage

    } catch (error) {
      console.error("Error uploading article:", error.response || error.message);
      alert(
        error.response?.data?.message ||
          "Gagal mengunggah artikel! Periksa koneksi dan coba lagi."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow"
      encType="multipart/form-data"
    >
      <h2 className="text-2xl font-bold mb-4">Tambah Artikel Baru</h2>

      <div className="mb-4">
        <label className="block text-gray-700">Judul</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Konten</label>
        {/* React Quill Editor untuk konten */}
        <ReactQuill
          value={formData.content}
          onChange={handleEditorChange}
          className="border p-2 rounded"
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              [{ align: [] }],
              ["link"],
            ],
          }}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Penulis</label>
        <input
          type="text"
          name="author"
          value={formData.author}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Kategori</label>
        <input
          type="text"
          name="categories"
          value={formData.categories}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Gambar</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Tambahkan Artikel
      </button>
    </form>
  );
}

export default AddArticleForm;
