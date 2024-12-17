import React, { Suspense, lazy, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import Navbar, Footer, dan PageLoader
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import Message from "./components/Message";

// Lazy loading untuk halaman-halaman
const HomePage = lazy(() => import("./Pages/HomePage"));
const DiseaseDetectionPage = lazy(() => import("./Pages/DiseaseDetectionPage"));
const EducationPage = lazy(() => import("./Pages/EducationPage"));
const ForumPage = lazy(() => import("./Pages/ForumPage"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const HistoryPage = lazy(() => import("./Pages/HistoryPage"));
const UploadPage = lazy(() => import("./Pages/UploadPage"));
const HasilPage = lazy(() => import("./Pages/HasilPage")); // Halaman Hasil
const ArticleDetailPage = lazy(() => import("./Pages/ArticleDetailPage"));
const ForumCommunityPage = lazy(() => import("./Pages/ForumCommunityPage"));
const AddArticlePage = lazy(() => import("./Pages/AddArticlePage"));
const ChatPage = lazy(() => import("./Pages/ChatPage"));
const AdminPage = lazy(() => import("./Pages/AdminPage"));
const EditArticlePage = lazy(() => import("./Pages/EditArticlePage"));
const AboutPage = lazy(() => import("./Pages/AboutPage"));

function App() {
  // State untuk menyimpan informasi user yang login
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData); // Set user jika ada di localStorage
  }, []);

  // ProtectedRoute untuk membatasi akses halaman tertentu berdasarkan autentikasi
  const ProtectedRoute = ({ element, role, ...rest }) => {
    if (!user) return <Navigate to="/login" />;
    if (role && user.role !== role) return <Navigate to="/" />;
    return element;
  };

  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        {/* Suspense dengan PageLoader sebagai fallback */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Halaman Umum */}
            <Route path="/" element={<HomePage />} />
            <Route path="/deteksi-penyakit" element={<DiseaseDetectionPage />} />
            <Route path="/edukasi" element={<EducationPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/riwayat" element={<HistoryPage />} />
            <Route path="/identifikasi" element={<UploadPage />} />
            <Route path="/hasil" element={<HasilPage />} /> {/* Hasil Deteksi Penyakit */}
            <Route path="/edukasi/detail/:id" element={<ArticleDetailPage />} />
            <Route path="/forum/community" element={<ForumCommunityPage />} />
            <Route path="/add-article" element={<AddArticlePage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/about" element={<AboutPage />} />

            {/* Protected Routes */}
            <Route
              path="/admin"
              element={<ProtectedRoute role="admin" element={<AdminPage />} />}
            />
            <Route
              path="/admin/edit-article/:id"
              element={<ProtectedRoute role="admin" element={<EditArticlePage />} />}
            />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
