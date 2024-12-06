import axios from "axios";

// API Utility
const api = axios.create({
  baseURL: "http://localhost:3000/api", // URL backend Anda
  timeout: 10000, // Timeout request dalam milidetik
});

// Interceptor untuk menambahkan token autentikasi ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Mengambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Gunakan backticks untuk template literal
    }
    return config;
  },
  (error) => {
    // Tangani error pada interceptor request
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani error pada response
api.interceptors.response.use(
  (response) => response, // Jika response berhasil, kembalikan response
  (error) => {
    if (error.response) {
      // Tangani error berdasarkan status HTTP
      const status = error.response.status;
      const message = error.response.data.message || "Server Error";

      if (status === 401) {
        alert("Sesi Anda telah berakhir. Silakan login kembali.");
        localStorage.removeItem("token"); // Hapus token
        window.location.href = "/login"; // Redirect ke halaman login
      } else if (status === 403) {
        alert("Anda tidak memiliki akses untuk melakukan tindakan ini.");
      } else {
        alert(`Terjadi kesalahan: ${message}`);
      }
    } else {
      // Jika server tidak merespon atau terjadi kesalahan jaringan
      alert("Tidak dapat terhubung ke server. Silakan coba lagi.");
    }
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default api;
