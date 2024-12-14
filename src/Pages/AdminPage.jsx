import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "https://smartconweb.my.id/api"; // Gunakan HTTPS yang benar

function AdminPage() {
  const [articles, setArticles] = useState([]); // State untuk menyimpan daftar artikel
  const navigate = useNavigate(); // Hook untuk navigasi

  // Fungsi untuk mengambil data artikel langsung dari database
  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      const response = await axios.get(`${API_BASE_URL}/articles`, {
        headers: { Authorization: `Bearer ${token}` }, // Header otorisasi
      });

      // Periksa apakah respons adalah array
      if (Array.isArray(response.data)) {
        setArticles(response.data); // Simpan data artikel di state
      } else {
        console.error("Data artikel tidak valid:", response.data);
        setArticles([]); // Jika respons tidak valid, set data ke array kosong
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
      alert("Gagal mengambil artikel. Silakan coba lagi.");
    }
  };

  // Fungsi untuk menghapus artikel
  const deleteArticle = async (id) => {
    try {
      const token = localStorage.getItem("token"); // Ambil token untuk otorisasi
      await axios.delete(`${API_BASE_URL}/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` }, // Header otorisasi
      });

      // Refresh data artikel setelah menghapus
      setArticles((prevArticles) => prevArticles.filter((article) => article.id !== id));
      alert("Artikel berhasil dihapus!");
    } catch (error) {
      console.error("Error deleting article:", error);
      alert("Gagal menghapus artikel. Silakan coba lagi.");
    }
  };

  // Ambil data artikel saat komponen di-mount
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <button
        onClick={() => navigate("/add-article")} // Navigasi ke halaman tambah artikel
        className="bg-green-600 text-white py-2 px-4 rounded mb-4"
      >
        Tambah Artikel
      </button>
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Judul Artikel</th>
            <th className="py-2 px-4 border-b">Penulis</th>
            <th className="py-2 px-4 border-b">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {articles.length > 0 ? (
            articles.map((article, index) => (
              <tr key={article.id}>
                <td className="py-2 px-4 border-b">{index + 1}</td>
                <td className="py-2 px-4 border-b">{article.title}</td>
                <td className="py-2 px-4 border-b">{article.author}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => navigate(`/admin/edit-article/${article.id}`)} // Navigasi ke halaman edit
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini?")) {
                        deleteArticle(article.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                Tidak ada artikel yang tersedia.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
