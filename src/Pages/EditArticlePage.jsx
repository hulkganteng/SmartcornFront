// src/Pages/EditArticlePage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById, updateArticle } from "../api"; // Pastikan impor dari api.js benar

function EditArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Ambil artikel berdasarkan ID
    getArticleById(id)
      .then(data => {
        setArticle(data);
      })
      .catch(error => console.error("Error fetching article:", error));
  }, [id]);

  const handleSubmit = () => {
    // Logika untuk update artikel
    const updatedData = { ...article };
    updateArticle(id, updatedData)
      .then(response => {
        navigate(`/article/${id}`);
      })
      .catch(error => console.error("Error updating article:", error));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Edit Artikel</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">Judul</label>
          <input
            type="text"
            id="title"
            name="title"
            value={article.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium">Konten</label>
          <textarea
            id="content"
            name="content"
            value={article.content}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            rows="5"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-sm font-medium">Penulis</label>
          <input
            type="text"
            id="author"
            name="author"
            value={article.author}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="categories" className="block text-sm font-medium">Kategori</label>
          <input
            type="text"
            id="categories"
            name="categories"
            value={article.categories}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium">Gambar</label>
          <input
            type="file"
            id="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

export default EditArticlePage;
