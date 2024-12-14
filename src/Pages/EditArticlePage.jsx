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
    <div>
      {/* Render artikel dan form update */}
    </div>
  );
}

export default EditArticlePage;
