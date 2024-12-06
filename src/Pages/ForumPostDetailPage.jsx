// src/pages/ForumPostDetailPage.jsx
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../api";

function ForumPostDetailPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");

  const fetchPost = async () => {
    try {
      const response = await api.get(`/forums/${id}`);
      setPost(response.data);
      // Fetch komentar terkait postingan
      const commentsResponse = await api.get(`/forums/${id}/comments`);
      setComments(commentsResponse.data);
    } catch (error) {
      console.error("Error fetching forum post:", error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post(
        `/forums/${id}/comments`,
        { content: comment },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setComment(""); // Reset form setelah submit
      fetchPost(); // Refresh data setelah komentar baru
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">{post.title}</h2>
      <p className="text-gray-700 mb-4">{post.content}</p>

      {/* Form komentar */}
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          rows="4"
          placeholder="Tambahkan komentar..."
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700"
        >
          Kirim Komentar
        </button>
      </form>

      {/* Daftar komentar */}
      <div>
        <h3 className="text-xl font-semibold text-green-700 mb-4">Komentar</h3>
        {comments.map((comment) => (
          <div key={comment.id} className="p-4 bg-gray-100 rounded-lg mb-4">
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForumPostDetailPage;
