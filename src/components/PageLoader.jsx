// src/components/PageLoader.jsx
import React from "react";

function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500 border-solid"></div>
    </div>
  );
}

export default PageLoader;