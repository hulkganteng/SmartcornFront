// src/pages/ArticleDetailPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function ArticleDetailPage() {
  return (
    <div className="container mx-auto p-6">
      <Link to="/edukasi" className="text-green-600 hover:underline text-sm mb-4 block">&larr; Kembali ke halaman utama</Link>
      
      <h2 className="text-3xl font-bold text-green-700 mb-4">Cara Menanam Jagung: Langkah Perawatan Hingga Panen Jagung</h2>
      
      <div className="flex items-center text-gray-600 text-sm mb-6">
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full mr-2">Budi Daya</span>
        <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full">Informasi</span>
        <span className="mx-2">•</span>
        <span>Siti M</span>
        <span className="mx-2">•</span>
        <span>18 Januari 2024</span>
      </div>

      <img src="/path/to/detail-image.jpg" alt="Corn field" className="w-full rounded-lg shadow-lg mb-6" />

      <div className="text-gray-700 leading-relaxed space-y-4">
        <p>
          Cara Menanam Jagung – Apakah kamu memiliki lahan kosong yang tak terpakai? Bila iya, mungkin kamu bisa memanfaatkan lahan tersebut untuk berkebun, misalnya budi daya jagung. Melakukan budi daya jagung memang membutuhkan ketelatenan, namun aktivitas ini juga bisa menjadi quality time kamu di sela pekerjaan lainnya.
        </p>
        <p>
          Budi daya jagung akan menjadi aktivitas yang menyenangkan. Namun, perlu diketahui, jagung adalah tanaman musim panas yang sebaiknya ditanam setelah suhu tanah mencapai 16 derajat celcius. Sebab, jagung yang ditanam pada tanah basah tidak berkecambah. Suhu udara terbaik untuk menumbuhkan jagung adalah antara 16 sampai 35 derajat celcius.
        </p>
        <p>
          Berdasarkan penjelasan dari U.S FoodData Central, ada beberapa kandungan nutrisi dalam 100 gram jagung kuning rebus. Di antaranya kalori 96, air 73 persen, protein 3,4 gram, karbohidrat 21 gram, gula 4,5 gram, serat 2,4 gram, dan lemak 1,5 gram.
        </p>
      </div>
    </div>
  );
}

export default ArticleDetailPage;