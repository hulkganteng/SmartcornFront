import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import api from "../api"; 

function EducationPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchArticles = async () => {
    try {
      const response = await api.get("/articles");
      setArticles(response.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
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
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat artikel...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              image={article.image ? `http://smartconweb.my.id/api/v1${article.image}` : null}
              title={article.title}
              author={article.author}
              date={new Date(article.date).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              categories={article.categories ? article.categories.split(",") : []}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default EducationPage;
