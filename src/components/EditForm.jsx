import React, { useState } from "react";

const EditForm = ({ article, onArticleUpdate }) => {
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await fetch(`/api/articles/${article.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`, // Add token if required
        },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        throw new Error("Failed to update article");
      }

      const updatedArticle = await response.json();
      onArticleUpdate(updatedArticle); // Notify parent component
      setError(null); // Reset error if successful
    } catch (error) {
      setError("Error updating article: " + error.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-600">{error}</div>} {/* Display error message */}
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
          disabled={loading} // Disable button while loading
        >
          {loading ? "Updating..." : "Update Article"} {/* Show loading text */}
        </button>
      </div>
    </form>
  );
};

export default EditForm;
