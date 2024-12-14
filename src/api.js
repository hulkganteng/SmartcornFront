import axios from "axios";

// API Utility
const api = axios.create({
  baseURL: "https://smartconweb.my.id/api/", // Pastikan menggunakan HTTPS
  timeout: 10000, // Timeout request dalam milidetik
});

// Interceptor untuk menambahkan token autentikasi ke setiap request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Mengambil token dari localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Menambahkan Bearer token
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
        localStorage.removeItem("token"); // Hapus token dari localStorage
        window.location.href = "/login"; // Redirect ke halaman login
      } else if (status === 403) {
        alert("Anda tidak memiliki akses untuk melakukan tindakan ini.");
      } else if (status === 500) {
        alert("Terjadi kesalahan di server. Silakan coba lagi nanti.");
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

// Berikut adalah contoh penggunaan endpoint API di aplikasi Anda

// Endpoint untuk autentikasi
export const loginUser = (credentials) => {
  return api.post("/auth/login", credentials);
};

// Endpoint untuk mengambil artikel
export const getArticles = () => {
  return api.get("/articles");
};

// Endpoint untuk mengambil forum
export const getForums = () => {
  return api.get("/forums");
};

// Endpoint untuk chat
export const sendMessage = (messageData) => {
  return api.post("/chats/send", messageData); // Mengirim pesan ke server
};

// Endpoint untuk deteksi penyakit (misalnya di endpoint /disease-detection)
export const detectDisease = (detectionData) => {
  return api.post("/disease-detection", detectionData); // Kirim data deteksi penyakit
};

// Endpoint untuk mendapatkan history
export const getHistory = () => {
  return api.get("/history"); // Mengambil history
};
