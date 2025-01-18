import React from 'react';
import './LoadingScreen.css'; // Lägg CSS-koden här

const LoadingScreen = () => {
  return (
    <div id="loading-screen">
      <div className="loader"></div>
      <p>Laddar aktiviteter...</p>
    </div>
  );
};

export default LoadingScreen;
