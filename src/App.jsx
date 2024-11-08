import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Navbar, Footer, dan PageLoader
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";

// Lazy loading halaman-halaman
const HomePage = lazy(() => import("./Pages/HomePage"));
const DiseaseDetectionPage = lazy(() => import("./Pages/DiseaseDetectionPage"));
const EducationPage = lazy(() => import("./Pages/EducationPage"));
const ForumPage = lazy(() => import("./Pages/ForumPage"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const RegisterPage = lazy(() => import("./Pages/RegisterPage"));
const HistoryPage = lazy(() => import("./Pages/HistoryPage"));
const UploadPage = lazy(() => import("./Pages/UploadPage"));
const ArticleDetailPage = lazy(() => import("./Pages/ArticleDetailPage"));
const ForumCommunityPage = lazy(() => import("./Pages/ForumCommunityPage"));

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        {/* Suspense dengan PageLoader sebagai fallback */}
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/deteksi-penyakit" element={<DiseaseDetectionPage />} />
            <Route path="/edukasi" element={<EducationPage />} />
            <Route path="/forum" element={<ForumPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/riwayat" element={<HistoryPage />} />
            <Route path="/identifikasi" element={<UploadPage />} />
            <Route path="/education/detail" element={<ArticleDetailPage />} />
            <Route path="/forum/community" element={<ForumCommunityPage />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}

export default App;