import React, { useState, useEffect } from "react";
import api from "../api";  // Mengimpor instance axios dari api.js

function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);  // Untuk mengelola status loading
  const [error, setError] = useState(null);  // Untuk mengelola error

  // Ambil data history dari API menggunakan axios
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await api.get("/history"); // Menggunakan axios instance untuk mendapatkan data
        setHistory(response.data);  // Menyimpan data history ke dalam state
      } catch (error) {
        setError("Error fetching history: " + error.message);  // Mengatur error state jika terjadi error
      } finally {
        setLoading(false);  // Set loading ke false setelah request selesai
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Riwayat Deteksi Penyakit</h2>

      <div className="bg-white border border-green-200 rounded-lg p-8 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Riwayat Deteksi Anda</h3>

        {/* Menangani loading dan error state */}
        {loading ? (
          <p className="text-gray-500">Memuat riwayat...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left">Tanggal</th>
                  <th className="border-b px-4 py-2 text-left">Status</th>
                  <th className="border-b px-4 py-2 text-left">Gambar</th>
                  <th className="border-b px-4 py-2 text-left">Tips</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id}>
                    <td className="border-b px-4 py-2">{new Date(item.date).toLocaleString()}</td>
                    <td className="border-b px-4 py-2">{item.status}</td>
                    <td className="border-b px-4 py-2">
                      <img
                        src={`https://smartconweb.my.id/uploads/detection/${item.image}`}  // Path gambar dengan HTTPS
                        alt="Tanaman"
                        className="w-24 h-24 object-cover"
                      />
                    </td>
                    <td className="border-b px-4 py-2">
                      {item.handling_tip ? (
                        Array.isArray(item.handling_tip) ? (
                          item.handling_tip.length > 0 ? (
                            <ul>
                              {item.handling_tip.map((tip, index) => (
                                <li key={index}>{tip}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-gray-500">Tidak ada tips yang tersedia</p>
                          )
                        ) : (
                          // Jika handling_tip adalah string JSON, parsing dulu
                          <ul>
                            {JSON.parse(item.handling_tip).map((tip, index) => (
                              <li key={index}>{tip}</li>
                            ))}
                          </ul>
                        )
                      ) : (
                        <p className="text-gray-500">Tidak ada tips yang tersedia</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Belum ada riwayat deteksi.</p>
        )}
      </div>
    </div>
  );
}

export default HistoryPage;
