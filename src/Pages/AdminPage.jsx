import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  const [articles, setArticles] = useState([]); // State untuk menyimpan daftar artikel

  // Fungsi untuk mengambil data artikel langsung dari database
  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      const response = await axios.get("http://smartconweb.my.id:3000/api/articles", {
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
        onClick={() => navigate("/add-article")}
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
          {articles.map((article, index) => (
            <tr key={article.id}>
              <td className="py-2 px-4 border-b">{index + 1}</td>
              <td className="py-2 px-4 border-b">{article.title}</td>
              <td className="py-2 px-4 border-b">{article.author}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => navigate(`/admin/edit-article/${article.id}`)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteArticle(article.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;
