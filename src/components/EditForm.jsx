import React, { useState } from "react";

const EditForm = ({ article, onArticleUpdate }) => {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kirim data yang diperbarui ke server
    try {
      const response = await fetch(`/api/articles/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to update article");
      }

      const updatedArticle = await response.json();
      onArticleUpdate(updatedArticle); // Panggil callback untuk pembaruan di parent component
    } catch (error) {
      console.error("Error updating article:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block font-semibold">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border px-4 py-2 rounded-md"
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block font-semibold">Content</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border px-4 py-2 rounded-md"
          rows="5"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md"
        >
          Update Article
        </button>
      </div>
    </form>
  );
};

export default EditForm;
