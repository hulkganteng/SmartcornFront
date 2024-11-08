import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import Navbar dan Footer
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Import halaman
import HomePage from "./Pages/HomePage";
import DiseaseDetectionPage from "./pages/DiseaseDetectionPage";
import EducationPage from "./Pages/EducationPage";
import ForumPage from "./Pages/ForumPage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/deteksi-penyakit" element={<DiseaseDetectionPage />} />
          <Route path="/edukasi" element={<EducationPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;