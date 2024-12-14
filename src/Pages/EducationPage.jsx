import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import api from "../api";

function EducationPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk mengambil artikel dari API
  const fetchArticles = async () => {
    try {
      const response = await api.get("/articles"); // Memanggil endpoint API untuk mengambil artikel
      setArticles(response.data); // Menyimpan data artikel yang diterima ke state
    } catch (error) {
      console.error("Error fetching articles:", error); // Menangani error saat pengambilan data
    } finally {
      setLoading(false); // Mengubah status loading setelah pengambilan data selesai
    }
  };

  // Mengambil artikel saat komponen pertama kali dimuat
  useEffect(() => {
    fetchArticles();
  }, []);

  // Filter artikel berdasarkan query pencarian
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter artikel berdasarkan judul
  );

  return (
    <div className="container mx-auto p-6">
      {/* Header tanpa tombol tambah artikel */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700">
          Edukasi &gt; Berdasarkan Kategori
        </h2>
      </div>

      {/* Pencarian */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cari artikel di sini"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Mengubah state searchQuery
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat artikel...</p> // Menampilkan teks saat artikel sedang dimuat
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada artikel yang ditemukan</p>
          ) : (
            filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                image={article.image
                  ? `https://smartconweb.my.id/uploads/${article.image.replace('uploads/', '')}` // Menggunakan URL yang benar untuk gambar
                  : null}
                title={article.title}
                author={article.author}
                date={new Date(article.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                categories={article.categories ? article.categories.split(",") : []} // Mengonversi kategori menjadi array
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default EducationPage;
