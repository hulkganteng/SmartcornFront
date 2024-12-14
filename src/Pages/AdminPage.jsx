import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminPage() {
  const [articles, setArticles] = useState([]); // State untuk menyimpan daftar artikel

  // Fungsi untuk mengambil data artikel langsung dari database
  const fetchArticles = async () => {
    try {
      const token = localStorage.getItem("token"); // Ambil token dari localStorage
      const response = await axios.get("http://smartconweb.my.id/api/articles", {
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
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-4">Admin Dashboard</h2>

      <div className="mb-4">
        <button
          className="bg-green-600 text-white py-2 px-4 rounded-lg"
          onClick={() => (window.location.href = "/add-article")}
        >
          Tambah Artikel
        </button>
      </div>

      {/* Tabel Artikel */}
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">No</th>
              <th className="border px-4 py-2">Judul Artikel</th>
              <th className="border px-4 py-2">Penulis</th>
              <th className="border px-4 py-2">Tanggal</th>
              <th className="border px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {articles.length > 0 ? (
              articles.map((article, index) => (
                <tr key={article.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{article.title}</td>
                  <td className="border px-4 py-2">{article.author}</td>
                  <td className="border px-4 py-2">
                    {new Date(article.date).toLocaleDateString("id-ID")}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => (window.location.href = `/admin/edit-article/${article.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={async () => {
                        const token = localStorage.getItem("token");
                        try {
                          await axios.delete(`http://smartconweb.my.id/api/articles/${article.id}`, {
                            headers: { Authorization: `Bearer ${token}` },
                          });
                          fetchArticles(); // Refresh tabel setelah penghapusan
                        } catch (error) {
                          console.error("Error deleting article:", error);
                        }
                      }}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  Tidak ada artikel yang tersedia.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminPage;
