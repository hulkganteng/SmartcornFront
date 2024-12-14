import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AdminPage() {
  const [articles, setArticles] = useState([]); // State untuk daftar artikel
  const navigate = useNavigate();

  // Fungsi untuk mengambil semua artikel dari backend
  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      const response = await axios.get("http://smartconweb.my.id/api/articles", {
        headers: { Authorization: `Bearer ${token}` }, // Tambahkan header Authorization
      });

      if (Array.isArray(response.data)) {
        setArticles(response.data); // Set data artikel ke state
      } else {
        console.error("Data artikel tidak valid:", response.data);
      }
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Fungsi untuk menghapus artikel berdasarkan ID
  const deleteArticle = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://smartconweb.my.id/api/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Perbarui daftar artikel setelah penghapusan
      setArticles((prev) => prev.filter((article) => article.id !== id));
    } catch (error) {
      console.error("Error deleting article:", error);
    }
  };

  // Ambil data artikel saat komponen di-mount
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      
      {/* Tombol Tambah Artikel */}
      <button
        onClick={() => navigate("/add-article")}
        className="bg-green-600 text-white py-2 px-4 rounded mb-4"
      >
        Tambah Artikel
      </button>

      {/* Tabel Artikel */}
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
                  {/* Tombol Edit Artikel */}
                  <button
                    onClick={() => navigate(`/admin/edit-article/${article.id}`)}
                    className="text-blue-600 hover:text-blue-800 mr-2"
                  >
                    Edit
                  </button>
                  {/* Tombol Hapus Artikel */}
                  <button
                    onClick={() => deleteArticle(article.id)}
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
