// src/pages/HasilPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";

function HasilPage() {
  const location = useLocation();
  const { result } = location.state || {};

  if (!result) {
    return <div>Hasil tidak ditemukan.</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Hasil Deteksi Penyakit</h2>

      <div className="bg-white border border-green-200 rounded-lg p-8 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Status Tanaman</h3>

        <div className="mb-6">
          <h4 className="text-xl font-semibold text-gray-700">Tanaman Anda: {result.status}</h4>
          <div className="mt-4">
            <img
              src={`http://localhost:3000/uploads/${result.image}`}
              alt="Tanaman Jagung"
              className="w-full h-80 md:h-96 lg:h-[20rem] rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={() => window.location.href = "/riwayat"}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
          >
            Lihat Riwayat
          </button>
        </div>
      </div>
    </div>
  );
}

export default HasilPage;
