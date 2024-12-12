import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditArticlePage() {
  const [article, setArticle] = useState({ title: "", content: "", author: "", categories: "" });
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Ambil data artikel berdasarkan ID
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`/api/articles/${id}`);
        setArticle(response.data);
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };
    fetchArticle();
  }, [id]);

  // Handle perubahan form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({ ...prev, [name]: value }));
  };

  // Handle submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", article.title);
    formData.append("content", article.content);
    formData.append("author", article.author);
    formData.append("categories", article.categories);
    if (image) formData.append("image", image);

    try {
      await axios.put(`/api/articles/${id}`, formData);
      navigate("/admin"); // Kembali ke halaman admin setelah berhasil
    } catch (error) {
      console.error("Error updating article:", error);
    }
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