import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArticleById, updateArticle } from "../api"; // Mengimpor fungsi API dari api.js
import ReactQuill from "react-quill"; // Mengimpor React Quill
import "react-quill/dist/quill.snow.css";

function EditArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState({ title: "", content: "", author: "", categories: "" });
  const [image, setImage] = useState(null);

  // Ambil data artikel berdasarkan ID menggunakan fungsi dari api.js
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticleById(id); // Menggunakan fungsi getArticleById
        setArticle(response); // Menyimpan data artikel ke state
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
      await updateArticle(id, formData); // Menggunakan fungsi updateArticle
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
                <label className="block text-gray-700">Konten</label>
                {/* React Quill Editor untuk konten */}
                <ReactQuill
                  value={formData.content}
                  onChange={handleEditorChange}
                  className="border p-2 rounded"
                  modules={{
                    toolbar: [
                      [{ header: "1" }, { header: "2" }, { font: [] }],
                      [{ list: "ordered" }, { list: "bullet" }],
                      ["bold", "italic", "underline"],
                      [{ align: [] }],
                      ["link"],
                    ],
                  }}
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
