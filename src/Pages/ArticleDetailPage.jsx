import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../api";
import DOMPurify from "dompurify"; // Mengimpor DOMPurify untuk sanitasi

function ArticleDetailPage() {
  const { id } = useParams(); // Ambil ID artikel dari URL
  const [article, setArticle] = useState(null); // State untuk artikel
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(false); // State untuk error handling

  // Fungsi untuk mengambil artikel berdasarkan ID
  const fetchArticle = async () => {
    try {
      console.log("Fetching article with ID:", id); // Debugging log
      const response = await api.get(`/articles/${id}`); // Panggil endpoint API dengan ID dinamis
      setArticle(response.data); // Set data artikel ke state
      setLoading(false); // Matikan loading
    } catch (err) {
      console.error("Error fetching article:", err); // Debugging log
      setError(true); // Tampilkan error
      setLoading(false);
    }
  };

  // Gunakan useEffect untuk memanggil fetchArticle saat komponen dimuat
  useEffect(() => {
    fetchArticle();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-500">Memuat artikel...</p>;
  }

  if (error || !article) {
    return <p className="text-center text-red-500">Terjadi kesalahan: Artikel tidak ditemukan.</p>;
  }

  // Sanitasi konten HTML sebelum merender
  const sanitizedContent = DOMPurify.sanitize(article.content);

  return (
    <div className="container mx-auto p-6">
      <Link to="/edukasi" className="text-green-600 hover:underline text-sm mb-4 block">
        &larr; Kembali ke halaman utama
      </Link>

      <h2 className="text-3xl font-bold text-green-700 mb-4">{article.title}</h2>

      <div className="flex items-center text-gray-600 text-sm mb-6">
        {article.categories &&
          article.categories.split(",").map((category, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-600 px-3 py-1 rounded-full mr-2"
            >
              {category}
            </span>
          ))}
        <span className="mx-2">•</span>
        <span>{article.author}</span>
        <span className="mx-2">•</span>
        <span>
          {new Date(article.date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>

      {/* Perbaiki gambar agar responsif dan tidak terlalu besar */}
      {article.image && (
        <img
          src={
            article.image.startsWith('/uploads/')
              ? `https://smartconweb.my.id${article.image}` // Jika sudah ada /uploads/, gunakan langsung
              : `https://smartconweb.my.id/uploads/${article.image}` // Jika tidak ada, tambahkan prefix
          }
          alt={article.title}
          className="w-full md:w-1/2 mx-auto rounded-lg shadow-lg mb-6"  // Mengatur ukuran gambar dan meletakkannya di tengah
        />
      )}

      {/* Layout Responsif Teks */}
      <div className="prose prose-lg max-w-3xl mx-auto text-gray-700 leading-relaxed space-y-4">
        {/* Render konten yang sudah disanitasi */}
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      </div>
    </div>
  );
}

export default ArticleDetailPage;
