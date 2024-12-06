// src/pages/HistoryPage.jsx
import React, { useState, useEffect } from "react";

function HistoryPage() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/history");
        const data = await response.json();
        setHistory(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Riwayat Deteksi Penyakit</h2>

      <div className="bg-white border border-green-200 rounded-lg p-8 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Riwayat Deteksi Anda</h3>

        {history.length > 0 ? (
          <div>
            {history.map((item, index) => (
              <div key={index} className="mb-4 p-4 border-b">
                <h4 className="font-semibold">{`Status: ${item.status}`}</h4>
                <img
                  src={`http://localhost:3000/uploads/${item.image}`}
                  alt="Tanaman"
                  className="w-40 h-40 rounded-lg object-cover mt-2"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Belum ada riwayat deteksi.</p>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
