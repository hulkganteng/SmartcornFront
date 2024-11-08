// src/pages/UploadPage.jsx
import React from "react";

function UploadPage() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-green-700 mb-4">Deteksi Penyakit  Identifikasi</h2>

      <div className="bg-green-50 border border-green-200 rounded-lg p-8 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Media Upload</h3>
        <p className="text-sm text-gray-500 mb-4">Tambahkan foto disini, maksimal 10MB</p>

        <div className="border-2 border-dashed border-yellow-500 rounded-lg p-10 text-center mb-4">
          <p className="text-gray-400">Tarik foto untuk upload masalah tumbuhan</p>
          <p className="text-gray-500 my-2">OR</p>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">
            Pilih Foto
          </button>
        </div>

        <p className="text-sm text-gray-500">Hanya mendukung png, jpeg, jpg</p>

        <div className="flex justify-end space-x-4 mt-4">
          <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400">
            Batal
          </button>
          <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600">
            Lanjut
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadPage;