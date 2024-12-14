import React from "react";
import { useLocation } from "react-router-dom";

function HasilPage() {
  const location = useLocation();
  const { result } = location.state || {}; // Safely extract result

  // If no result is passed, display a message
  if (!result) {
    return <div className="text-center text-gray-500 p-6">Hasil tidak ditemukan.</div>;
  }

  // Determine background color based on plant status
  const backgroundColor = result.status === "Sehat" ? "bg-green-500" : "bg-red-500";

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Hasil Deteksi Penyakit</h2>

      {/* Background color changes based on plant status */}
      <div className={`bg-white border border-green-200 rounded-lg p-8 shadow-lg ${backgroundColor}`}>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Status Tanaman</h3>

        <div className="mb-6">
          <h4 className="text-xl font-semibold text-gray-700">Tanaman Anda: {result.status}</h4>

          {/* Display the plant image */}
          <div className="mt-4">
            <img
              src={`https://smartconweb.my.id${result.image}`} // Corrected URL for the plant image
              alt="Tanaman Jagung"
              className="w-full h-80 md:h-96 lg:h-[20rem] rounded-lg shadow-lg object-cover"
            />
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-xl font-semibold text-gray-700">Tips Mengatasi Penyakit:</h4>

          {/* Display tips if available */}
          {result?.tips && result.tips.length > 0 ? (
            <ul className="list-disc pl-6">
              {result.tips.map((tip, index) => (
                <li key={index} className="text-gray-700">{tip}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">Tidak ada tips yang tersedia.</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-4">
          {/* Button to navigate to history page */}
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
