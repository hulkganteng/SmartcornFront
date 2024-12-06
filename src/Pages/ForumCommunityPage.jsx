// src/pages/ForumCommunityPage.jsx
import React, { useState, useEffect } from 'react';
import api from '../api';  // Pastikan api.js sudah terkonfigurasi untuk memanggil backend
import { useNavigate } from 'react-router-dom';

function ForumCommunityPage() {
  const [posts, setPosts] = useState([]);  // State untuk menyimpan daftar forum posts
  const [newPost, setNewPost] = useState({ title: '', content: '' });  // State untuk form posting baru
  const [loading, setLoading] = useState(true);  // Loading state
  const navigate = useNavigate();

  // Fungsi untuk mengambil forum posts
  const fetchForumPosts = async () => {
    try {
      const response = await api.get('/forums');  // Panggil API untuk mendapatkan data forum
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching forum posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fungsi untuk menangani perubahan input form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({ ...prev, [name]: value }));
  };

  // Fungsi untuk menangani submit form
  const handleSubmitPost = async (e) => {
    e.preventDefault();

    try {
      await api.post('/forums', newPost);  // Kirim data forum ke backend
      setNewPost({ title: '', content: '' });  // Reset form setelah submit
      fetchForumPosts();  // Ambil lagi daftar forum setelah posting baru
    } catch (error) {
      console.error('Error posting forum:', error);
    }
  };

  useEffect(() => {
    fetchForumPosts();  // Ambil daftar posting saat halaman dimuat
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Forum Komunitas</h2>
      <p className="text-gray-700 mb-6">Diskusikan masalah tanaman jagungmu!</p>

      {/* Formulir untuk membuat posting baru */}
      <form onSubmit={handleSubmitPost} className="bg-white p-4 rounded-lg shadow-lg mb-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Buat Postingan Baru</h3>
        <div className="mb-4">
          <label className="block text-gray-700">Judul</label>
          <input
            type="text"
            name="title"
            value={newPost.title}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Konten</label>
          <textarea
            name="content"
            value={newPost.content}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />
        </div>
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
          Kirim Postingan
        </button>
      </form>

      {/* Loading State */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat posting forum...</p>
      ) : (
        // Daftar posting forum
        <div className="space-y-6">
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-700">{post.title}</h3>
              <p className="text-sm text-gray-600">{post.content}</p>
              <div className="flex justify-between items-center text-xs text-gray-500 mt-2">
                <span>{post.author}</span>
                <span>{new Date(post.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ForumCommunityPage;
