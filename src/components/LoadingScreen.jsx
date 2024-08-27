import React from "react";
import "../styles/loading.css"; // Ensure this path is correct

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loader"></div>
      <div className="loading-text">Loading...</div>
    </div>
  );
}

export default LoadingScreen;
