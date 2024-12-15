import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";
import { getArticles } from "../api"; // Import the function from api.js

function EducationPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to fetch articles from the API
  const fetchArticles = async () => {
    try {
      const response = await getArticles(); // Call the function from api.js to fetch articles
      setArticles(response); // Store the received articles into state
    } catch (error) {
      console.error("Error fetching articles:", error); // Handle error while fetching data
    } finally {
      setLoading(false); // Set loading to false once data is fetched or failed
    }
  };

  // Fetch articles when the component mounts
  useEffect(() => {
    fetchArticles();
  }, []);

  // Filter articles based on the search query
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) // Filter by title
  );

  return (
    <div className="container mx-auto p-6">
      {/* Header without the 'Add Article' button */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-green-700">
          Edukasi &gt; Berdasarkan Kategori
        </h2>
      </div>

      {/* Search input */}
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cari artikel di sini"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update the search query state
        />
      </div>

      {/* Loading state */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat artikel...</p> // Show loading message
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.length === 0 ? (
            <p className="text-center text-gray-500">Tidak ada artikel yang ditemukan</p> // No articles found
          ) : (
            filteredArticles.map((article) => (
              <ArticleCard
                key={article.id}
                id={article.id}
                image={
                  article.image
                    ? article.image.startsWith("http")
                      ? article.image // Jika sudah berupa URL lengkap
                      : `https://smartconweb.my.id/${article.image.replace(/^uploads\//, 'uploads/')}` // Tambahkan domain hanya jika path relatif
                    : "https://smartconweb.my.id/uploads/default.png" // Gambar default jika tidak ada gambar
                }
                title={article.title}
                author={article.author}
                date={new Date(article.date).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
                categories={article.categories ? article.categories.split(",") : []} // Split categories into an array
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default EducationPage;
