import axios from 'axios';

// Setup axios instance
const api = axios.create({
  baseURL: 'https://smartconweb.my.id/api',  // Pastikan URL ini sesuai dengan backend API Anda
  headers: {
    'Content-Type': 'application/json',
    // Tambahkan header lainnya jika diperlukan, seperti Authorization (Bearer token)
  },
});

// Fungsi untuk mengambil riwayat deteksi penyakit
export const getHistory = async () => {
  try {
    const response = await api.get('/history');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fungsi untuk mendapatkan daftar artikel
export const getArticles = async () => {
  try {
    const response = await api.get('/articles');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fungsi untuk mengupload artikel (hanya untuk admin)
export const uploadArticle = async (data, token) => {
  try {
    const response = await api.post('/articles/upload', data, {
      headers: {
        Authorization: `Bearer ${token}`,  // Mengirim token JWT untuk autentikasi
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fungsi untuk login
export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data; // Mengembalikan data login yang berhasil (misalnya token)
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fungsi untuk registrasi
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fungsi untuk mendapatkan profil pengguna berdasarkan ID
export const getProfile = async (userId, token) => {
  try {
    const response = await api.get(`/auth/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fungsi untuk mengupdate profil pengguna
export const updateProfile = async (userId, profileData, token) => {
  try {
    const response = await api.put(`/auth/profile/${userId}`, profileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fungsi untuk mengambil data forum (optional, jika dibutuhkan)
export const getForums = async () => {
  try {
    const response = await api.get('/forums');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fungsi untuk mengirim pesan ke forum (optional, jika dibutuhkan)
export const sendForumMessage = async (data, token) => {
  try {
    const response = await api.post('/forums/message', data, {
      headers: {
        Authorization: `Bearer ${token}`,  // Mengirim token JWT untuk autentikasi
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fungsi untuk mengirim pesan chat (optional, jika dibutuhkan)
export const sendMessage = async (data, token) => {
  try {
    const response = await api.post('/chats/send', data, {
      headers: {
        Authorization: `Bearer ${token}`,  // Mengirim token JWT untuk autentikasi
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Fungsi getArticleById
export const getArticleById = (id) => {
  return fetch(`https://smartconweb.my.id/api/articles/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.error('Error fetching article:', error));
};

// Fungsi updateArticle
export const updateArticle = (id, updatedData) => {
  return fetch(`https://smartconweb.my.id/api/articles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(updatedData),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => response.json())
    .catch(error => console.error('Error updating article:', error));
};

// Fungsi untuk upload gambar penyakit dan mendeteksi penyakit
export const detectDisease = async (formData) => {
  try {
    const response = await api.post('/disease-detection/detect', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Penting untuk upload file
      },
    });
    return response.data; // Mengembalikan respons dari backend
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export default api;
