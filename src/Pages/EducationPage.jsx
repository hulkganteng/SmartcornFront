// src/pages/EducationPage.jsx
import React from "react";
import ArticleCard from "../components/ArticleCard";

function EducationPage() {
  const articles = [
    {
      id: 1,
      title: "Cara Menanam Jagung: Langkah Perawatan Hingga Panen Jagung",
      author: "Siti M",
      date: "18 Januari 2024",
      image: "/path/to/image1.jpg",
      categories: ["Budi Daya", "Informasi"]
    },
    {
      id: 2,
      title: "Budi Daya Jagung Berhasil",
      author: "Chika",
      date: "8 Juli 2023",
      image: "/path/to/image2.jpg",
      categories: ["Budi Daya", "Informasi"]
    },
    {
      id: 3,
      title: "Apa Saja yang Dibutuhkan Agar Dapat Memanen Jagung dengan Maksimal",
      author: "Dimas",
      date: "1 Maret 2024",
      image: "/path/to/image3.jpg",
      categories: ["Budi Daya", "Teknologi"]
    }
  ];

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Edukasi &gt; Berdasarkan Kategori</h2>
      
      {/* Kategori dan Pencarian */}
      <div className="flex justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {["Budi Daya", "Informasi", "Teknologi", "Berita"].map((category, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-600 text-sm font-semibold rounded-full cursor-pointer hover:bg-green-200"
            >
              {category}
            </span>
          ))}
        </div>
        <input
          type="text"
          placeholder="Cari artikel disini"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
        />
      </div>

      {/* Daftar Artikel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            image={article.image}
            title={article.title}
            author={article.author}
            date={article.date}
            categories={article.categories}
          />
        ))}
      </div>
    </div>
  );
}

export default EducationPage;